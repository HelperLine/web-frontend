import React, {useState} from 'react';

import {connect} from 'react-redux';

import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";


import CloudOffIcon from '@material-ui/icons/CloudOff'
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import {CircularProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import {CallsPageTranslation} from "../../Translations/Pages/CallsPageTranslation";

import {handleNewAccountData, openMessage, closeMessage} from "../../ReduxActions";
import clsx from "clsx";


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

    snackbar: {
        margin: theme.spacing(1),
    },
    snackbarContentError: {
        backgroundColor: theme.palette.primary.main,
    },

    buttonBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
    },
    grayButton: {
        color: "white",
        backgroundColor: theme.palette.primary.transparent40,
    },
}));


function FilterComponent(props) {

    const classes = useStyles();

    let [typeFilter, setTypeFilter] = useState(props.filters.type);
    let [languageFilter, setLanguageFilter] = useState(props.filters.language);

    function handleTypeFilterClick(newState) {

        props.closeMessage();

        if (newState.local !== undefined) {
            if (newState.local) {
                Object.assign(newState, {global: false})
            } else {
                Object.assign(newState, {global: typeFilter.global})
            }
        } else {
            if (newState.global) {
                Object.assign(newState, {local: false})
            } else {
                Object.assign(newState, {local: typeFilter.local})
            }
        }

        pushFilterChange({type: newState, language: languageFilter});
        setTypeFilter(newState);
    }

    function handleLanguageFilterClick(newState) {

        props.closeMessage();

        if (newState.german !== undefined) {
            Object.assign(newState, {english: languageFilter.english})
        } else {
            Object.assign(newState, {german: languageFilter.german})
        }

        pushFilterChange({type: typeFilter, language: newState});
        setLanguageFilter(newState);
    }


    let [loadingNewCall, setLoadingNewCall] = useState(false);

    let [switchingOnline, setSwitchingOnline] = useState(false);


    function goOnline() {
        if (!props.account.phone_number_verified || !props.account.phone_number_confirmed) {
            props.openMessage("phone number not verified");
        } else {
            props.closeMessage();
            setSwitchingOnline(true);
            setTimeout(() => {
                axios.put(BACKEND_URL + "forward/online", {
                    email: props.email,
                    api_key: props.api_key,

                    filter_type_local: typeFilter.local,
                    filter_type_global: typeFilter.global,

                    filter_language_english: languageFilter.english,
                    filter_language_german: languageFilter.german,

                }).then((response) => {
                    setSwitchingOnline(false);

                    if (response.data.status === "ok") {
                        props.handleNewAccountData(response);
                    } else {
                        props.openMessage(response.data.status);
                    }
                }).catch(() => {
                    setSwitchingOnline(false);
                    props.openMessage("");
                })
            }, 500);
        }
    }


    function goOffline() {
        props.closeMessage();
        setSwitchingOnline(true);
        setTimeout(() => {
            axios.put(BACKEND_URL + "forward/offline", {
                email: props.email,
                api_key: props.api_key,

            }).then((response) => {
                setSwitchingOnline(false);

                if (response.data.status === "ok") {
                    props.handleNewAccountData(response);
                } else {
                    console.log(response.data.status);
                }
            }).catch(() => {
                setSwitchingOnline(false);
                props.openMessage("");
            })
        }, 500);
    }


    function pushFilterChange(newState) {
        axios.put(BACKEND_URL + "database/helper", {
            email: props.email,
            api_key: props.api_key,

            filter_type_local: newState.type.local,
            filter_type_global: newState.type.global,

            filter_language_english: newState.language.english,
            filter_language_german: newState.language.german,

        }).then(() => {
            console.log("Filters successfully changed");
        }).catch(() => {
            console.log("Filters could not be changed");
        })
    }

    function acceptNewCall() {

        if (!props.account.email_verified) {
            props.openMessage("email not verified");
        } else if (!languageFilter.german && !languageFilter.english) {
            props.openMessage("no language selected");
        } else {
            props.closeMessage();
            setLoadingNewCall(true);
            setTimeout(() => {

                axios.post(BACKEND_URL + "calls/accept", {
                    email: props.email,
                    api_key: props.api_key,

                    filter_type_local: typeFilter.local,
                    filter_type_global: typeFilter.global,

                    filter_language_german: languageFilter.german,
                    filter_language_english: languageFilter.english,
                })
                    .then(response => {
                        setLoadingNewCall(false);

                        if (response.data.status === "ok") {
                            props.handleNewAccountData(response);
                        } else {
                            props.openMessage(response.data.status);
                        }

                    }).catch(() => {
                        setLoadingNewCall(false);
                        props.openMessage("");
                    });
            }, 1000);
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} md={5}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Typography variant="h6" className={classes.rowTitle}>
                                {CallsPageTranslation.filter1[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={typeFilter.local}
                                      onChange={() => handleTypeFilterClick({local: !typeFilter.local})}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter2[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={typeFilter.global}
                                      onChange={() => handleTypeFilterClick({global: !typeFilter.global})}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter3[props.language]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container justify="center">
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Typography variant="h6" className={classes.rowTitle}>
                                {CallsPageTranslation.filter4[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={languageFilter.german}
                                      onChange={() => handleLanguageFilterClick({german: !languageFilter.german})}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter5[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={languageFilter.english}
                                      onChange={() => handleLanguageFilterClick({english: !languageFilter.english})}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter6[props.language]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={classes.buttonBox}>
                        <div className={classes.wrapper}>
                            <Button variant="contained"
                                    disabled={loadingNewCall || switchingOnline}
                                    color="secondary"
                                    onClick={acceptNewCall}
                                    startIcon={loadingNewCall ?
                                        <CircularProgress size={20} className={classes.buttonIcon} color="secondary"/> :
                                        <AddIcon className={classes.buttonIcon}/>
                                    }
                                    className={classes.button}>{CallsPageTranslation.acceptCall[props.language]}</Button>
                        </div>
                        <div className={classes.wrapper}>
                            <Button variant="contained"
                                    disabled={loadingNewCall || switchingOnline}
                                    color={props.account.online ? "secondary" : ""}
                                    onClick={props.account.online ? goOffline : goOnline}
                                    startIcon={switchingOnline ?
                                        <CircularProgress size={20} className={classes.buttonIcon} color="secondary"/> :
                                        (props.account.online ?
                                            <CloudDoneIcon className={classes.buttonIcon}/> :
                                            <CloudOffIcon className={classes.buttonIcon}/>
                                        )
                                    }
                                    className={clsx(classes.button, (!props.account.online ? classes.grayButton : ""))}>
                                {props.account.online ?
                                    CallsPageTranslation.currentlyOnline[props.language] :
                                    CallsPageTranslation.currentlyOffline[props.language]}
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,

    email: state.email,
    api_key: state.api_key,

    account: state.account,
    filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),
});

export const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);


