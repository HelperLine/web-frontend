import React, {useState, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {handleNewAccountData} from '../../ReduxActions';

import {Container} from "@material-ui/core";
import {Typography} from "@material-ui/core";

import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

import {CustomTextField} from "../../Components/CustomTextField";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import {BACKEND_URL} from "../../secrets";

import {Call} from "./Call";

import axios from 'axios';


import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import AddIcon from '@material-ui/icons/Add';

import './CallsPage.scss';

import {CallsPageTranslation} from "./CallsPageTranslation";
import {Performance} from "./Performance";
import {Filter} from "./Filter";

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
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    subheading: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    placeholder: {
        marginLeft: theme.spacing(0.5),
    },
}));

class CallsPageWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingNewCall: false,
            loadingGoOnline: false,
            errorMessageVisible: false,
            errorMessageText: "",
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.axiosPutAction = this.axiosPutAction.bind(this);

        this.acceptNewCall = this.acceptNewCall.bind(this);
    }

    componentDidMount() {

        axios.get(BACKEND_URL + "backend/database/call", {
            email: this.props.account.email,
            api_key: this.props.api_key,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    this.props.handleNewAccountData(response);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Response:");
            console.log(response);
        });
    }

    axiosPutAction(action) {
        axios.put(BACKEND_URL + "backend/database/call", {
            email: this.props.account.email,
            api_key: this.props.api_key,
            action: action,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    this.props.handleNewCallData(response);
                    console.log(response.data.calls);
                } else if (response.data.status === "no new calls") {
                    this.setState({
                        errorMessageVisible: true,
                        errorMessageText: CallsPageTranslation.noNewCalls[this.props.language],
                    });
                    setTimeout(() => {
                        this.setState({
                            errorMessageVisible: false,
                        })
                    }, 2500);
                }

            }).catch(response => {
                console.log("Axios promise rejected! Response:");
                console.log(response);
                this.setState({
                    errorMessageVisible: true,
                    errorMessageText: CallsPageTranslation.serverOffline[this.props.language],
                });
                setTimeout(() => {
                    this.setState({
                        errorMessageVisible: false,
                    })
                }, 2500);
            });
    }

    acceptNewCall() {
        this.setState({loadingNewCall: true});
        setTimeout(() => {
            this.axiosPutAction("accept");
            this.setState({loadingNewCall: false});
        }, 1000);
    }

    render() {
        return (
            <CallsPageComponent language={this.props.language}
                                calls={this.props.calls}

                                account={this.props.account}
                                acceptNewCall={this.acceptNewCall}
                                loadingNewCall={this.state.loadingNewCall}

                                goOnline={this.goOnline}
                                goOffline={this.goOffline}
                                loadingGoOnline={this.state.loadingGoOnline}

                                errorMessageVisible={this.state.errorMessageVisible}
                                errorMessageText={this.state.errorMessageText}/>
        );
    }

}

export function CallsPageComponent(props) {

    const classes = useStyles();

    return (
        <Container maxWidth="md" className="CallsPage">

            <Performance/>

            <Divider className={classes.divider}/>

            <Filter/>

            <Grid container spacing={2} className={classes.formContainer}>

                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>

                <Typography variant="h6" className={classes.subheading}>{CallsPageTranslation.acceptedCalls[props.language]}</Typography>

                <Grid item xs={12}>
                    {props.calls.accepted.map((call, index) => (
                        <Call key={index} call={call}/>
                    ))}
                    {props.calls.accepted.length === 0 && (
                        <Typography variant="body1" className={classes.placeholder}>{CallsPageTranslation.noAcceptedCalls[props.language]}</Typography>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>

                <Typography variant="h6" className={classes.subheading}>{CallsPageTranslation.fulfilledCalls[props.language]}</Typography>

                <Grid item xs={12}>
                    {props.calls.fulfilled.map((call, index) => (
                        <Call key={index} call={call}/>
                    ))}
                    {props.calls.fulfilled.length === 0 && (
                        <Typography variant="body1" className={classes.placeholder}>{CallsPageTranslation.noFulfilledCalls[props.language]}</Typography>
                    )}
                </Grid>

            </Grid>

            <Snackbar className={classes.snackbar}
                      open={props.errorMessageVisible}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <SnackbarContent
                    className={classes.snackbarContentError}
                    aria-describedby="message-id"
                    message={<span id="message-id">{props.errorMessageText}</span>}
                />
            </Snackbar>

        </Container>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    calls: state.calls,
    account: state.account,
    api_key: state.api_key,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleNewCallData: (response) => dispatch(handleNewAccountData(response)),
});

export const CallsPage = connect(mapStateToProps, mapDispatchToProps)(CallsPageWrapper);

