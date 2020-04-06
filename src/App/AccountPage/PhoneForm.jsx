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


export const PhoneFormComponent = (props) => {

    const phoneInputRef = createRef();

    let [verifyPopup, setVerifyPopup] = useState({open: false, token: ""});

    const classes = useStyles();

    console.log(props);

    function blur() {
        phoneInputRef.current.blur();
    }

    function triggerVerification () {
        props.hideErrorSnackbar();
        props.setActiveProcesses({verifying: true});

        axios.post(BACKEND_URL + "backend/phone/trigger", {
            email: props.email,
            api_key: props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.setActiveProcesses({verifying: false});
                    setVerifyPopup({open: true, token: response.data.token});
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

    return (
        <React.Fragment>
            <Grid item xs={12} md={8}>
                {props.account.phone_number_verified && (
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
                    {props.activeProcesses.verifying && (
                        <CircularProgress size={24} className={classes.buttonProgress} color="secondary"/>
                    )}
                </div>
            </Grid>

            <Dialog onClose={() => setVerifyPopup({open: false})} open={verifyPopup.open}>

                <Container maxWidth="xs" className={classes.form2Container}>
                    <Typography variant="h6">Phone Number Confirmation</Typography>

                    <Typography variant="subtitle1">
                        Please call +49 30 2555 5301 with the phone number you want to confirm.

                        <br/>

                        Enter the following code and confirm with '#'. Wait few seconds to start over.

                        <br/>

                        Code: <strong>{verifyPopup.token}</strong>
                    </Typography>

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

const mapDispatchToProps = () => ({
});

export const PhoneForm = connect(mapStateToProps, mapDispatchToProps)(PhoneFormComponent);

