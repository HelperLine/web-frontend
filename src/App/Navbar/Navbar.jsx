import React, {useState} from 'react';
import {connect} from 'react-redux';
import {handleLogout, switchLanguage} from '../../ReduxActions';

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

import MenuIcon from '@material-ui/icons/Menu';

import {Breakpoint} from 'react-socks';
import Grid from "@material-ui/core/Grid";
import {CustomTextField} from "../../Components/CustomTextField";
import Dialog from "@material-ui/core/Dialog";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {NavbarTranslation} from "./NavbarTranslation";

import LanguageIcon from '@material-ui/icons/Language';




import Logo128 from './logos/Drawing_Logo_128px.png';
import Logo256 from './logos/Drawing_Logo_256px.png';
import LogoText512 from './logos/Drawing_Logo_Text_512px.png';


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

    logoIcon: {
        position: "fixed",
        left: theme.spacing(2),
        top: theme.spacing(2),

        zIndex: "1000",

        padding: 0,
        maxWidth: 192,
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

    logoutDialog: {
        boxSizing: "border-box",
        overflowX: "hidden",
    },
    logoutDialogContainer: {
        position: "relative",
        display: "block",
        scroll: "disabled",
        padding: theme.spacing(2),
        margin: -3.5,
    },
    logoutDialogButton: {
        color: "white",
    },
    logoutDialogWrapper: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        position: 'relative',
        display: "inline-flex"
    },
    logoutDialogTitle: {
        textAlign: "center",
    },

}));

function NavbarComponent(props) {
    const classes = useStyles();

    const path = window.location.pathname;
    let initialPageTitle = "";
    if (path.startsWith("/guide")) {
        initialPageTitle = NavbarTranslation.guide[props.language];
    } else if (path.startsWith("/calls")) {
        initialPageTitle = NavbarTranslation.calls[props.language];
    } else if (path.startsWith("/account")) {
        initialPageTitle = NavbarTranslation.account[props.language];
    }

    const [pageTitle, setPageTitle] = useState(initialPageTitle);
    const [logoutDialog, setLogoutDialogState] = useState({open: false});

    const [drawerIsOpen, toggleDrawer] = useState(false);

    const [languageMenuAnchor, toggleLanguageMenuAnchor] = useState(null);

    const openLanguageMenu = (event) => {
        toggleLanguageMenuAnchor(event.currentTarget);
    };
    const closeLanguageMenu = () => {
        toggleLanguageMenuAnchor(null);
    };


    const pageTitleComponent = (
        <Typography variant="h6" noWrap className={classes.title}>{pageTitle}</Typography>
    );

    const languageMenuComponent = (
        <React.Fragment>
            <IconButton onClick={openLanguageMenu}
                        className={classes.languageButton}
                        disableRipple={true}>
                <LanguageIcon
                    className={classes.languageIcon}
                    alt={NavbarTranslation.language[props.language] + " Icon"}
                    fontSize="large"/>
            </IconButton>

            <LanguageMenu anchorElement={languageMenuAnchor}
                          handleClose={closeLanguageMenu}
                          switchLanguage={props.switchLanguage}/>
        </React.Fragment>
    );

    const pageLogoComponent = (
        <Link to="/">
            <img src={Logo256}/>
        </Link>
    );

    const pageButtons = (
        <React.Fragment>
            <Link to="/guide"
                  className={classes.link}
                  onClick={() => setPageTitle(NavbarTranslation.guide[props.language])}>
                <Button size="large"
                        color={path.startsWith("/guide") ? "secondary" : "primary"}
                        startIcon={<AssignmentIcon alt={NavbarTranslation.guide[props.language] + " Icon"}/>}
                        className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.guide[props.language]}</Button>
            </Link>

            {props.loggedIn && (
                <React.Fragment>
                    <Link to="/calls"
                          className={classes.link}
                          onClick={() => setPageTitle(NavbarTranslation.calls[props.language])}>
                        <Button size="large"
                                color={path.startsWith("/calls") ? "secondary" : "primary"}
                                startIcon={<CallIcon alt={NavbarTranslation.calls[props.language] + " Icon"}/>}
                                className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.calls[props.language]}</Button>
                    </Link>
                    <Link to="/account"
                          className={classes.link}
                          onClick={() => setPageTitle(NavbarTranslation.account[props.language])}>
                        <Button size="large"
                                color={path.startsWith("/account") ? "secondary" : "primary"}
                                startIcon={<SettingsIcon alt={NavbarTranslation.account[props.language] + " Icon"}/>}
                                className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.account[props.language]}</Button>
                    </Link>
                </React.Fragment>
            )}
        </React.Fragment>
    );

    const loginButton = (
        <React.Fragment>
            {props.loggedIn && (
                <Button onClick={() => {
                    setLogoutDialogState({open: true});
                }}
                        size="large"
                        color="primary"
                        startIcon={<PersonIcon alt={NavbarTranslation.logout[props.language] + " Icon"}/>}
                        className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.logout[props.language]}</Button>
            )}
            {!props.loggedIn && (
                <Link to="/login"
                      className={classes.link}>
                    <div className={classes.wrapper}>
                        <Button size="large"
                                color="primary"
                                disabled={props.autoLogin}

                                startIcon={props.autoLogin ?
                                    <CircularProgress size={20} className={classes.CircularProgress} disabled/> :
                                    <PersonIcon alt={NavbarTranslation.login[props.language] + " Icon"}/>}
                                className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.login[props.language]}</Button>
                    </div>
                </Link>
            )}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <CssBaseline/>

            <Breakpoint small down>
                <AppBar position="fixed" className={classes.navBar}>
                    <Toolbar>
                        <IconButton edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    className={classes.menuButton}
                                    onClick={() => toggleDrawer(true)}>
                            <MenuIcon alt={NavbarTranslation.menu[props.language] + " Icon"}/>
                        </IconButton>

                        {pageTitleComponent}
                        {languageMenuComponent}

                        <IconButton edge="end"
                                    onClick={openLanguageMenu}
                                    className={classes.languageButtonMobile}
                                    disableRipple={true}>
                            <LanguageIcon
                                className={classes.languageIconMobile}
                                alt={NavbarTranslation.language[props.language] + " Icon"}/>
                        </IconButton>

                        <LanguageMenu anchorElement={languageMenuAnchor}
                                      handleClose={closeLanguageMenu}
                                      switchLanguage={props.switchLanguage}/>
                    </Toolbar>
                </AppBar>
                <Drawer open={drawerIsOpen}
                        onClose={() => toggleDrawer(false)}
                        onClick={() => toggleDrawer(false)}
                        onKeyDown={() => toggleDrawer(false)}>
                    <div role="presentation" className={classes.drawerBox}>
                        <div className={classes.drawerScrollBox}>
                            {pageButtons}
                            <Divider className={classes.divider}/>
                            {loginButton}
                        </div>
                    </div>
                </Drawer>
            </Breakpoint>

            <Breakpoint large up>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>

                    <div className={classes.drawerLogoBox}>
                        <Link to="/">
                            <img src={LogoText512} className={classes.drawerLogoIcon}/>
                        </Link>
                    </div>

                    <Divider className={classes.divider}/>
                    {pageButtons}
                    <Divider className={classes.divider}/>
                    {loginButton}

                </Drawer>

                <IconButton onClick={openLanguageMenu}
                            className={classes.languageButton}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIcon}
                        alt={NavbarTranslation.language[props.language] + " Icon"}
                        fontSize="large"/>
                </IconButton>

                <LanguageMenu anchorElement={languageMenuAnchor}
                              handleClose={closeLanguageMenu}
                              switchLanguage={props.switchLanguage}/>
            </Breakpoint>

            <Dialog onClose={() => setLogoutDialogState({open: false})}
                    aria-labelledby="logout-dialog"
                    open={logoutDialog.open}
                    className={classes.logoutDialog}
                    maxWidth="xs">

                <Grid container spacing={1} className={classes.logoutDialogContainer}>

                    <Grid item xs={12}>
                        <Typography variant="h6"
                                    className={classes.logoutDialogTitle}>{NavbarTranslation.logoutQuestion[props.language]}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={clsx("ButtonBox", classes.buttonBox)}>
                            <div className={classes.logoutDialogWrapper}>
                                <Button variant="contained"
                                        color="secondary"
                                        onClick={() => setLogoutDialogState({open: false})}
                                        className={classes.logoutDialogButton}>{NavbarTranslation.cancel[props.language]}</Button>
                            </div>
                            <div className={classes.logoutDialogWrapper}>
                                <Link to="/logout"
                                      className={classes.link}
                                      onClick={() => {
                                          props.handleLogout();
                                          setPageTitle(NavbarTranslation.guide[props.language]);
                                      }}>
                                    <Button variant="contained"
                                            color="secondary"
                                            className={classes.logoutDialogButton}>{NavbarTranslation.logout[props.language]}</Button>
                                </Link>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </Dialog>

        </React.Fragment>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    autoLogin: state.autoLogin,
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleLogout: () => dispatch(handleLogout()),
    switchLanguage: (language) => dispatch(switchLanguage(language)),
});

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);


/* Reduced Navbar (login, register, 404) ----------------------------------------- */


export const ReducedNavbarComponent = (props) => {
    const classes = useStyles();

    const [languageMenuAnchor, toggleLanguageMenuAnchor] = useState(null);

    const openLanguageMenu = (event) => {
        toggleLanguageMenuAnchor(event.currentTarget);
    };
    const closeLanguageMenu = () => {
        toggleLanguageMenuAnchor(null);
    };

    return (
        <div className="navbar">
            <CssBaseline/>

            <Link to="/">
                <img src={LogoText512} className={classes.logoIcon}/>
            </Link>

            <IconButton onClick={openLanguageMenu}
                        className={classes.languageButton}
                        disableRipple={true}>
                <LanguageIcon
                    className={classes.languageIcon}
                    alt={NavbarTranslation.language[props.language] + " Icon"}
                    fontSize="large"/>
            </IconButton>

            <LanguageMenu anchorElement={languageMenuAnchor}
                          handleClose={closeLanguageMenu}
                          switchLanguage={props.switchLanguage}/>
        </div>
    );
};

const mapStateToPropsReduced = state => ({});

const mapDispatchToPropsReduced = dispatch => ({
    switchLanguage: (language) => dispatch(switchLanguage(language)),
});

export const ReducedNavbar = connect(mapStateToPropsReduced, mapDispatchToPropsReduced)(ReducedNavbarComponent);


/* Language Menu */

const LanguageMenu = (props) => {
    return (
        <Menu
            id="simple-menu"
            anchorEl={props.anchorElement}
            keepMounted
            open={Boolean(props.anchorElement)}
            onClose={props.handleClose}>
            <MenuItem onClick={() => {
                props.switchLanguage("english");
                props.handleClose();
            }}>English</MenuItem>
            <MenuItem onClick={() => {
                props.switchLanguage("deutsch");
                props.handleClose();
            }}>Deutsch</MenuItem>
        </Menu>
    );
};

