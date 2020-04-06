
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    pageStart: {
        marginTop: 100,
    },
    centerText: {
        display: "block",
        textAlign: "center",
    },
    nameReferenceText: {
        color: theme.palette.primary.transparent40,
    },
    margin1: {
        marginBottom: theme.spacing(1),
    },
    margin2: {
        marginBottom: theme.spacing(2),
    },
    margin3: {
        marginBottom: theme.spacing(3),
    },
    margin4: {
        marginBottom: theme.spacing(4),
    },
    margin5: {
        marginBottom: theme.spacing(5),
    },
    margin6: {
        marginBottom: theme.spacing(6),
    },
    divider: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    pinkLink: {
        color: theme.palette.secondary.main,
        textDecoration: "none",
    },
    paper: {
        backgroundColor: "transparent",
    },
    reducedLoginButton: {
        position: "fixed",
        top: theme.spacing(2),
        right: theme.spacing(10),
        color: "white",
        backgroundColor: theme.palette.primary.transparent40,
    },
    reducedLoginButtonMobile: {
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(8),
        color: "white",
        backgroundColor: theme.palette.primary.transparent40,
    },
    withBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column"
    },
    padding2: {
        padding: theme.spacing(2),
    },
    centerBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    cardImage: {
        maxWidth: "80%",

    },
    centerBoxTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    actionPaper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "row",
        height: theme.spacing(30),
    },
    actionImageBox: {
        height: "100%",
        width: "40%",
    },
    actionImage: {
        maxHeight: "100%",
    },
    actionText: {
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    actionPaperMobile: {
        padding: theme.spacing(2)
    },
    actionImageBoxMobile: {
        height: 200,
        marginBottom: theme.spacing(2)
    },
    actionImageMobile: {
        maxHeight: "100%",
    },
    actionTextMobile: {
        textAlign: "center",
    },
    connectImageBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: theme.spacing(40),
    },
    connectImageBoxMobile: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
    },
    connectImage: {
        maxHeight: "100%",
    },
    collaborateDetails: {
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "column",
    },
    collaborateCheckboxLine: {
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
        flexDirection: "row",
    },
    colorPanel1: {
        marginTop: theme.spacing(6),
        paddingTop: theme.spacing(6),

        paddingBottom: theme.spacing(6),

        backgroundColor: theme.palette.primary.transparent10,
        width: "100vw",
    },
    colorPanel2: {
        paddingTop: theme.spacing(6),

        paddingBottom: 100,

        backgroundColor: theme.palette.primary.transparent20,
        width: "100vw",
    },

    colorPanel2Mobile: {
        paddingTop: theme.spacing(6),

        paddingBottom: 20,

        backgroundColor: theme.palette.primary.transparent20,
        width: "100vw",
    },
}));
