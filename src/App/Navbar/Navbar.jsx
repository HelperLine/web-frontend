import React, {useState} from 'react';
import {connect} from 'react-redux';
import {handleLogout, switchLanguage, closeMessage} from '../../ReduxActions';

import clsx from 'clsx';
import './Navbar.scss';

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
import Dialog from "@material-ui/core/Dialog";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {NavbarTranslation} from "./NavbarTranslation";

import LanguageIcon from '@material-ui/icons/Language';


import LogoText512 from './logos/Drawing_Logo_Text_512px.png';


import {useStyles} from "./style";


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
        props.closeMessage();
        toggleLanguageMenuAnchor(event.currentTarget);
    };
    const closeLanguageMenu = () => {
        props.closeMessage();
        toggleLanguageMenuAnchor(null);
    };


    const pageTitleComponent = (
        <Typography variant="h6" noWrap className={classes.title}>{pageTitle}</Typography>
    );

    const languageMenuComponent = (
        <React.Fragment>
            <Breakpoint small down>
                <IconButton edge="end"
                            onClick={openLanguageMenu}
                            className={classes.languageButtonMobile}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIconMobile}
                        alt={NavbarTranslation.language[props.language] + " Icon"}/>
                </IconButton>
            </Breakpoint>
            <Breakpoint medium up>
                <IconButton onClick={openLanguageMenu}
                            className={classes.languageButton}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIcon}
                        alt={NavbarTranslation.language[props.language] + " Icon"}
                        fontSize="large"/>
                </IconButton>
            </Breakpoint>

            <LanguageMenu anchorElement={languageMenuAnchor}
                          handleClose={closeLanguageMenu}
                          switchLanguage={props.switchLanguage}/>

        </React.Fragment>
    );

    const pageButtons = (
        <React.Fragment>
            <Link to="/guide"
                  className={classes.link}
                  onClick={() => {
                      props.closeMessage();
                      setPageTitle(NavbarTranslation.guide[props.language]);
                  }}>
                <Button size="large"
                        color={path.startsWith("/guide") ? "secondary" : "primary"}
                        startIcon={<AssignmentIcon alt={NavbarTranslation.guide[props.language] + " Icon"}/>}
                        className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.guide[props.language]}</Button>
            </Link>

            {props.loggedIn && (
                <React.Fragment>
                    <Link to="/calls"
                          className={classes.link}
                          onClick={() => {
                              props.closeMessage();
                              setPageTitle(NavbarTranslation.calls[props.language]);
                          }}>
                        <Button size="large"
                                color={path.startsWith("/calls") ? "secondary" : "primary"}
                                startIcon={<CallIcon alt={NavbarTranslation.calls[props.language] + " Icon"}/>}
                                className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.calls[props.language]}</Button>
                    </Link>
                    <Link to="/account"
                          className={classes.link}
                          onClick={() => {
                              props.closeMessage();
                              setPageTitle(NavbarTranslation.account[props.language]);
                          }}>
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
                    props.closeMessage();
                    setLogoutDialogState({open: true});
                }}
                        size="large"
                        color="primary"
                        startIcon={<PersonIcon alt={NavbarTranslation.logout[props.language] + " Icon"}/>}
                        className={clsx(classes.button, classes.topButton)}>{NavbarTranslation.logout[props.language]}</Button>
            )}
            {!props.loggedIn && (
                <Link to="/login"
                      onClick={props.closeMessage}
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
                        <Link to="/" onClick={props.closeMessage}>
                            <img alt="HelperLine Logo" src={LogoText512} className={classes.drawerLogoIcon}/>
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
                    maxWidth="xs" fullWidth>

                <div className={classes.logoutDialogWrapper}>

                    <Typography variant="h6"
                                className={classes.logoutDialogTitle}>{NavbarTranslation.logoutQuestion[props.language]}</Typography>

                    <div className="ButtonBox">
                        <div className={classes.logoutDialogButtonWrapper}>
                            <Button variant="contained"
                                    color="secondary"
                                    onClick={() => setLogoutDialogState({open: false})}
                                    className={classes.logoutDialogButton}>{NavbarTranslation.cancel[props.language]}</Button>
                        </div>
                        <div className={classes.logoutDialogButtonWrapper}>
                            <Link to="/logout"
                                  className={classes.link}
                                  onClick={() => {
                                      props.closeMessage();
                                      props.handleLogout();
                                      setPageTitle(NavbarTranslation.guide[props.language]);
                                  }}>
                                <Button variant="contained"
                                        color="secondary"
                                        className={classes.logoutDialogButton}>{NavbarTranslation.logout[props.language]}</Button>
                            </Link>
                        </div>
                    </div>
                </div>
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
    closeMessage: () => dispatch(closeMessage()),
});

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);


/* Reduced Navbar (login, register, 404) ----------------------------------------- */


export const ReducedNavbarComponent = (props) => {
    const classes = useStyles();

    const [languageMenuAnchor, toggleLanguageMenuAnchor] = useState(null);

    const openLanguageMenu = (event) => {
        props.closeMessage();
        toggleLanguageMenuAnchor(event.currentTarget);
    };
    const closeLanguageMenu = () => {
        props.closeMessage();
        toggleLanguageMenuAnchor(null);
    };

    return (
        <div className="navbar">
            <CssBaseline/>

            <Breakpoint small down>
                <Link to="/" onClick={props.closeMessage}>
                    <img src={LogoText512} alt="Logo" className={classes.logoIconMobileReduced}/>
                </Link>

                <IconButton onClick={openLanguageMenu}
                            className={classes.languageButtonMobileReduced}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIconMobileReduced}
                        alt={NavbarTranslation.language[props.language] + " Icon"}
                        fontSize="large"/>
                </IconButton>
            </Breakpoint>

            <Breakpoint medium up>
                <Link to="/" onClick={props.closeMessage}>
                    <img src={LogoText512} alt="Logo" className={classes.logoIcon}/>
                </Link>

                <IconButton onClick={openLanguageMenu}
                            className={classes.languageButton}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIcon}
                        alt={NavbarTranslation.language[props.language] + " Icon"}
                        fontSize="large"/>
                </IconButton>
            </Breakpoint>

            <LanguageMenu anchorElement={languageMenuAnchor}
                          handleClose={closeLanguageMenu}
                          switchLanguage={props.switchLanguage}/>
        </div>
    );
};

const mapStateToPropsReduced = state => ({});

const mapDispatchToPropsReduced = dispatch => ({
    switchLanguage: (language) => dispatch(switchLanguage(language)),
    closeMessage: () => dispatch(closeMessage()),
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

