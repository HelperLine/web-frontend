import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

import {connect} from 'react-redux';

import {Container} from "@material-ui/core";
import {Typography} from "@material-ui/core";

import Divider from "@material-ui/core/Divider";

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


import {Call} from "./Call";


import './CallsPage.scss';

import {CallsPageTranslation} from "./CallsPageTranslation";
import {Performance} from "./Performance";
import {Filter} from "./Filter";



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
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    placeholder: {
        marginLeft: theme.spacing(1),
    },
}));

export function CallsPageComponent(props) {

    const classes = useStyles();

    return (
        <Container maxWidth="md" className="CallsPage">

            <Performance/>

            <Divider className={classes.divider}/>

            <Filter/>

            <Divider className={classes.divider}/>

            <Typography variant="h6" className={classes.subheading}>
                {CallsPageTranslation.acceptedCalls[props.language]}
            </Typography>

            {props.calls.accepted.map((call, index) => (
                <Call key={index} call={call}/>
            ))}
            {props.calls.accepted.length === 0 && (
                <Typography variant="subtitle1" className={classes.placeholder}>
                    <em>{CallsPageTranslation.noAcceptedCalls[props.language]}</em>
                </Typography>
            )}

            <div className={classes.divider}/>

            <Typography variant="h6" className={classes.subheading}>
                {CallsPageTranslation.fulfilledCalls[props.language]}
            </Typography>

            {props.calls.fulfilled.map((call, index) => (
                <Call key={index} call={call}/>
            ))}
            {props.calls.fulfilled.length === 0 && (
                <Typography variant="subtitle1" className={classes.placeholder}>
                    <em>{CallsPageTranslation.noFulfilledCalls[props.language]}</em>
                </Typography>
            )}

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
    language: state.language,
    calls: state.calls,
});

const mapDispatchToProps = () => ({
});

export const CallsPage = connect(mapStateToProps, mapDispatchToProps)(CallsPageComponent);

