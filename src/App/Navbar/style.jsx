import {makeStyles} from "@material-ui/core/styles";


const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    navBar: {
        backgroundColor: theme.palette.primary.main,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },

    languageButton: {
        position: "fixed",
        right: theme.spacing(2),
        top: theme.spacing(2),

        zIndex: "1000",

        padding: 0,
    },
    languageIcon: {
        fill: theme.palette.primary.transparent40,
    },

    languageButtonMobile: {
        marginRight: theme.spacing(0),
        padding: 0,
    },
    languageIconMobile: {
        fill: "white",
    },

    languageButtonMobileReduced: {
        position: "absolute",
        right: theme.spacing(2),
        top: theme.spacing(2.125),

        zIndex: "1000",

        padding: 0,
    },
    languageIconMobileReduced: {
        fill: theme.palette.primary.transparent40,
    },

    logoIcon: {
        position: "fixed",
        left: theme.spacing(2),
        top: theme.spacing(2),

        zIndex: "1000",

        padding: 0,
        maxWidth: 192,
    },

    logoIconMobileReduced: {
        position: "absolute",
        left: theme.spacing(2),
        top: theme.spacing(2),

        zIndex: "1000",

        padding: 0,
        maxWidth: 128,
    },


    button: {
        margin: theme.spacing(1),
        marginBottom: 0,
        padding: theme.spacing(1),
        width: "225px",
        alignItems: "flex-start",
        justifyContent: "left",
        textTransform: "capitalize",
        transitionDelay: 0,
        transitionDuration: 0
    },
    topButton: {
        marginTop: theme.spacing(1)
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    wrapper: {
        position: 'relative',
    },
    CircularProgress: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 4,
    },
    drawerBox: {
        height: "100vh",
        position: "relative",
    },
    drawerScrollBox: {
        paddingBottom: theme.spacing(10),
    },
    drawerLogoBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    drawerLogoIcon: {
        maxWidth: 192,
    },

    logoutDialogWrapper: {
        padding: theme.spacing(2),
    },
    logoutDialogTitle: {
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },

    logoutDialogButtonWrapper: {
        margin: theme.spacing(0.5),
        position: 'relative',
    }

}));
