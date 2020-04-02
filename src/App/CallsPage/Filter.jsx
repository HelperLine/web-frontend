import React, {useState} from 'react';

import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CommunityDrawing from './images/Drawing_Performance_Community_800px.png';
import SelfDrawing from './images/Drawing_Performance_Self_800px.png';
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";


import {CircularProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";


const useStyles = makeStyles(theme => ({

    checkListColumn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    checkListRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row"
    },
    rowTitle: {
        marginLeft: theme.spacing(1.2),
        marginBottom: theme.spacing(1),
    },


    button: {
        color: "white"
    },
    wrapper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        position: 'relative',
    },
    buttonIcon: {
        marginLeft: -8,
        marginRight: -4,
    },


    snackbar: {
        margin: theme.spacing(1),
    },
    snackbarContentError: {
        backgroundColor: theme.palette.primary.main,
    },
}));


export function Filter(props) {

    const classes = useStyles();

    let [callFilter, setCallFilter] = useState({local: false, global: false});
    let [callLanguage, setCallLanguage] = useState({german: true, english: true});

    function handleCallFilterClick(newState) {
        if (newState.local !== undefined) {
            if (newState.local) {
                Object.assign(newState, {global: false})
            } else {
                Object.assign(newState, {global: callFilter.global})
            }
        } else {
            if (newState.global) {
                Object.assign(newState, {local: false})
            } else {
                Object.assign(newState, {local: callFilter.local})
            }
        }

        // TODO: Push changes to redux and to server

        setCallFilter(newState);
    }

    function handleCallLanguageClick(newState) {
        if (newState.german !== undefined) {
            Object.assign(newState, {english: callLanguage.english})
        } else {
            Object.assign(newState, {german: callLanguage.german})
        }

        // TODO: Push changes to redux and to server

        setCallLanguage(newState);
    }


    let [loadingNewCall, setLoadingNewCall] = useState({loading: false});
    let [errorMessage, setErrorMessage] = useState({visible: false, text: ""});

    function axiosPutAction(action) {
        axios.put(BACKEND_URL + "backend/database/call", {
            email: props.email,
            api_key: props.api_key,
            action: action,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.handleNewCallData(response);
                    console.log(response.data.calls);
                } else if (response.data.status === "no new calls") {
                    setErrorMessage({
                        visible: true,
                        text: "No new calls",
                    });
                    setTimeout(() => {
                        setErrorMessage({
                            visible: true,
                            text: "No new calls",
                        });
                    }, 2000);
                }

            }).catch(response => {
            console.log("Axios promise rejected! Response:");
            console.log(response);
            setErrorMessage({
                visible: true,
                text: "Server offline",
            });
            setTimeout(() => {
                setErrorMessage({
                    visible: false,
                    text: "Server offline",
                });
            }, 2500);
        });
    }

    function acceptNewCall() {
        setLoadingNewCall({loading: true});
        setTimeout(() => {
            axiosPutAction("accept");
            setLoadingNewCall({loading: false});
        }, 1000);
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} md={4}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Typography variant="h6" className={classes.rowTitle}>
                                Which type of calls?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={callFilter.local}
                                      onChange={() => handleCallFilterClick({local: !callFilter.local})}/>
                            <Typography variant="subtitle1">Only local calls</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={callFilter.global}
                                      onChange={() => handleCallFilterClick({global: !callFilter.global})}/>
                            <Typography variant="subtitle1">Only non-local calls</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Typography variant="h6" className={classes.rowTitle}>
                                Which type of languages?
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={callLanguage.german}
                                      onChange={() => handleCallLanguageClick({german: !callLanguage.german})}/>
                            <Typography variant="subtitle1">German</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={callLanguage.english}
                                      onChange={() => handleCallLanguageClick({english: !callLanguage.english})}/>
                            <Typography variant="subtitle1">English</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="ButtonBox">
                        <div className={classes.wrapper}>
                            <Button variant="contained"
                                    disabled={loadingNewCall.loading}
                                    color="secondary"
                                    onClick={acceptNewCall}
                                    startIcon={loadingNewCall.loading ?
                                        <CircularProgress size={20} className={classes.buttonIcon} color="secondary"/> :
                                        <AddIcon className={classes.buttonIcon}/>
                                    }
                                    className={classes.button}>Accept Call</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <Snackbar className={classes.snackbar}
                      open={errorMessage.visible}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <SnackbarContent
                    className={classes.snackbarContentError}
                    aria-describedby="message-id"
                    message={<span id="message-id">{errorMessage.text}</span>}
                />
            </Snackbar>
        </React.Fragment>
    );
}
