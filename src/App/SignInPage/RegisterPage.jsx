import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {handleLogin} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {Button} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import axios from 'axios';

import './SignInPage.scss';

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


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


export function RegisterPageComponent(props) {

    const classes = useStyles();

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const passwordConfirmationInputRef = useRef(null);
    const zipInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const countryInputRef = useRef(null);

    let [state, changeState] = useState({
        formData: {
            email: "",

            password: "",
            passwordConfirmation: "",

            zip: "",
            city: "",
            country: "Germany",
        },
        tabValue: 0,
        loading: false,
        errorMessageVisible: false,
        errorMessageText: "",
    });

    function handleFormChange(newFormData) {
        let newState = cloneDeep(state);

        ["email", "password", "passwordConfirmation", "zip", "city", "country"].forEach(key => {
            newState.formData[key] = key in newFormData ? newFormData[key] : newState.formData[key];
        });

        newState.loading = false;
        newState.errorMessageVisible = false;
        newState.errorMessageText = "";
        changeState(newState);
    }

    function startLoading() {
        blurAll();

        let newState = cloneDeep(state);
        newState.loading = true;
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

        ["email", "password", "passwordConfirmation", "zip", "city", "country"].forEach(key => {
            if (state.formData[key] === "") {

                // 1. insert a space before all caps 2. uppercase all first characters
                // Source: https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
                let formattedString = key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                    return str.toUpperCase();
                });

                errorSnackbar("\"" + formattedString + "\" is empty");
                return false;
            }
        });

        if (state.formData["password"] !== state.formData["passwordConfirmation"]) {
            errorSnackbar("\"Password\" and \"Password Confirmation\" do not match");
            return false;
        }

        return true;
    }

    function handleLogin() {
        startLoading();

        if (formValidation()) {
            axios.post("http://localhost:5000/backend/database/account", {
                account_email: state.formData.email,

                account_password: state.formData.password,
                account_passwordConfirmation: state.formData.passwordConfirmation,

                account_zip: state.formData.zip,
                account_city: state.formData.city,
                account_country: state.formData.country,
            })
                .then(response => {

                    setTimeout(() => {
                        if (response.data.status === "ok") {
                            props.handleLogin(response.data.email, response.data.api_key);
                        } else {
                            errorSnackbar(response.data.status);
                        }
                    }, 1000);
                }).catch(response => {
                console.log("Axios promise rejected! Response:");
                console.log(response);
                errorSnackbar("The server seems to be offline. See console for details.");
            });
        }
    }


    function focusEmail() {
        emailInputRef.current.focus();
    }

    function focusPassword() {
        passwordInputRef.current.focus();
    }

    function focusPasswordConfirmation() {
        passwordConfirmationInputRef.current.focus();
    }

    function focusZip() {
        zipInputRef.current.focus();
    }

    function focusCity() {
        cityInputRef.current.focus();
    }

    function focusCountry() {
        countryInputRef.current.focus();
    }


    function blurEmail() {
        emailInputRef.current.blur();
    }

    function blurPassword() {
        passwordInputRef.current.blur();
    }

    function blurPasswordConfirmation() {
        passwordConfirmationInputRef.current.blur();
    }

    function blurZip() {
        zipInputRef.current.blur();
    }

    function blurCity() {
        cityInputRef.current.blur();
    }

    function blurCountry() {
        countryInputRef.current.blur();
    }

    function blurAll() {
        blurEmail();
        blurPassword();
        blurPasswordConfirmation();
        blurZip();
        blurCity();
        blurCountry();
    }

    return (
        <Container maxWidth="md" className="SignInPage">
            <div className="SignInForm">
                <Typography variant="h3" className={classes.title}>Register</Typography>

                <Grid container spacing={1} className={classes.formContainer}>

                    <Grid item xs={12}>
                        <CustomTextField
                            required
                            ref={emailInputRef} onTab={focusPassword} onEnter={focusPassword} onEscape={blurEmail}
                            className={classes.textField} variant="outlined" label="Email" fullWidth
                            value={state.formData.email} onChange={(email) => handleFormChange({email: email})}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required type="password"
                            ref={passwordInputRef} onTab={focusPasswordConfirmation} onEnter={focusPasswordConfirmation}
                            onEscape={blurPassword}
                            className={classes.textField} variant="outlined" label="Password" fullWidth
                            value={state.formData.password}
                            onChange={(password) => handleFormChange({password: password})}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required type="password"
                            ref={passwordConfirmationInputRef} onTab={focusZip} onEnter={focusZip}
                            onEscape={blurPasswordConfirmation}
                            className={classes.textField} variant="outlined" label="Confirm Password" fullWidth
                            value={state.formData.passwordConfirmation}
                            onChange={(passwordConfirmation) => handleFormChange({passwordConfirmation: passwordConfirmation})}/>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.divider}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required
                            ref={zipInputRef} onTab={focusCity} onEnter={focusCity} onEscape={blurZip}
                            className={classes.textField} variant="outlined" label="ZIP Code" fullWidth
                            value={state.formData.zip} onChange={(zip) => handleFormChange({zip: zip})}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required
                            ref={cityInputRef} onTab={focusCountry} onEnter={focusCountry} onEscape={blurCity}
                            className={classes.textField} variant="outlined" label="City" fullWidth
                            value={state.formData.city} onChange={(city) => handleFormChange({city: city})}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <CustomTextField
                            required disabled
                            ref={countryInputRef} onTab={focusEmail} onEnter={handleLogin} onEscape={blurCountry}
                            className={classes.textField} variant="outlined" label="Country" fullWidth
                            value={state.formData.country}
                            onChange={(country) => handleFormChange({country: country})}/>
                    </Grid>

                </Grid>

                <div className="ButtonBox">
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                className={classes.button}>
                            <Link to={"/guide"} className={classes.link}>Cancel</Link>
                        </Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                onClick={handleLogin}
                                className={classes.button}>Register</Button>
                        {state.loading && (
                            <CircularProgress size={24}
                                              className={classes.buttonProgress}
                                              color="secondary"/>
                        )}
                    </div>
                </div>

                <Link to={"/login"} className={classes.switchLink}>Already have an account?</Link>

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
            </div>
        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    handleLogin: (email, api_key) => dispatch(handleLogin(email, api_key)),
});

export const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPageComponent);

