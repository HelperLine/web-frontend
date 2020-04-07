import React, {useState} from 'react';

import {connect} from 'react-redux';

import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";


import {CircularProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";


import {CallsPageTranslation} from './CallsPageTranslation';
import {handleNewAccountData} from "../../ReduxActions";


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
}));


function FilterComponent(props) {

    const classes = useStyles();

    let [typeFilter, setTypeFilter] = useState(props.filters.type);
    let [languageFilter, setLanguageFilter] = useState(props.filters.language);

    function handleTypeFilterClick(newState) {
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

        // TODO: Push changes to redux and to server

        pushFilterChange({type: newState, language: languageFilter});
        setTypeFilter(newState);
    }

    function handleLanguageFilterClick(newState) {
        if (newState.german !== undefined) {
            Object.assign(newState, {english: languageFilter.english})
        } else {
            Object.assign(newState, {german: languageFilter.german})
        }

        // TODO: Push changes to redux and to server

        pushFilterChange({type: typeFilter, language: newState});
        setLanguageFilter(newState);
    }


    let [loadingNewCall, setLoadingNewCall] = useState({loading: false});
    let [errorMessage, setErrorMessage] = useState({visible: false, text: ""});


    function pushFilterChange(newState) {
        axios.put(BACKEND_URL + "backend/database/account", {
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

    function temporaryErrorMessage(text) {
        setLoadingNewCall({loading: false});

        setErrorMessage({
            visible: true,
            text: text,
        });
        setTimeout(() => {
            setErrorMessage({
                visible: false,
                text: text,
            });
        }, 2000);
    }

    function acceptNewCall() {
        setLoadingNewCall({loading: true});

        if (!languageFilter.german && !languageFilter.english) {
            temporaryErrorMessage(CallsPageTranslation.noLanguage[props.language]);
        } else {
            setTimeout(() => {

                axios.post(BACKEND_URL + "backend/calls/accept", {
                    email: props.email,
                    api_key: props.api_key,

                    filter_type_local: typeFilter.local,
                    filter_type_global: typeFilter.global,

                    filter_language_german: languageFilter.german,
                    filter_language_english: languageFilter.english,
                })
                    .then(response => {
                        if (response.data.status === "ok") {
                            setLoadingNewCall({loading: false});
                            props.handleNewAccountData(response);
                            console.log(response.data.calls);
                        } else if (response.data.status === "currently no call available") {
                            setLoadingNewCall({loading: false});
                            temporaryErrorMessage(CallsPageTranslation.noNewCalls[props.language]);
                            console.log(response.data.status);
                        } else {
                            setLoadingNewCall({loading: false});
                            console.log(response.data.status);
                        }

                    }).catch(response => {
                        setLoadingNewCall({loading: false});

                        console.log("Axios promise rejected! Response:");
                        console.log(response);

                        temporaryErrorMessage(CallsPageTranslation.serverOffline[props.language]);
                    });
            }, 1000);
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
                                    className={classes.button}>{CallsPageTranslation.acceptCall[props.language]}</Button>
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


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,

    email: state.email,
    api_key: state.api_key,

    filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);


