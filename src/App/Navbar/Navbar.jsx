import React, {useState} from 'react';
import {connect} from 'react-redux';
import {handleLogout} from '../../ReduxActions';

import clsx from 'clsx';
import './Navbar.scss';

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

import AssignmentIcon from '@material-ui/icons/Assignment';
import CallIcon from '@material-ui/icons/Call';
import {CircularProgress} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
        backgroundColor: theme.palette.gunmetalGray.main,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    HeaderIconButton: {
        margin: 0,
        padding: 0,
        backgroundColor: "transparent !important",
        overflow: "visible",
        borderRadius: "0",
    },
    HeaderIcon: {
        backgroundColor: "transparent !important",
        height: theme.spacing(4),
        margin: "-6px",
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
}));

function NavbarComponent(props) {
    const classes = useStyles();

    const path = window.location.pathname;
    let initialPageTitle = "";
    if (path.startsWith("/guide")) {
        initialPageTitle = "Guide";
    } else if (path.startsWith("/calls")) {
        initialPageTitle = "Calls";
    } else if (path.startsWith("/account")) {
        initialPageTitle = "Account";
    }

    const [pageTitle, setPageTitle] = useState(initialPageTitle);

    return (
        <div className="navbar">
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>{pageTitle}</Typography>

                    <Link edge="end"
                          to="/guide"
                          onClick={() => setPageTitle("Guide")}>
                        <IconButton aria-label="index"
                                    className={classes.HeaderIconButton}
                                    disableRipple={true}>
                            <CallIcon alt="Phone Icon" style={{fill: "white"}} fontSize="large"/>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}/>
                <Link to="/guide"
                      className={classes.link}
                      onClick={() => setPageTitle("Guide")}>
                    <Button size="large"
                            color={path.startsWith("/guide") ? "secondary" : "primary"}
                            startIcon={<AssignmentIcon alt="Guide Icon"/>}
                            className={clsx(classes.button, classes.topButton)}>Guide</Button>
                </Link>

                {props.loggedIn && (
                    <React.Fragment>
                        <Link to="/calls"
                              className={classes.link}
                              onClick={() => setPageTitle("Calls")}>
                            <Button size="large"
                                    color={path.startsWith("/calls") ? "secondary" : "primary"}
                                    startIcon={<CallIcon alt="Phone Icon"/>}
                                    className={clsx(classes.button, classes.topButton)}>Calls</Button>
                        </Link>
                        <Link to="/account"
                              className={classes.link}
                              onClick={() => setPageTitle("Account")}>
                            <Button size="large"
                                    color={path.startsWith("/account") ? "secondary" : "primary"}
                                    startIcon={<SettingsIcon alt="Account Icon"/>}
                                    className={clsx(classes.button, classes.topButton)}>Account</Button>
                        </Link>
                    </React.Fragment>
                )}

                <Divider className={classes.divider}/>

                {props.loggedIn && (
                    <Link to="/logout"
                          className={classes.link}
                          onClick={() => {
                              props.handleLogout();
                              setPageTitle("Guide");
                          }}>
                        <Button size="large"
                                color="primary"
                                startIcon={<PersonIcon alt="Logout Icon"/>}
                                className={clsx(classes.button, classes.topButton)}>Logout</Button>
                    </Link>
                )}
                {!props.loggedIn && (
                    <Link to="/login"
                          className={classes.link}>
                        <div className={classes.wrapper}>
                            <Button size="large"
                                    color="primary"
                                    disabled={props.autoLogin}

                                    startIcon={props.autoLogin ?
                                        <CircularProgress size={20} className={classes.CircularProgress} color="disabled"/> :
                                        <PersonIcon alt="Login Icon"/>}
                                    className={clsx(classes.button, classes.topButton)}>Login</Button>
                        </div>
                    </Link>
                )}
            </Drawer>
        </div>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    autoLogin: state.autoLogin,
});

const mapDispatchToProps = dispatch => ({
    handleLogout: () => dispatch(handleLogout())
});

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);


/* Reduced Navbar (login, register, 404) ----------------------------------------- */


export const ReducedNavbar = (props) => {
    const classes = useStyles();

    return (
        <div className="navbar">
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}></Typography>
                    <Link to="/guide"
                          edge="end">
                        <IconButton disableRipple={true} className={classes.HeaderIconButton}>
                            <CallIcon alt="Phone Icon" style={{fill: "white"}} fontSize="large"/>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

