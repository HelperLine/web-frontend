import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import clsx from "clsx";

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    callPaper: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),

        marginBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inlineText: {
        display: "inline"
    },
    phoneText: {
        marginRight: theme.spacing(3),
        fontWeight: "500",
    },
    timeText: {
        flexGrow: 1,
        fontWeight: "400",
    },
}));


export function CallComponent(props) {

    const classes = useStyles();

    function axiosPutAction(action) {
        axios.put(BACKEND_URL + "backend/database/call", {
            email: props.account.email,
            api_key: props.api_key,
            action: action,
            call_id: props.call.id,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.handleNewAccountData(response);
                    console.log(response.data.calls);
                }
            }).catch(response => {
            console.log("Axios promise rejected! Response:");
            console.log(response);
        });
    }

    return (
        <Paper elevation={3} className={classes.callPaper}>
            <Typography variant="body1" className={clsx(classes.inlineText, classes.phoneText)}>{props.call.phone_number}</Typography>
            <Typography variant="body2" className={clsx(classes.inlineText, classes.timeText)}>{props.call.timestamp}</Typography>
            {props.call.status !== "fulfilled" && (
                <React.Fragment>
                    <IconButton onClick={() => axiosPutAction("fulfill")}>
                        <CheckIcon color="primary"/>
                    </IconButton>
                    <IconButton onClick={() => axiosPutAction("decline")}>
                        <ClearIcon color="primary"/>
                    </IconButton>
                </React.Fragment>
            )}
            {props.call.status === "fulfilled" && (
                <IconButton disabled>
                    <CheckIcon style={{fill: "transparent"}}/>
                </IconButton>
            )}
        </Paper>
    );
}


const mapStateToProps = state => ({
    account: state.account,
    api_key: state.api_key,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const Call = connect(mapStateToProps, mapDispatchToProps)(CallComponent);


