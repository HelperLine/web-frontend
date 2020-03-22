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
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";


var cloneDeep = require('lodash.clonedeep');


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
        errorMessageVisible: false,
        errorMessageText: "",
    });

    function handleFormChange(email, password) {
        changeState({
            email: email,
            password: password,
            loading: false,
            errorMessageVisible: false,
            errorMessageText: "",
        });
    }

    function startLoading() {
        blurEmail();
        blurPassword();

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

    function handleLogin() {
        startLoading();

        axios.post("http://localhost:5000/backend/login", {email: state.email, password: state.password})
            .then(response => {

                setTimeout(() => {
                    if (response.data.status === "ok") {
                        props.handleLogin(response.data.api_key, response.data.account);
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
                <Typography variant="h3" className={classes.title}>Login</Typography>

                <Grid container spacing={1} className={classes.formContainer}>
                    <Grid item xs={12}>
                        <CustomTextField
                            ref={emailInputRef}
                            onTab={focusPassword}
                            onEnter={focusPassword}
                            onEscape={blurEmail}

                            className={classes.textField}
                            variant="outlined"

                            label="email"
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

                            label="password"
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
                            <Link to={"/guide"} className={classes.link}>Cancel</Link>
                        </Button>
                    </div>
                    <div className={classes.wrapper}>
                        <Button variant="contained"
                                disabled={state.loading}
                                color="secondary"
                                onClick={handleLogin}
                                className={classes.button}>Login</Button>
                        {state.loading && (
                            <CircularProgress size={24}
                                              className={classes.buttonProgress}
                                              color="secondary"/>
                        )}
                    </div>
                </div>

                <Link to={"/register"} className={classes.switchLink}>Don't have an account yet?</Link>

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

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);

