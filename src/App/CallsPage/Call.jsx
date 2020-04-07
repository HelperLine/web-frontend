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


import CloudOffIcon from '@material-ui/icons/CloudOff';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
    centerLeftBox: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    expandIcon: {
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
    }
}));


export function CallComponent(props) {

    const classes = useStyles();

    let [commentTextField, setCommentTextField] = useState(props.call.comment);
    let commentRef = React.createRef();

    let [commentState, setCommentState] = useState("saved");

    // Used for "fulfill call", "reject call", "modify call comment"
    function axiosPutAction(action, comment) {

        if (action === "comment") {
            setCommentState("saving");
        }

        axios.put(BACKEND_URL + "backend/database/call", {
            email: props.email,
            api_key: props.api_key,
            call_id: props.call.call_id,

            action: action,
            comment: comment,
        })
            .then(response => {
                if (action === "comment") {
                    setTimeout(() => {
                        setCommentState("saved")
                    }, 1000);
                }

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

    console.log(props.call);

    let commentIcon;

    switch (commentState) {
        case "unsaved":
            commentIcon = <CloudOffIcon className={classes.commentStateIcon} fontSize="small"/>;
            break;
        case "saving":
            commentIcon = <CircularProgress className={clsx(classes.commentStateIcon, classes.commentSavingIcon)} size={16}/>;
            break;
        default:
            commentIcon = <CloudDoneIcon className={classes.commentStateIcon} fontSize="small"/>;
            break;
    }


    return (

        <ExpansionPanel elevation={2}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}>
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
                <div className={classes.callDetailsBox}>
                    <CustomTextField
                        label="Comments"
                        multiline={true}
                        fullWidth={true}
                        rows="4"
                        rowsMax="12"
                        variant="outlined"
                        ref={commentRef}

                        onChange={handleChange}
                        value={commentTextField}

                        onBlur={pushCommentValue}
                        onEscape={onEscape}/>
                    {commentIcon}
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


