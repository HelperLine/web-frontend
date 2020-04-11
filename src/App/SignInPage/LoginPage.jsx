import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {closeMessage, handleLogin, openMessage} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

import {Button} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";

import {CustomTextField} from "../../Components/CustomTextField";

import {BACKEND_URL} from "../../secrets";

import axios from 'axios';

import './SignInPage.scss';
import Grid from "@material-ui/core/Grid";

import {SignInTranslation} from "../../Translations/Pages/SignInTranslation";
import {WordTranslations} from "../../Translations/Standard/WordTranslations";


let cloneDeep = require('lodash.clonedeep');


const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2)
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    button: {
        color: "white"
    },
    textField: {
        display: "block",
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
    formContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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
        marginTop: theme.spacing(2)
    }
}));


export function LoginPageComponent(props) {

    const classes = useStyles();

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    let [state, changeState] = useState({
        email: "",
        password: "",
        loading: false,
    });

    function handleFormChange(email, password) {

        props.closeMessage();

        changeState({
            email: email,
            password: password,
            loading: false,
        });
    }

    function startLoading() {
        blurEmail();
        blurPassword();

        let newState = cloneDeep(state);
        newState.loading = true;
        changeState(newState);
    }

    function stopLoading() {
        let newState = cloneDeep(state);
        newState.loading = false;
        changeState(newState);
    }

    function handleLogin() {
        startLoading();

        axios.post(BACKEND_URL + "login/helper", {email: state.email, password: state.password})
            .then(response => {

                setTimeout(() => {
                    if (response.data.status === "ok") {
                        props.handleLogin(response);
                    } else {
                        stopLoading();
                        props.openMessage(response.data.status);
                    }
                }, 500);
            }).catch(response => {
                stopLoading();
                props.openMessage("");
            });
    }

    function focusEmail() {
        emailInputRef.current.focus();
    }

    function focusPassword() {
        passwordInputRef.current.focus();
    }

    function blurEmail() {
        emailInputRef.current.blur();
    }

    function blurPassword() {
        passwordInputRef.current.blur();
    }

    return (
        <Container maxWidth="xs" className={"SignInPage"}>
            <div className="SignInForm">
                <Typography variant="h3" className={classes.title}>{WordTranslations.login[props.language]}</Typography>

                <Grid container spacing={1} className={classes.formContainer}>
                    <Grid item xs={12}>
                        <CustomTextField
                            ref={emailInputRef}
                            onTab={focusPassword}
                            onEnter={focusPassword}
                            onEscape={blurEmail}

                            className={classes.textField}
                            variant="outlined"

                            label={WordTranslations.email[props.language]}
                            fullWidth

                            value={state.email}
                            onChange={(email) => handleFormChange(email, state.password)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            ref={passwordInputRef}
                            onTab={focusEmail}
                            onEnter={handleLogin}
                            onEscape={blurPassword}

                            className={classes.textField}
                            variant="outlined"

                            label={WordTranslations.password[props.language]}
                            type="password"
                            fullWidth

                            value={state.password}
                            onChange={(password) => handleFormChange(state.email, password)}/>
                    </Grid>
                </Grid>

                <div className="ButtonBox">
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                className={classes.button}>
                            <Link to={"/"} className={classes.link}>{WordTranslations.cancel[props.language]}</Link>
                        </Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                onClick={handleLogin}
                                className={classes.button}>{WordTranslations.login[props.language]}</Button>
                        {state.loading && (
                            <CircularProgress size={24}
                                              className={classes.buttonProgress}
                                              color="secondary"/>
                        )}
                    </div>
                </div>

                <Link to={"/register"} className={classes.switchLink}>{SignInTranslation.noAccountYet[props.language]}</Link>
            </div>
        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleLogin: (response) => dispatch(handleLogin(response)),
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

