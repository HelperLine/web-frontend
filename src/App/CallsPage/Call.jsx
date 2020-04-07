import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";


import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import clsx from "clsx";


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    centerLeftBox: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
}));


export function CallComponent(props) {

    const classes = useStyles();

    let [commentTextField, setCommentTextField] = useState({value: props.call.comment});
    let commentRef = React.createRef();

    // Used for "fulfill call", "reject call", "modify call comment"
    function axiosPutAction(action, comment) {
        axios.put(BACKEND_URL + "backend/database/call", {
            email: props.email,
            api_key: props.api_key,
            call_id: props.call.call_id,

            action: action,
            comment: comment,
        })
            .then(response => {
                if (response.data.status === "ok") {
                    props.handleNewAccountData(response);
                    console.log(response.data.calls);
                } else {
                    console.log(response.data);
                }
            }).catch(response => {
                console.log("Axios promise rejected! Response:");
                console.log(response);
            });
    }

    function pushCommentValue() {
        axiosPutAction("comment", commentTextField.value);
    }

    function onEscape() {
        commentRef.current.blur();
    }

    console.log(props.call);

    return (

        <ExpansionPanel elevation={2}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={2}>
                    <Grid item xs={4} className={classes.centerLeftBox}>
                        <Typography variant="h6">{props.call.phone_number}</Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.centerLeftBox}>
                        <Typography variant="subtitle1">Received: <strong>{props.call.timestamp_received}</strong></Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.centerLeftBox}>
                        <Typography variant="subtitle1">Accepted: <strong>{props.call.timestamp_accepted}</strong></Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <CustomTextField
                    label="Comments"
                    multiline={true}
                    fullWidth={true}
                    rows="4"
                    rowsMax="12"
                    variant="outlined"
                    ref={commentRef}

                    onChange={(value) => setCommentTextField({value: value})}
                    value={commentTextField.value}

                    onBlur={pushCommentValue}
                    onEscape={onEscape}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}


const mapStateToProps = state => ({
    email: state.email,
    api_key: state.api_key,

    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const Call = connect(mapStateToProps, mapDispatchToProps)(CallComponent);


