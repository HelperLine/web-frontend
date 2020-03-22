import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {handleNewAccountData} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Typography} from "@material-ui/core";

import {Button} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import axios from 'axios';

import './AccountPage.scss';

import Grid from "@material-ui/core/Grid";


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
    button: {
        color: "white"
    },
    textField: {
        marginBottom: theme.spacing(1)
    },
    wrapper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        position: 'relative',
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
    const countryInputRef = useRef(null);

    let [state, changeState] = useState({
        account: {
            email: props.account.email,

            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",

            zip: props.account.address.zip,
            city: props.account.address.city,
            country: props.account.address.country,
        },
        errorMessageVisible: false,
        errorMessageText: "",

        resending: false,
        resend: false,
    });

    function handleFormChange(newFormData) {
        let newState = cloneDeep(state);

        ["email", "oldPassword", "newPassword", "newPasswordConfirmation", "zip", "city", "country"].forEach(key => {
            newState.account[key] = key in newFormData ? newFormData[key] : newState.account[key];
        });

        newState.errorMessageVisible = false;
        newState.errorMessageText = "";
        changeState(newState);
    }

    function startResending() {
        blurAll();

        let newState = cloneDeep(state);
        newState.resending = true;
        newState.errorMessageVisible = false;
        newState.errorMessageText = "";
        changeState(newState);
    }

    function stopResending() {
        let newState = cloneDeep(state);
        newState.resending = false;
        newState.resend = true;
        newState.errorMessageVisible = false;
        newState.errorMessageText = "";
        changeState(newState);
    }

    function errorSnackbar(text) {
        let newState = cloneDeep(state);
        newState.loading = false;
        newState.errorMessageVisible = true;
        newState.errorMessageText = text;
        changeState(newState);
    }

    function formValidation() {

        ["email", "zip", "city", "country"].forEach(key => {
            if (state.account[key] === "") {

                // 1. insert a space before all caps 2. uppercase all first characters
                // Source: https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
                let formattedString = key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                    return str.toUpperCase();
                });

                errorSnackbar("\"" + formattedString + "\" is empty");
                return false;
            }
        });

        if (state.account["newPassword"] !== state.account["newPasswordConfirmation"]) {
            errorSnackbar("\"New Password\" and \"New Password Confirmation\" do not match");
            return false;
        }

        return true;
    }

    function handleChange() {
        if (formValidation()) {
            axios.put("http://localhost:5000/backend/database/account", {
                email: props.account.email,
                api_key: props.api_key,

                new_email: state.account.email,

                account_zip: state.account.zip,
                account_city: state.account.city,
            })
                .then(response => {
                    if (response.data.status === "ok") {
                        props.handleNewAccountData(response.data.account);
                    } else {
                        errorSnackbar(response.data.status);
                    }
                }).catch(response => {
                console.log("Axios promise rejected! Response:");
                console.log(response);
                errorSnackbar("The server seems to be offline. See console for details.");
            });
        }
    }

    function handleResend() {
        startResending();

        axios.post("http://localhost:5000/backend/email/resend", {
            email: props.account.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    setTimeout(stopResending, 1000);
                } else {
                    errorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Response:");
            console.log(response);
            errorSnackbar("The server seems to be offline. See console for details.");
        });
    }

    function blurEmail() {
        handleChange();
        emailInputRef.current.blur();
    }

    function blurZip() {
        handleChange();
        zipInputRef.current.blur();
    }

    function blurCity() {
        handleChange();
        cityInputRef.current.blur();
    }

    function blurAll() {
        blurEmail();
        blurZip();
        blurCity();
    }

    return (
        <Container maxWidth="md" className="AccountPage">

                <Grid container spacing={1} className={classes.formContainer}>

                    <Grid item xs={props.account.email_verified ? 9 : 6}>
                        <CustomTextField
                            required disabled={props.account.email_verified}
                            ref={emailInputRef} onTab={blurEmail} onEnter={blurEmail} onEscape={blurEmail}
                            className={classes.textField} variant="outlined" label="Email" fullWidth
                            value={state.account.email} onChange={(email) => handleFormChange({email: email})}/>
                    </Grid>

                    <Grid item xs={props.account.email_verified ? 3 : 6}>
                        <div className="ButtonBox">
                            {!props.account.email_verified && (
                                <div className={classes.wrapper}>
                                    <Button variant="contained"
                                            disabled={state.resending || state.resend || props.account.email !== state.account.email}
                                            color="secondary"
                                            onClick={handleResend}
                                            className={classes.button}>Resend Verification</Button>
                                    {state.resending && (
                                        <CircularProgress size={24}
                                                          className={classes.buttonProgress}
                                                          color="secondary"/>
                                    )}
                                </div>
                            )}
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={state.resending || props.account.email !== state.account.email}
                                        color="secondary"
                                        className={classes.button}>Change Password</Button>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.divider}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required
                            ref={zipInputRef} onTab={blurZip} onEnter={blurZip} onEscape={blurZip}
                            className={classes.textField} variant="outlined" label="ZIP Code" fullWidth
                            value={state.account.zip} onChange={(zip) => handleFormChange({zip: zip})}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required
                            ref={cityInputRef} onTab={blurCity} onEnter={blurCity} onEscape={blurCity}
                            className={classes.textField} variant="outlined" label="City" fullWidth
                            value={state.account.city} onChange={(city) => handleFormChange({city: city})}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required disabled
                            className={classes.textField} variant="outlined" label="Country" fullWidth
                            value={state.account.country}/>
                    </Grid>

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
        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    account: state.account,
    api_key: state.api_key,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (account) => dispatch(handleNewAccountData(account)),
});

export const AccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPageComponent);

