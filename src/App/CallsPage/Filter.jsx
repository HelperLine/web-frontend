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

import {handleNewAccountData, openMessage, closeMessage, setFilter, setForward} from "../../ReduxActions";
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

    let [formFilter, setFormFilter] = useState(props.filter);

    function toggleFilter(filterType, category) {

        props.closeMessage();
        let newFilterProposal;

        if (filterType === "call_type") {
            let newCallType;

            if (category === "only_local") {
                newCallType = {
                    only_local: !formFilter.call_type.only_local,
                    only_global: false,
                }
            } else {
                newCallType = {
                    only_local: false,
                    only_global: !formFilter.call_type.only_global,
                }
            }

            newFilterProposal = {
                call_type: newCallType,
                language: formFilter.language
            }
        } else {
            let newLanguage;

            if (category === "english") {
                newLanguage = {
                    english: !formFilter.language.english,
                    german: formFilter.language.german,
                }
            } else {
                newLanguage = {
                    english: formFilter.language.english,
                    german: !formFilter.language.german,
                }
            }

            newFilterProposal = {
                call_type: formFilter.call_type,
                language: newLanguage
            }
        }

        pushFilterChange(newFilterProposal);
        setFormFilter(newFilterProposal);
    }


    let [loadingNewCall, setLoadingNewCall] = useState(false);

    let [switchingOnline, setSwitchingOnline] = useState(false);


    function goOnline() {
        if (!props.account.phone_number_verified) {
            props.openMessage("phone number not verified");
        } else {

            let forwardProposal = {
                online: true,
                schedule_active: false,
                stay_online_after_call: false,
                schedule: []
            }

            props.closeMessage();
            setSwitchingOnline(true);

            axios.put(BACKEND_URL + "settings/forward", {
                email: props.email,
                api_key: props.api_key,
                forward: forwardProposal,
                filter: formFilter

            }).then(() => {
                setTimeout(() => {
                    setSwitchingOnline(false);
                    setForward(forwardProposal);
                }, 500);

            }).catch(() => {
                setSwitchingOnline(false);
                props.openMessage("");
            })
        }
    }


    function goOffline() {
        let forwardProposal = {
            online: false,
            schedule_active: false,
            stay_online_after_call: false,
            schedule: []
        }

        props.closeMessage();
        setSwitchingOnline(true);

        axios.put(BACKEND_URL + "settings/forward", {
            email: props.email,
            api_key: props.api_key,
            forward: forwardProposal

        }).then(() => {
            setTimeout(() => {
                setSwitchingOnline(false);
                setForward(forwardProposal);
            }, 500);

        }).catch(() => {
            setSwitchingOnline(false);
            props.openMessage("");
        })
    }


    function pushFilterChange(newFilterProposal) {

        props.closeMessage();

        axios.put(BACKEND_URL + "settings/filter", {
            email: props.email,
            api_key: props.api_key,
            filter: newFilterProposal

        }).then(() => {
            setTimeout(() => {
                console.log("Filters successfully changed");
                setFilter(newFilterProposal);
            }, 500);

        }).catch(() => {
            console.log("Filters could not be changed");
        })
    }

    function acceptNewCall() {

        if (!props.account.email_verified) {
            props.openMessage("email not verified");
        } else if (!formFilter.language.german && !formFilter.language.english) {
            props.openMessage("no language selected");
        } else {
            props.closeMessage();
            setLoadingNewCall(true);
            setTimeout(() => {

                axios.post(BACKEND_URL + "/database/call", {
                    email: props.email,
                    api_key: props.api_key,
                    filter: formFilter
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
                            <Checkbox checked={formFilter.call_type.only_local}
                                      onChange={() => toggleFilter("call_type", "only_local")}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter2[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={formFilter.call_type.only_global}
                                      onChange={() => toggleFilter("call_type", "only_global")}/>
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
                            <Checkbox checked={formFilter.language.german}
                                      onChange={() => toggleFilter("language", "german")}/>
                            <Typography variant="subtitle1">
                                {CallsPageTranslation.filter5[props.language]}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.checkListRow}>
                            <Checkbox checked={formFilter.language.english}
                                      onChange={() => toggleFilter("language", "english")}/>
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
                                    color={props.forward.online ? "secondary" : ""}
                                    onClick={props.forward.online ? goOffline : goOnline}
                                    startIcon={switchingOnline ?
                                        <CircularProgress size={20} className={classes.buttonIcon} color="secondary"/> :
                                        (props.forward.online ?
                                                <CloudDoneIcon className={classes.buttonIcon}/> :
                                                <CloudOffIcon className={classes.buttonIcon}/>
                                        )
                                    }
                                    className={clsx(classes.button, (!props.forward.online ? classes.grayButton : ""))}>
                                {props.forward.online ?
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
    filter: state.filter,
    forward: state.forward,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
    openMessage: (text) => dispatch(openMessage(text)),
    closeMessage: () => dispatch(closeMessage()),

    setFilter: (filter) => dispatch(setFilter(filter)),
    setForward: (forward) => dispatch(setForward(forward)),
});

export const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);







