import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    flexButtonBox: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        color: "white",
    },
    grayButton: {
        color: "white",
        backgroundColor: theme.palette.primary.transparent40,
    },
    textField: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
    },
    passwordTextField: {},
    wrapper: {
        margin: theme.spacing(0.5),

        position: 'relative',
        display: "inline-flex"
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    snackbar: {
        margin: theme.spacing(1)
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
    form2Container: {
        paddingTop: theme.spacing(1.5),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },

    startIcon: {
    },

    phoneDialog: {
        padding: theme.spacing(3),
        width: 600,
    },

    phoneDialogTitle: {
        marginBottom: theme.spacing(2),
        textAlign: "center",
    },

    phoneDialogText: {
        textAlign: "center",
    },

    phoneDialogCode: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textAlign: "center",

    },
    phoneDialogButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

}));

