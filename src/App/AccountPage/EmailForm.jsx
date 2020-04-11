import React, {createRef, useState} from 'react';

import {Button, CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";

import {WordTranslation} from "../../Translations/Standard/WordTranslations";
import {ErrorMessageTranslation} from "../../Translations/Standard/ErrorMessageTranslation";

import {useStyles} from './styles';
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import {connect} from "react-redux";

import EmailIcon from '@material-ui/icons/Email';
import {closeMessage, openMessage} from "../../ReduxActions";


export const EmailFormComponent = (props) => {

    const emailInputRef = createRef();

    let [resendPossible, setResendPossible] = useState({resendPossible: true});

    const classes = useStyles();




    function submit() {
        props.closeMessage();
        props.setActiveProcesses({resending: true});

        axios.post(BACKEND_URL + "email/resend", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.setActiveProcesses({resending: false});
                    setResendPossible({resendPossible: false});
                } else {
                    props.setActiveProcesses({resending: false});
                    setResendPossible({resendPossible: false});
                    props.openMessage(response.data.status);
                }
            }).catch(response => {
                console.log("Axios promise rejected! Server response:");
                console.log(response);
                props.setActiveProcesses({resending: false});
                setResendPossible({resendPossible: false});
                props.openMessage(ErrorMessageTranslation.serverOffline[props.language]);
            });
    }




    function blur() {
        emailInputRef.current.blur();
    }


    return (
        <React.Fragment>
            <Grid item xs={12} md={props.account.email_verified ? 12 : 8}>
                <CustomTextField
                    required
                    disabled={props.account.email_verified || props.activeProcesses.submitting || props.activeProcesses.resending}
                    className={classes.textField} variant="outlined"

                    ref={emailInputRef}
                    onTab={blur} onEnter={blur} onEscape={blur}

                    label={WordTranslation.email[props.language]} fullWidth
                    value={props.value} onChange={(email) => props.handleChange({email: email})}/>
            </Grid>

            {!props.account.email_verified && (
                <Grid item xs={12} md={4} className={classes.flexButtonBox}>
                    <div className={classes.wrapper}>
                        <Button variant="contained"  color="secondary" className={classes.button}
                                disabled={props.activeProcesses.submitting || props.activeProcesses.resending || props.formModified || !resendPossible.resendPossible}
                                onClick={submit} startIcon={<EmailIcon className={classes.startIcon}/>}>
                            {WordTranslation.verification[props.language]}
                        </Button>
                        {props.activeProcesses.resending && (
                            <CircularProgress size={24} className={classes.buttonProgress} color="secondary"/>
                        )}
                    </div>
                </Grid>
            )}
        </React.Fragment>
    )
};


const mapStateToProps = state => ({
    email: state.email,
    api_key: state.api_key,
    language: state.language,

    account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),
});

export const EmailForm = connect(mapStateToProps, mapDispatchToProps)(EmailFormComponent);

