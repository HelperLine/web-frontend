import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {handleNewAccountData} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import {Button} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import {BACKEND_URL} from "../../secrets";

import axios from 'axios';

import './AccountPage.scss';

import Grid from "@material-ui/core/Grid";
import clsx from "clsx";

import {AccountPageTranslation} from "./AccountPageTranslation";

var cloneDeep = require('lodash.clonedeep');


const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    flexButtonBox: {
        display: "flex",
        alignItems: "center",
        verticalAlign: "center",
    },
    button: {
        color: "white",
    },
    textField: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
    },
    passwordTextField: {},
    wrapper: {
        margin: theme.spacing(0.5),

        position: 'relative',
        display: "inline-flex"
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    snackbar: {
        margin: theme.spacing(1)
    },
    snackbarContentError: {
        backgroundColor: theme.palette.primary.main,
    },
    snackbarContentSuccess: {
        backgroundColor: theme.palette.secondary.main,
    },
    switchLink: {
        marginTop: theme.spacing(2),
        textAlign: "center",
    },
    formContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    form2Container: {
        paddingTop: theme.spacing(1.5),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));


export function AccountPageComponent(props) {

    const classes = useStyles();

    const emailInputRef = useRef(null);
    const zipInputRef = useRef(null);
    const cityInputRef = useRef(null);

    const password1InputRef = useRef(null);
    const password2InputRef = useRef(null);
    const password3InputRef = useRef(null);

    const initialState = {
        account: {
            // All variables in here are in snake case
            // because the python api accepts snake case

            email: props.email,

            old_password: "",
            new_password: "",
            new_password_confirmation: "",

            zip_code: props.account.zip_code,
            country: props.account.country,
        },
        errorMessageVisible: false,
        errorMessageText: "",

        resending: false,
        resendPossible: true,

        form1Modified: false,

        form1Submitting: false,
        form2Submitting: false,

        form2Open: false,
    };

    let [state, changeState] = useState(initialState);

    const resetForm1Change = () => {
        changeState({...initialState});
    };

    // form1 = email, zip & city
    // form2 = password fields

    function handleFormChange(newFormData) {
        let newState = cloneDeep(state);

        let form1Modified = false;

        if ("email" in newFormData) {
            newState.account["email"] = newFormData["email"];
            form1Modified = (newFormData["email"] !== props["email"]);
        }

        ["zip_code", "country"].forEach(key => {
            if (key in newFormData) {
                newState.account[key] = newFormData[key];
                form1Modified = (newFormData[key] !== props.account[key]) || form1Modified;
            }
        });

        ["old_password", "new_password", "new_password_confirmation"].forEach(key => {
            if (key in newFormData) {
                newState.account[key] = newFormData[key];
            }
        });

        newState.form1Modified = form1Modified;

        newState.errorMessageVisible = false;
        changeState(newState);
    }

    function startResendingEmailState() {
        let newState = cloneDeep(state);
        newState.resending = true;
        newState.errorMessageVisible = false;
        changeState(newState);
    }

    function stopResendingEmailState() {
        let newState = cloneDeep(state);
        newState.resending = false;
        newState.errorMessageVisible = false;
        changeState(newState);
    }

    function startForm1SubmittingState() {
        let newState = cloneDeep(state);
        newState.form1Submitting = true;
        changeState(newState);
    }

    function stopForm1SubmittingState() {
        let newState = cloneDeep(state);
        newState.form1Modified = false;
        newState.form1Submitting = false;
        changeState(newState);
    }

    function startForm2SubmittingState() {
        let newState = cloneDeep(state);
        newState.form2Submitting = true;
        changeState(newState);
    }

    function stopForm2SubmittingState() {
        let newState = cloneDeep(state);
        newState.form2Modified = false;
        changeState(newState);
    }

    function showErrorSnackbar(text) {
        let newState = cloneDeep(state);
        newState.errorMessageVisible = true;
        newState.errorMessageText = text;
        changeState(newState);
    }

    function hideErrorSnackbar(text) {
        let newState = cloneDeep(state);
        newState.errorMessageVisible = false;
        changeState(newState);
    }

    function form1Validation() {

        ["email", "zip_code", "country"].forEach(key => {
            if (state.account[key] === "") {
                showErrorSnackbar(AccountPageTranslation.fieldEmpty[props.language]);
                return false;
            }
        });

        return true;
    }

    function form2Validation() {

        ["old_password", "new_password", "new_password_confirmation"].forEach(key => {
            if (state.account[key] === "") {
                showErrorSnackbar(AccountPageTranslation.passwordFieldEmpty[props.language]);
                return false;
            }
        });

        if (state.account["new_password"] !== state.account["new_password_confirmation"]) {
            showErrorSnackbar(AccountPageTranslation.passwordConfirmationMatch[props.language]);
            return false;
        }

        if (state.account["new_password"].length < 8) {
            showErrorSnackbar(AccountPageTranslation.passwordTooShort[props.language]);
            return false;
        }

        return true;
    }

    function submitForm1Change() {
        startForm1SubmittingState();

        if (form1Validation()) {
            // Looks and feels better if the process actually takes some time
            setTimeout(() => {
                axios.put(BACKEND_URL + "backend/database/account", {
                    email: props.email,
                    api_key: props.api_key,

                    new_email: state.account.email,
                    zip_code: state.account.zip_code,
                    country: state.account.country,
                })
                    .then(response => {
                        if (response.data.status === "ok") {
                            stopForm1SubmittingState();
                            props.handleNewAccountData(response);
                        } else {
                            showErrorSnackbar(response.data.status);
                        }
                    }).catch(response => {
                    console.log("Axios promise rejected! Server response:");
                    console.log(response);
                    stopForm1SubmittingState();
                    showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
                });
            }, 1000);
        }
    }

    function submitForm2Change() {
        startForm2SubmittingState();

        if (form2Validation()) {
            // Looks and feels better if the process actually takes some time
            setTimeout(() => {
                axios.put(BACKEND_URL + "backend/database/account", {
                    email: props.email,
                    api_key: props.api_key,

                    old_password: state.account.old_password,
                    new_password: state.account.new_password,
                })
                    .then(response => {
                        if (response.data.status === "ok") {
                            stopForm2SubmittingState();
                            form2Success();
                        } else {
                            if (response.data.status === "password format invalid") {
                                showErrorSnackbar(AccountPageTranslation.passwordInvalid[props.language]);
                            } else {
                                showErrorSnackbar(AccountPageTranslation.defaultError[props.language]);
                            }
                        }
                    }).catch(response => {
                    console.log("Axios promise rejected! Server response:");
                    console.log(response);
                    stopForm2SubmittingState();
                    showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
                });
            }, 1000);
        }
    }

    function submitResendEmail() {
        startResendingEmailState();

        axios.post(BACKEND_URL + "backend/email/resend", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    setTimeout(stopResendingEmailState, 1000);
                } else {
                    resetForm1Change();
                    showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            resetForm1Change();
            showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });
    }


    function focusEmail() {
        emailInputRef.current.focus()
    }

    function blurEmail() {
        emailInputRef.current.blur()
    }


    function focusZip() {
        zipInputRef.current.focus()
    }

    function blurZip() {
        zipInputRef.current.blur()
    }


    function focusCity() {
        cityInputRef.current.focus()
    }

    function blurCity() {
        cityInputRef.current.blur()
    }

    function openForm2() {
        let newState = cloneDeep(state);
        newState.form2Open = true;
        changeState(newState);
    }

    function closeForm2() {
        if (!state.form2Submitting) {
            let newState = cloneDeep(state);
            newState.form2Open = false;
            newState.account.old_password = "";
            newState.account.new_password = "";
            newState.account.new_password_confirmation = "";
            newState.account.form2Modified = false;
            newState.errorMessageVisible = false;
            changeState(newState);
        }
    }

    function form2Success() {
        let newState = cloneDeep(state);
        newState.form2Open = false;

        newState.account.old_password = "";
        newState.account.new_password = "";
        newState.account.new_password_confirmation = "";

        newState.errorMessageVisible = true;
        newState.errorMessageText = "Success!";
        changeState(newState);

        setTimeout(() => {
            let newState = cloneDeep(state);
            newState.form2Open = false;

            newState.account.oldPassword = "";
            newState.account.newPassword = "";
            newState.account.newPasswordConfirmation = "";

            newState.errorMessageVisible = false;
            changeState(newState);
        }, 1000);
    }


    function focusPassword1() {
        password1InputRef.current.focus()
    }

    function blurPassword1() {
        password1InputRef.current.blur()
    }


    function focusPassword2() {
        password2InputRef.current.focus()
    }

    function blurPassword2() {
        password2InputRef.current.blur()
    }


    function focusPassword3() {
        password3InputRef.current.focus()
    }

    function blurPassword3() {
        password3InputRef.current.blur()
    }


    return (
        <Container maxWidth="md" className="AccountPage">

            <Grid container spacing={1} className={classes.formContainer}>

                <Grid item xs={12} md={props.account.email_verified ? 9 : 6}>
                    <CustomTextField
                        required disabled={props.account.email_verified || state.form1Submitting}
                        ref={emailInputRef} onTab={focusZip} onEnter={blurEmail} onEscape={blurEmail}
                        className={classes.textField} variant="outlined" label={AccountPageTranslation.email[props.language]} fullWidth
                        value={state.account.email} onChange={(email) => handleFormChange({email: email})}/>
                </Grid>

                <Grid item xs={12} md={props.account.email_verified ? 3 : 6} className={classes.flexButtonBox}>
                    <div className="ButtonBox">
                        {!props.account.email_verified && (
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={state.resending || !state.resendPossible || state.form1Modified}
                                        color="secondary"
                                        onClick={submitResendEmail}
                                        className={classes.button}>{AccountPageTranslation.resendVerification[props.language]}</Button>
                                {state.resending && (
                                    <CircularProgress size={24}
                                                      className={classes.buttonProgress}
                                                      color="secondary"/>
                                )}
                            </div>
                        )}
                        <div className={classes.wrapper}>
                            <Button variant="contained"
                                    disabled={state.resending || state.form1Modified}
                                    color="secondary"
                                    onClick={openForm2}
                                    className={classes.button}>{AccountPageTranslation.changePassword[props.language]}</Button>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.divider}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        required
                        disabled={state.form1Submitting}
                        ref={zipInputRef} onTab={focusEmail} onEnter={blurZip} onEscape={blurZip}
                        className={classes.textField} variant="outlined" label={AccountPageTranslation.zipCode[props.language]} fullWidth
                        value={state.account.zip_code} onChange={(zip_code) => handleFormChange({zip_code: zip_code})}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        required disabled
                        className={classes.textField} variant="outlined" label={AccountPageTranslation.country[props.language]} fullWidth
                        value={state.account.country}/>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.divider}/>
                </Grid>

                {state.form1Modified && (
                    <Grid item xs={12}>
                        <div className="ButtonBox">
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={state.form1Submitting}
                                        color="secondary"
                                        onClick={resetForm1Change}
                                        className={classes.button}>{AccountPageTranslation.cancel[props.language]}</Button>
                            </div>
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={state.form1Submitting}
                                        color="secondary"
                                        onClick={submitForm1Change}
                                        className={classes.button}>{AccountPageTranslation.submit[props.language]}</Button>
                                {state.form1Submitting && (
                                    <CircularProgress size={24}
                                                      className={classes.buttonProgress}
                                                      color="secondary"/>
                                )}
                            </div>
                        </div>
                    </Grid>
                )}

            </Grid>

            {state.errorMessageVisible && (
                <Snackbar className={classes.snackbar}
                          open={true}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                    <SnackbarContent
                        className={classes.snackbarContentError}
                        aria-describedby="message-id"
                        message={<span id="message-id">{state.errorMessageText}</span>}
                    />
                </Snackbar>
            )}

            <Dialog onClose={closeForm2} aria-labelledby="simple-dialog-title" open={state.form2Open}>

                <Container maxWidth="xs" className={classes.form2Container}>
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <CustomTextField
                                type="password"
                                required disabled={state.form2Submitting}
                                ref={password1InputRef} onTab={focusPassword2} onEnter={focusPassword2}
                                onEscape={blurPassword1}
                                className={clsx(classes.textField, classes.passwordTextField)} variant="outlined"
                                label={AccountPageTranslation.oldPassword[props.language]} fullWidth
                                value={state.account.old_password}
                                onChange={(old_password) =>
                                    handleFormChange({old_password: old_password})}/>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomTextField
                                type="password"
                                required disabled={state.form2Submitting}
                                ref={password2InputRef} onTab={focusPassword3} onEnter={focusPassword3}
                                onEscape={blurPassword2}
                                className={clsx(classes.textField, classes.passwordTextField)} variant="outlined"
                                label={AccountPageTranslation.newPassword[props.language]} fullWidth
                                value={state.account.new_password}
                                onChange={(new_password) =>
                                    handleFormChange({new_password: new_password})}/>
                        </Grid>

                        <Grid item xs={12}>
                            <CustomTextField
                                type="password"
                                required disabled={state.form2Submitting}
                                ref={password3InputRef} onTab={focusPassword1} onEnter={submitForm2Change}
                                onEscape={blurPassword3}
                                className={clsx(classes.textField, classes.passwordTextField)} variant="outlined"
                                label={AccountPageTranslation.newPasswordConfirmation[props.language]} fullWidth
                                value={state.account.new_password_confirmation}
                                onChange={(new_password_confirmation) =>
                                    handleFormChange({new_password_confirmation: new_password_confirmation})}/>
                        </Grid>

                        <Grid item xs={12}>
                            <div className={clsx("ButtonBox", classes.buttonBox)}>
                                <div className={classes.wrapper}>
                                    <Button variant="contained"
                                            disabled={state.form2Submitting}
                                            color="secondary"
                                            onClick={closeForm2}
                                            className={classes.button}>{AccountPageTranslation.cancel[props.language]}</Button>
                                </div>
                                <div className={classes.wrapper}>
                                    <Button variant="contained"
                                            disabled={state.form2Submitting}
                                            color="secondary"
                                            onClick={submitForm2Change}
                                            className={classes.button}>{AccountPageTranslation.submit[props.language]}</Button>
                                    {state.form2Submitting && (
                                        <CircularProgress size={24}
                                                          className={classes.buttonProgress}
                                                          color="secondary"/>
                                    )}
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </Container>
            </Dialog>
        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    email: state.email,
    api_key: state.api_key,
    language: state.language,

    account: state.account,

});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const AccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPageComponent);

