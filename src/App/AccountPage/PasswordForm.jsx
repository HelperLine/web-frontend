import React, {createRef, useState} from 'react';

import {Button, CircularProgress, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";
import clsx from "clsx";

import {AccountPageTranslation} from "../../Translations/Pages/AccountPageTranslation";
import {WordTranslation} from "../../Translations/Standard/WordTranslations";
import {ErrorMessageTranslation} from "../../Translations/Standard/ErrorMessageTranslation";

import Dialog from "@material-ui/core/Dialog";
import {useStyles} from './styles';
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import {closeMessage, handleNewAccountData, openMessage} from "../../ReduxActions";
import {connect} from "react-redux";


export const PasswordFormComponent = (props) => {

    const password1InputRef = createRef();
    const password2InputRef = createRef();
    const password3InputRef = createRef();

    let [submitting, setSubmitting] = useState({submitting: false});


    const initialFormState = {
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    };

    let [formValues, setFormValues] = useState(initialFormState);

    const classes = useStyles();



    function handleFormChange(newFormData) {
        let newState = {
            old_password: formValues.old_password,
            new_password: formValues.new_password,
            new_password_confirmation: formValues.new_password_confirmation,
        };

        if ("email" in newFormData) {
            newState["email"] = newFormData["email"];
        }

        ["old_password", "new_password", "new_password_confirmation"].forEach(key => {
            if (key in newFormData) {
                newState[key] = newFormData[key];
            }
        });

        props.closeMessage();

        setFormValues(newState);
    }


    function cancel() {
        props.closeMessage();
        setFormValues(initialFormState);
        setSubmitting({submitting: false});
        props.handleClose();
    }

    function submit() {
        if (validation()) {

            setSubmitting({submitting: true});
            props.closeMessage();

            // Looks and feels better if the process actually takes some time
            setTimeout(() => {
                axios.put(BACKEND_URL + "database/helper", {
                    email: props.email,
                    api_key: props.api_key,

                    old_password: formValues.old_password,
                    new_password: formValues.new_password,
                })
                    .then(response => {
                        if (response.data.status === "ok") {
                            setSubmitting({submitting: false});
                            props.success();
                            setFormValues(initialFormState);
                        } else {
                            setSubmitting({submitting: false});
                            if (response.data.status === "password format invalid") {
                                props.openMessage(ErrorMessageTranslation.passwordInvalid[props.language]);
                            } else {
                                console.log(response);
                                props.openMessage(ErrorMessageTranslation.defaultError[props.language]);
                            }
                        }
                    }).catch(response => {
                        console.log("Axios promise rejected! Server response:");
                        console.log(response);
                        setSubmitting({submitting: false});
                        props.openMessage(ErrorMessageTranslation.serverOffline[props.language]);
                    });
            }, 1000);
        }

    }



    function validation() {

        ["old_password", "new_password", "new_password_confirmation"].forEach(key => {
            if (formValues[key] === "") {
                props.openMessage(ErrorMessageTranslation.passwordFieldEmpty[props.language]);
                return false;
            }
        });

        if (formValues.new_password !== formValues.new_password_confirmation) {
            props.openMessage(ErrorMessageTranslation.passwordConfirmationMatch[props.language]);
            return false;
        }

        if (formValues.new_password.length < 8) {
            props.openMessage(ErrorMessageTranslation.passwordTooShort[props.language]);
            return false;
        }

        return true;
    }


    function blur1() {
        password1InputRef.current.blur();
    }

    function focus2() {
        password2InputRef.current.focus();
    }

    function blur2() {
        password2InputRef.current.blur();
    }

    function focus3() {
        password3InputRef.current.focus();
    }

    function blur3() {
        password3InputRef.current.blur();
    }


    return (
        <Dialog onClose={cancel} aria-labelledby="simple-dialog-title" open={props.open}>

            <Container maxWidth="xs" className={classes.form2Container}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <CustomTextField
                            type="password" variant="outlined"
                            required disabled={submitting.submitting}
                            className={clsx(classes.textField, classes.passwordTextField)}

                            ref={password1InputRef}
                            onTab={focus2} onEnter={focus2}
                            onEscape={blur1}

                            label={WordTranslation.oldPassword[props.language]} fullWidth
                            value={formValues.old_password}
                            onChange={(value) => handleFormChange({old_password: value})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <CustomTextField
                            type="password" variant="outlined"
                            required disabled={submitting.submitting}
                            className={clsx(classes.textField, classes.passwordTextField)}

                            ref={password2InputRef}
                            onTab={focus3} onEnter={focus3}
                            onEscape={blur2}

                            label={WordTranslation.newPassword[props.language]} fullWidth
                            value={formValues.new_password}
                            onChange={(value) => handleFormChange({new_password: value})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <CustomTextField
                            type="password" variant="outlined"
                            required disabled={submitting.submitting}
                            className={clsx(classes.textField, classes.passwordTextField)}

                            ref={password3InputRef}
                            onTab={submit} onEnter={submit}
                            onEscape={blur3}

                            label={WordTranslation.newPasswordConfirmation[props.language]} fullWidth
                            value={formValues.new_password_confirmation}
                            onChange={(value) => handleFormChange({new_password_confirmation: value})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={clsx("ButtonBox", classes.buttonBox)}>
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={submitting.submitting}
                                        color="secondary"
                                        onClick={cancel}
                                        className={classes.button}>{WordTranslation.cancel[props.language]}</Button>
                            </div>
                            <div className={classes.wrapper}>
                                <Button variant="contained"
                                        disabled={submitting.submitting}
                                        color="secondary"
                                        onClick={submit}
                                        className={classes.button}>{WordTranslation.submit[props.language]}</Button>
                                {submitting.submitting && (
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
    )
};


const mapStateToProps = state => ({
    email: state.email,
    api_key: state.api_key,
    language: state.language,

    account: state.account,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),
});

export const PasswordForm = connect(mapStateToProps, mapDispatchToProps)(PasswordFormComponent);

