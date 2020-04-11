import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";


import Typography from "@material-ui/core/Typography";
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import axios from "axios";
import {BACKEND_URL} from "../../secrets";
import clsx from "clsx";


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";


import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    centerLeftBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    timestampBox: {
        marginTop: 4
    },
    expandIconAccepted: {
        fill: "black",
    },
    expandIconFulfilled: {
        fill: theme.palette.primary.transparent40,
    },

    callDetailsBox: {
        position: "relative",
        width: "100%",
    },
    commentStateIcon: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        fill: theme.palette.primary.transparent40,
    },
    commentSavingIcon: {
        margin: 3,
        color: theme.palette.primary.transparent40,
    },

    button: {
        color: "white",
        margin: theme.spacing(0.5),
    },
    wrapper: {
        position: 'relative',
        marginTop: theme.spacing(1),

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        backgroundColor: theme.palette.primary.transparent40,
    },
    fulfilledText: {
        color: theme.palette.primary.transparent40,
    }
}));


export function CallComponent(props) {

    const classes = useStyles();

    let [commentTextField, setCommentTextField] = useState(props.call.comment);
    let commentRef = React.createRef();

    let [commentState, setCommentState] = useState("saved");


    let [rejectCallActive, setRejectCallActive] = useState(false);
    let [fulfillCallActive, setFulfillCallActive] = useState(false);

    // Used for "fulfill call", "reject call", "modify call comment"
    function axiosPutAction(action, comment) {

        if (action === "comment") {
            setCommentState("saving");
        }

        if (action === "reject") {
            setRejectCallActive(true);
        }

        if (action === "fulfill") {
            setFulfillCallActive(true);
        }

        axios.put(BACKEND_URL + "database/call", {
            email: props.email,
            api_key: props.api_key,
            call_id: props.call.call_id,

            action: action,
            comment: comment,
        })
            .then(response => {
                setTimeout(() => {
                    setCommentState("saved");
                    setRejectCallActive(false);
                    setFulfillCallActive(false);
                }, 500);

                if (response.data.status === "ok") {
                    props.handleNewAccountData(response);
                } else {
                    console.log(response.data);
                }
            }).catch(response => {
                setTimeout(() => {
                    setCommentState("saved");
                    setRejectCallActive(false);
                    setFulfillCallActive(false);
                }, 500);

                console.log("Axios promise rejected! Response:");
                console.log(response);
            });
    }

    function pushCommentValue() {
        axiosPutAction("comment", commentTextField);
    }

    function onEscape() {
        commentRef.current.blur();
    }

    function handleChange(newValue) {
        if (props.call.comment === newValue) {
            setCommentState("saved");
        } else {
            setCommentState("unsaved");
        }
        setCommentTextField(newValue)
    }

    function rejectCall() {
        axiosPutAction("reject", "");
    }

    function fulfillCall() {
        axiosPutAction("fulfill", "");
    }

    let commentStateIcon;

    switch (commentState) {
        case "unsaved":
            commentStateIcon = <CloudOffIcon className={classes.commentStateIcon} fontSize="small"/>;
            break;
        case "saving":
            commentStateIcon =
                <CircularProgress className={clsx(classes.commentStateIcon, classes.commentSavingIcon)} size={16}/>;
            break;
        default:
            commentStateIcon = <CloudDoneIcon className={classes.commentStateIcon} fontSize="small"/>;
            break;
    }

    return (

        <ExpansionPanel elevation={2}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon
                className={(props.call.status === "accepted") ? classes.expandIconAccepted : classes.expandIconFulfilled}/>}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={12} lg={4} className={classes.centerLeftBox}>
                        <Typography
                            variant="h6"
                            className={(props.call.status === "fulfilled") ? classes.fulfilledText : ""}>
                            {props.call.phone_number}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={clsx(classes.centerLeftBox, classes.timestampBox)}>
                        <Typography
                            variant="subtitle1"
                            className={(props.call.status === "fulfilled") ? classes.fulfilledText : ""}>
                            Received: <strong>{props.call.timestamp_received}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} className={clsx(classes.centerLeftBox, classes.timestampBox)}>
                        <Typography
                            variant="subtitle1"
                            className={(props.call.status === "fulfilled") ? classes.fulfilledText : ""}>
                            Accepted: <strong>{props.call.timestamp_accepted}</strong>
                        </Typography>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={classes.callDetailsBox}>
                    <CustomTextField
                        label="Comments"
                        multiline={true}
                        fullWidth={true}
                        rows="4"
                        rowsMax="12"
                        variant="outlined"
                        ref={commentRef}

                        className={(props.call.status === "fulfilled") ? classes.fulfilledText : ""}

                        onChange={handleChange}
                        value={commentTextField}

                        onBlur={pushCommentValue}
                        onEscape={onEscape}/>
                    {commentStateIcon}

                    {(props.call.status === "accepted") && (
                        <div className="ButtonBox">
                            <div className={classes.wrapper}>
                                <Button variant="contained" disableElevation
                                        disabled={rejectCallActive || fulfillCallActive}
                                        onClick={rejectCall}
                                        startIcon={rejectCallActive ?
                                            <CircularProgress size={20} color="secondary"/> :
                                            <ClearIcon/>
                                        }
                                        className={clsx(classes.button, classes.disabledButton)}>
                                    Reject
                                </Button>
                                <Button variant="contained" disableElevation
                                        disabled={rejectCallActive || fulfillCallActive}
                                        onClick={fulfillCall}
                                        color="secondary"
                                        startIcon={fulfillCallActive ?
                                            <CircularProgress size={20} color="secondary"/> :
                                            <CheckIcon/>
                                        }
                                        className={classes.button}>
                                    Done
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
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


