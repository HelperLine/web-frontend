import React from 'react';



import {useStyles} from './styles';
import {Button, CircularProgress} from "@material-ui/core";

import {WordTranslations} from "../../Translations/Standard/WordTranslations";

import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import {handleNewAccountData, openMessage, closeMessage} from "../../ReduxActions";
import {connect} from "react-redux";


const FormSubmissionComponent = (props) => {

    const classes = useStyles();

    function submit() {

        if (validation()) {
            props.setActiveProcesses({submitting: true});
            props.closeMessage();

            // Looks and feels better if the process actually takes some time
            setTimeout(() => {
                axios.put(BACKEND_URL + "database/helper", {
                    email: props.email,
                    api_key: props.api_key,

                    new_email: props.formValues.email,
                    zip_code: props.formValues.zip_code,
                    country: props.formValues.country,
                })
                    .then(response => {
                        if (response.data.status === "ok") {
                            props.setActiveProcesses({submitting: false});
                            props.handleNewAccountData(response);
                            props.setFormModified({modified: false});
                            props.openMessage("success");
                        } else {
                            props.setActiveProcesses({submitting: false});
                            props.openMessage(response.data.status);
                        }
                    }).catch(() => {
                        props.setActiveProcesses({submitting: false});
                        props.openMessage("");
                    });
            }, 1000);
        }
    }

    function validation() {
        ["email", "zip_code", "country"].forEach(key => {
            if (props.formValues[key] === "") {
                props.openMessage("field empty");
                return false;
            }
        });

        return true;
    }

    if (props.open) {
        return (
            <Grid item xs={12}>
                <div className="ButtonBox">
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={props.activeProcesses.submitting || props.activeProcesses.resending}
                                color="secondary"
                                onClick={props.cancel}
                                className={classes.button}>{WordTranslations.cancel[props.language]}</Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={props.activeProcesses.submitting || props.activeProcesses.resending}
                                color="secondary"
                                onClick={submit}
                                className={classes.button}>{WordTranslations.submit[props.language]}</Button>
                        {props.activeProcesses.submitting && (
                            <CircularProgress size={24}
                                              className={classes.buttonProgress}
                                              color="secondary"/>
                        )}
                    </div>
                </div>
            </Grid>
        );
    } else {
        return "";
    }
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

export const FormSubmission = connect(mapStateToProps, mapDispatchToProps)(FormSubmissionComponent);

