import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {connect} from 'react-redux';
import {closeMessage} from '../ReduxActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {MessageTranslations} from "../Translations/Standard/MessageTranslations";

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

    function getFullText(key) {
        console.log("Error message: '" + props.text + "'");
        return MessageTranslations[key][props.language]
    }

    let text = "";

    switch (props.text) {

        // PROGRAMMING ERRORS (Client/Server)
        case "api_version invalid":
            // invalid api version called
            text = getFullText("serverError");
            break;
        case "server error: helper record not found after successful authentication":
            // error in "accept_call()" or "RESTCall.put()"
            text = getFullText("serverError");
            break;
        case "invalid function call - only_local = only_global = True":
            // dequeue cannot be called with both only_local and only_global set to true
            text = getFullText("serverError");
            break;
        case "email sending failed":
            // Sendgrid returned an error when sending the verification email
            text = getFullText("serverError");
            break;
        case "invalid email/helper_id":
            // Invalid fetch ("fetching.get_all_helper_data")
            text = getFullText("serverError");
            break;


        // PARAMETERS MISSING (Client Side Programming Error)
        case "filter parameters missing":
            // invalid call of "/forward/online" or "/call/accept"
            text = getFullText("serverError");
            break;
        case "action missing":
            // invalid call of "RESTCall.put()"
            text = getFullText("serverError");
            break;
        case "action invalid":
            // invalid call of "RESTCall.put()"
            text = getFullText("serverError");
            break;
        case "comment missing":
            // invalid call of "RESTCall.put()"
            text = getFullText("serverError");
            break;
        case "email/password/api_key missing":
            // Invalid request to "/backend/<api_version>/login/<account_type>"
            text = getFullText("serverError");
            break;
        case "email/api_key missing":
            // Invalid API access
            text = getFullText("serverError");
            break;
        case "helper_id invalid":
            text = getFullText("serverError");
            break;
        case "call_id missing":
            text = getFullText("serverError");
            break;


        // AUTHENTICATION
        case "email/password invalid":
            // manual login not successful
            text = getFullText("emailPasswordInvalid");
            break;
        case "email/api_key invalid":
            // Automatic login or API access not successful
            text = getFullText("authenticationError");
            break;


        // REGULAR ACTION ERRORS (Client/Server)
        case "no language selected":
            text = getFullText("noLanguageSelected");
            break;
        case "email not verified":
            text = getFullText("emailNotValid");
            break;
        case "currently no call available":
            text = getFullText("noCallAvailable");
            break;
        case "phone number not verified":
            text = getFullText("phoneNumberNotValid");
            break;


        // REGULAR FORM ERRORS (Client/Server)
        case "field empty":
            // Email/Password/Zip Code/Country form field empty
            text = getFullText("fieldEmpty");
            break;
        case "email format invalid":
            text = getFullText("emailFormatInvalid");
            break;
        case "password confirmation mismatch":
            text = getFullText("passwordConfirmationMismatch");
            break;
        case "password format invalid":
            text = getFullText("passwordFormatInvalid");
            break;
        case "zip_code format invalid":
            text = getFullText("zipCodeFormatInvalid");
            break;
        case "country format invalid":
            text = getFullText("countryFormatInvalid");
            break;
        case "email already taken":
            // Register/Account form
            text = getFullText("emailTaken");
            break;
        case "old_password invalid":
            text = getFullText("oldPasswordInvalid");
            break;
        case "email already verified":
            text = getFullText("emailAlreadyVerified");
            break;

        case "success":
            text = getFullText("sucessMessage");
            setTimeout(() => {
                props.closeMessage();
            }, 1250);
            break;
        case "are you sure":
            text = getFullText("areYouSure");
            break;

        default:
            text = getFullText("defaultError");
            break;
    }

    return (
        <Snackbar className={classes.snackbar}
                  open={props.open}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <SnackbarContent
                className={classes.snackbarContent}
                aria-describedby="message-id"
                message={<span id="message-id">{text}</span>}
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

