import React, {useState, useRef} from 'react';

import {connect} from 'react-redux';
import {handleNewAccountData, openMessage, closeMessage} from '../../ReduxActions';

import {Container} from "@material-ui/core";

import {Button} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import './AccountPage.scss';

import Grid from "@material-ui/core/Grid";

import {WordTranslations} from "../../Translations/Standard/WordTranslations";

import {useStyles} from './styles';
import {PasswordForm} from "./PasswordForm";
import {FormSubmission} from "./FormSubmission";
import {EmailForm} from "./EmailForm";
import {PhoneForm} from "./PhoneForm";
import VpnKeyIcon from '@material-ui/icons/VpnKey';


export function AccountPageComponent(props) {

    const classes = useStyles();

    const zipInputRef = useRef(null);

    const initialFormValues = {
        email: props.email,

        phone_number: props.account.phone_number,
        zip_code: props.account.zip_code,
        country: props.account.country,
    };
    let [formValues, setFormValues] = useState(initialFormValues);

    let [formModified, setFormModified] = useState({modified: false});

    let [activeProcesses, setActiveProcesses] = useState({submitting: false, resending: false, verifying: false});
    let [passwordFormOpen, setPasswordFormOpen] = useState({open: false});


    function resetFormChange() {
        props.closeMessage();
        setFormValues({...initialFormValues});
    }

    function handleFormChange(newFormData) {

        props.closeMessage();

        let newState = {
            email: formValues.email,
            phone_number: formValues.phone_number,
            zip_code: formValues.zip_code,
            country: formValues.country,
        };

        let form1Modified = false;

        if ("email" in newFormData) {
            newState["email"] = newFormData["email"];
            form1Modified = (newFormData["email"] !== props["email"]);
        } else {
            form1Modified = (newState["email"] !== props["email"]) || form1Modified;
        }

        ["phone_number", "zip_code", "country"].forEach(key => {
            if (key in newFormData) {
                newState[key] = newFormData[key];
                form1Modified = (newFormData[key] !== props.account[key]) || form1Modified;
            } else {
                form1Modified = (newState[key] !== props.account[key]) || form1Modified;
            }
        });

        setFormModified({modified: form1Modified});
        setFormValues(newState);
    }


    function blurZip() {
        zipInputRef.current.blur()
    }


    function form2Success() {
        props.openMessage("success");
        setPasswordFormOpen({open: false});
    }


    return (
        <Container maxWidth="md" className="AccountPage">

            <Grid container spacing={2} className={classes.formContainer}>

                <EmailForm value={formValues.email}
                           handleChange={handleFormChange}

                           formModified={formModified.modified}

                           activeProcesses={activeProcesses}
                           setActiveProcesses={setActiveProcesses}
                />

                <PhoneForm value={formValues.phone_number}
                           handleChange={handleFormChange}

                           formModified={formModified.modified}

                           activeProcesses={activeProcesses}
                           setActiveProcesses={setActiveProcesses}
                />

                <Grid item xs={12} md={4}>
                    <CustomTextField
                        required
                        disabled={activeProcesses.submitting || activeProcesses.resending}

                        ref={zipInputRef} onTab={blurZip} onEnter={blurZip} onEscape={blurZip}

                        className={classes.textField} variant="outlined"
                        label={WordTranslations.zipCode[props.language]} fullWidth
                        value={formValues.zip_code} onChange={(zip_code) => handleFormChange({zip_code: zip_code})}/>
                </Grid>

                <Grid item xs={12} md={4}>
                    <CustomTextField
                        required disabled
                        className={classes.textField} variant="outlined"
                        label={WordTranslations.country[props.language]} fullWidth
                        value={formValues.country}/>
                </Grid>

                <Grid item xs={12} md={4} className={classes.flexButtonBox}>
                        <Button disableElevation variant="contained"
                                disabled={activeProcesses.resending || formModified.modified}

                                onClick={() => setPasswordFormOpen({open: true})}
                                startIcon={<VpnKeyIcon className={classes.startIcon}/>}
                                className={classes.grayButton}>{WordTranslations.password[props.language]}</Button>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.divider}/>
                </Grid>










                <FormSubmission formValues={formValues}

                                open={formModified.modified}

                                success={form2Success}

                                activeProcesses={activeProcesses}
                                setActiveProcesses={setActiveProcesses}
                                cancel={resetFormChange}
                                setFormModified={setFormModified}
                />


            </Grid>

            <PasswordForm open={passwordFormOpen.open}
                          handleClose={() => setPasswordFormOpen({open: false})}
                          language={props.language}

                          success={form2Success}
            />

        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */


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

export const AccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPageComponent);

