import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {connect} from 'react-redux';
import {closeMessage} from '../ReduxActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const useStyles = makeStyles(theme => ({
    snackbar: {
        margin: theme.spacing(1),
    },
    snackbarContent: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
    snackbarIcon: {
        fill: "white",
    },
}));


function MessageSnackbarComponent(props) {
    const classes = useStyles();

    return (
        <Snackbar className={classes.snackbar}
                  open={props.open}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <SnackbarContent
                className={classes.snackbarContent}
                aria-describedby="message-id"
                message={<span id="message-id">{props.text}</span>}
                action={(
                    <IconButton onClick={props.closeMessage}>
                        <CloseIcon className={classes.snackbarIcon}/>
                    </IconButton>
                )}
            />
        </Snackbar>
    );
}


/* Redux link -------------------------------------------------------------------- */


const mapStateToProps = state => ({
    open: state.message.open,
    text: state.message.text,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    closeMessage: () => dispatch(closeMessage()),
});

export const MessageSnackbar = connect(mapStateToProps, mapDispatchToProps)(MessageSnackbarComponent);

