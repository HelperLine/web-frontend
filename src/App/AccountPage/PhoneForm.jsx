import React, {createRef, useState} from 'react';

import {Button, CircularProgress, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";
import {AccountPageTranslation} from "./AccountPageTranslation";


import {useStyles} from './styles';
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import {connect} from "react-redux";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";


import AddIcon from '@material-ui/icons/Add';
import {handleNewAccountData} from "../../ReduxActions";


export const PhoneFormComponent = (props) => {

    const phoneInputRef = createRef();

    // Step 1 = Show Code and intructions
    // Step 2 = Show Phone number to be confirmed and button "confirm"
    let [verifyPopup, setVerifyPopup] = useState({open: false, step: 1, pulling: false, token: ""});

    const classes = useStyles();

    console.log(props);

    function blur() {
        phoneInputRef.current.blur();
    }

    function triggerVerification() {
        props.hideErrorSnackbar();
        props.setActiveProcesses({verifying: true});

        axios.post(BACKEND_URL + "backend/phone/trigger", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.setActiveProcesses({verifying: false});
                    openDialog(response.data.token);
                } else {
                    props.setActiveProcesses({verifying: false});
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            props.setActiveProcesses({verifying: false});
            props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });
    }

    function openDialog(token) {
        setVerifyPopup({
            open: true,
            step: 1,
            pulling: false,
            token: token
        });
    }

    function convertDialog(phone_number) {
        setVerifyPopup({
            open: true,
            step: 2,
            pulling: false,
            token: phone_number
        });
    }


    function revertDialog() {
        setVerifyPopup({
            open: true,
            step: 1,
            pulling: false,
            token: verifyPopup.token,
        });
    }

    function notMyNumber() {
        setVerifyPopup({
            open: true,
            step: 2,
            pulling: true,
            token: verifyPopup.token,
        });

        triggerVerification();
    }


    function abortDialog() {
        setVerifyPopup({
            open: false,
            step: 1,
            pulling: false,
            token: ""
        });
    }

    function triggerConfirmation() {
        setVerifyPopup({
            open: true,
            step: 2,
            pulling: true,
            token: verifyPopup.token,
        });

        axios.post(BACKEND_URL + "backend/phone/confirm", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    abortDialog();
                    props.handleNewAccountData(response);
                } else {
                    abortDialog();
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            abortDialog();
            props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });

    }


    function triggerPulling1() {
        setVerifyPopup({
            open: true,
            step: 1,
            pulling: true,
            token: verifyPopup.token,
        });

        axios.put(BACKEND_URL + "backend/database/account", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    let phone_number = response.data.account.phone_number;

                    if (phone_number !== "") {
                        convertDialog(phone_number);
                    } else {
                        revertDialog();
                        props.showErrorSnackbar("Are you sure?");
                    }
                } else {
                    abortDialog();
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
                console.log("Axios promise rejected! Server response:");
                console.log(response);
                abortDialog();
                props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
            });
    }


    return (
        <React.Fragment>
            <Grid item xs={12} md={8}>
                {(props.account.phone_number_verified && props.account.phone_number_confirmed) && (
                    <CustomTextField
                        disabled className={classes.textField} variant="outlined" value={props.account.phone_number}
                        label={AccountPageTranslation.phoneNumber[props.language]} fullWidth/>
                )}
            </Grid>

            <Grid item xs={12} md={4} className={classes.flexButtonBox}>
                <div className={classes.wrapper}>
                    <Button variant="contained" color="secondary" className={classes.button}
                            disabled={props.activeProcesses.submitting || props.activeProcesses.resending || props.activeProcesses.verifying || props.formModified}
                            onClick={triggerVerification} startIcon={<AddIcon className={classes.startIcon}/>}>
                        {AccountPageTranslation.verifyPhoneNumber[props.language]}
                    </Button>
                    {(props.activeProcesses.verifying && !verifyPopup.open) && (
                        <CircularProgress size={24} className={classes.buttonProgress} color="secondary"/>
                    )}
                </div>
            </Grid>

            <Dialog onClose={() => setVerifyPopup({open: false})} open={verifyPopup.open}>

                <Container maxWidth="sm" className={classes.phoneDialog}>
                    <Typography variant="h5" className={classes.phoneDialogTitle}>
                        <strong>Phone Number Confirmation</strong>
                    </Typography>

                    {verifyPopup.step === 1 && (
                        <React.Fragment>
                            <Typography variant="subtitle1">
                                Please call <strong>+49 30 2555 5301</strong> with the phone number you want to confirm.
                            </Typography>

                            <Typography variant="h5" className={classes.phoneDialogCode}>
                                Code: <strong>{verifyPopup.token}</strong>
                            </Typography>

                            <div className={classes.phoneDialogButton}>
                                <div className={classes.wrapper}>
                                    <Button variant="contained" color="secondary" className={classes.button}
                                            disabled={verifyPopup.pulling}
                                            onClick={triggerPulling1}>
                                        {AccountPageTranslation.verifyPhoneNumberButton1[props.language]}
                                    </Button>
                                    {verifyPopup.pulling && (
                                        <CircularProgress size={24} className={classes.buttonProgress}
                                                          color="secondary"/>
                                    )}
                                </div>
                            </div>

                            <Typography variant="subtitle1">
                                <em>Enter the given code and confirm with '#'. Wait few seconds to start over.</em>
                            </Typography>
                        </React.Fragment>
                    )}

                    {verifyPopup.step === 2 && (
                        <React.Fragment>
                            <Typography variant="subtitle1">
                                Is this your phone number?
                            </Typography>

                            <Typography variant="h5" className={classes.phoneDialogCode}>
                                <strong>{verifyPopup.token}</strong>
                            </Typography>

                            <div className={classes.phoneDialogButton}>
                                <div className={classes.wrapper}>
                                    <Button variant="contained" color="secondary" className={classes.button}
                                            disabled={verifyPopup.pulling || props.activeProcesses.verifying}
                                            onClick={notMyNumber}>
                                        {AccountPageTranslation.no[props.language]}
                                    </Button>
                                    {props.activeProcesses.verifying && (
                                        <CircularProgress size={24} className={classes.buttonProgress} color="secondary"/>
                                    )}
                                </div>

                                <div className={classes.wrapper}>
                                    <Button variant="contained" color="secondary" className={classes.button}
                                            disabled={verifyPopup.pulling || props.activeProcesses.verifying}
                                            onClick={triggerConfirmation}>
                                        {AccountPageTranslation.yes[props.language]}
                                    </Button>
                                </div>
                            </div>
                        </React.Fragment>
                    )}

                </Container>
            </Dialog>
        </React.Fragment>
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
});

export const PhoneForm = connect(mapStateToProps, mapDispatchToProps)(PhoneFormComponent);

