import React, {useState} from 'react';

import {Button, CircularProgress, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";
import {AccountPageTranslation} from "./AccountPageTranslation";


import {useStyles} from './styles';
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";


import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import {handleNewAccountData} from "../../ReduxActions";
import IconButton from "@material-ui/core/IconButton";




let cloneDeep = require('lodash.clonedeep');


export const PhoneFormComponent = (props) => {

    const classes = useStyles();




    const initialState = {
        open: false,
        popupStyle: 1,
        fetchingCode: false,
        fetchingNumber: false,
        fetchingConfirmation: false,
        code: "",
        phone_number: "",
    };

    // popupStyle 0 = Dialog hidden
    // popupStyle 1 = Show Code and intructions
    // popupStyle 2 = Show Phone number to be confirmed and buttons "yes"/"no"
    let [verifyPopup, setVerifyPopupState] = useState(initialState);

    function setVerifyPopup(newState) {
        let oldState = cloneDeep(verifyPopup);
        Object.assign(oldState, newState);
        setVerifyPopupState(oldState);
    }


    let [countdown, setCountdown] = useState({
        interval: undefined,
        minutes_left: 3,
        seconds_left: 0,
    });


    function setState0() {
        setVerifyPopup({open: false});
    }


    function setState1() {
        clearInterval(countdown.interval);
        setCountdown({
            minutes_left: 3,
            seconds_left: 0,
        });

        props.hideErrorSnackbar();
        if (!verifyPopup.open) {
            props.setActiveProcesses({verifying: true});
        }

        setVerifyPopup({
            fetchingCode: true,
        });

        setTimeout(() => {
            triggerFetchingCode();
        }, 500);
    }


    function setState2(code) {

        let deadline = new Date().getTime();

        setVerifyPopup({
            open: true,
            popupStyle: 1,
            fetchingCode: false,

            code: code,
        });

        // Update the count down every 1 second
        let interval = setInterval(function() {

            let now = new Date().getTime();
            let distance = deadline - now + (3 * 60 * 1000);

            if (distance > 0) {
                setCountdown({
                    interval: interval,
                    minutes_left: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds_left: Math.floor((distance % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(countdown.interval);
                setCountdown({
                    interval: undefined,
                    minutes_left: 0,
                    seconds_left: 0,
                });
            }
        }, 100);
    }


    function formatCountdown(minutes_left, seconds_left) {
        let minutes_left_string = minutes_left.toString();
        let seconds_left_string = seconds_left.toString();

        switch (minutes_left_string.length) {
            case 0:
                minutes_left_string = "00" + minutes_left_string;
                break;
            case 1:
                minutes_left_string = "0" + minutes_left_string;
                break;
            default:
                break;
        }

        switch (seconds_left_string.length) {
            case 0:
                seconds_left_string = "00" + seconds_left_string;
                break;
            case 1:
                seconds_left_string = "0" + seconds_left_string;
                break;
            default:
                break;
        }

        return minutes_left_string + ":" + seconds_left_string;
    }


    function setState3() {
        clearInterval(countdown.interval);
        props.hideErrorSnackbar();

        setVerifyPopup({
            fetchingNumber: true,
        });

        setTimeout(() => {
            triggerFetchingPhoneNumber();
        }, 500);
    }


    function setState4(phone_number) {
        setVerifyPopup({
            popupStyle: 2,
            fetchingNumber: false,
            phone_number: phone_number,
        });
    }


    function setState5() {
        props.hideErrorSnackbar();

        setVerifyPopup({
            fetchingConfirmation: true,
        });

        setTimeout(() => {
            triggerFetchingConfirmation();
        }, 500);
    }




    function triggerFetchingCode() {
        axios.post(BACKEND_URL + "backend/phone/trigger", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.setActiveProcesses({verifying: false});
                    setState2(response.data.token);
                } else {
                    setState0();
                    props.setActiveProcesses({verifying: false});
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            setState0();
            props.setActiveProcesses({verifying: false});
            props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });
    }


    function triggerFetchingPhoneNumber() {
        axios.put(BACKEND_URL + "backend/database/account", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    let phone_number = response.data.account.phone_number;

                    if (phone_number !== "") {
                        setState4(phone_number);
                    } else {
                        setState2(verifyPopup.code);
                        props.showErrorSnackbar("Are you sure?");
                    }
                } else {
                    setState0();
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            setState0();
            props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });
    }


    function triggerFetchingConfirmation() {
        axios.post(BACKEND_URL + "backend/phone/confirm", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    setState0();
                    props.handleNewAccountData(response);
                } else {
                    setState0();
                    props.showErrorSnackbar(response.data.status);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Server response:");
            console.log(response);
            setState0();
            props.showErrorSnackbar(AccountPageTranslation.serverOffline[props.language]);
        });
    }




    return (
        <React.Fragment>
            <Grid item xs={12} md={8}>
                <CustomTextField
                    disabled className={classes.textField} variant="outlined"
                    value={(props.account.phone_number_verified
                        && props.account.phone_number_confirmed) ? props.account.phone_number : ""}
                    label={AccountPageTranslation.phoneNumber[props.language]} fullWidth/>
            </Grid>

            <Grid item xs={12} md={4} className={classes.flexButtonBox}>
                <div className={classes.wrapper}>
                    <Button variant="contained" color="secondary" className={classes.button}
                            disabled={props.activeProcesses.submitting || props.activeProcesses.resending || props.activeProcesses.verifying || props.formModified}
                            onClick={setState1} startIcon={<AddIcon className={classes.startIcon}/>}>
                        {AccountPageTranslation.verifyPhoneNumber[props.language]}
                    </Button>
                    {(props.activeProcesses.verifying && !verifyPopup.open) && (
                        <CircularProgress size={24} className={classes.buttonProgress} color="secondary"/>
                    )}
                </div>
            </Grid>

            <Dialog onClose={setState0} maxWidth="sm" fullWidth open={verifyPopup.open}>

                <IconButton aria-label="delete" className={classes.phoneDialogClose} onClick={setState0}>
                    <CloseIcon/>
                </IconButton>

                <Container maxWidth="sm" className={classes.phoneDialog}>

                    <Typography variant="h5" className={classes.phoneDialogTitle}>
                        <strong>Phone Number Confirmation</strong>
                    </Typography>



                    {verifyPopup.popupStyle === 1 && (
                        <Typography variant="subtitle1" className={classes.phoneDialogText}>
                            Please call <a href="tel:+493025555301" className={classes.pinkLink}><strong>+49 30 2555 5301</strong></a> with the phone number you want to confirm.
                        </Typography>
                    )}

                    {verifyPopup.popupStyle === 2 && (
                        <Typography variant="subtitle1" className={classes.phoneDialogText}>
                            Is this your phone number?
                        </Typography>
                    )}



                    {verifyPopup.popupStyle === 1 && (
                        <Typography variant="h5" className={classes.phoneDialogCode}>
                            Code: <strong>{verifyPopup.code}</strong>
                            &nbsp; ({formatCountdown(countdown.minutes_left, countdown.seconds_left)})
                        </Typography>
                    )}

                    {verifyPopup.popupStyle === 2 && (
                        <Typography variant="h5" className={classes.phoneDialogCode}>
                            Phone Number: <strong>{verifyPopup.phone_number}</strong>
                        </Typography>
                    )}



                    <div className={classes.phoneDialogButton}>

                        {verifyPopup.popupStyle === 1 && (
                            <div className={classes.wrapper}>
                                <Button disableElevation
                                        variant="contained" color="secondary" className={classes.button}
                                        disabled={verifyPopup.fetchingNumber}
                                        onClick={setState3}>
                                    {AccountPageTranslation.verifyPhoneNumberButton1[props.language]}
                                </Button>
                                {verifyPopup.fetchingNumber && (
                                    <CircularProgress size={24} className={classes.buttonProgress}
                                                      color="secondary"/>
                                )}
                            </div>
                        )}

                        {verifyPopup.popupStyle === 2 && (
                            <React.Fragment>
                                <div className={classes.wrapper}>
                                    <Button disableElevation
                                            variant="contained" className={classes.button}
                                            disabled={verifyPopup.fetchingCode || verifyPopup.fetchingConfirmation}
                                            onClick={setState1}>
                                        {AccountPageTranslation.no[props.language]}
                                    </Button>
                                    {verifyPopup.fetchingCode && (
                                        <CircularProgress size={24} className={classes.buttonProgress}
                                                          color="secondary"/>
                                    )}
                                </div>

                                <div className={classes.wrapper}>
                                    <Button disableElevation
                                            variant="contained" color="secondary" className={classes.button}
                                            disabled={verifyPopup.fetchingConfirmation}
                                            onClick={setState5}>
                                        {AccountPageTranslation.yes[props.language]}
                                    </Button>
                                    {verifyPopup.fetchingConfirmation && (
                                        <CircularProgress size={24} className={classes.buttonProgress}
                                                          color="secondary"/>
                                    )}
                                </div>
                            </React.Fragment>
                        )}

                    </div>

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

