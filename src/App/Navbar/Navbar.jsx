import React, {useState} from 'react';
import {connect} from 'react-redux';
import {switchLanguage, closeMessage} from '../../ReduxActions';

import './Navbar.scss';

import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import {Breakpoint} from 'react-socks';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {WordTranslations} from "../../Translations/Standard/WordTranslations";

import LanguageIcon from '@material-ui/icons/Language';


import LogoText512 from './logos/Drawing_Logo_Text_512px.png';


import {useStyles} from "./style";


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

            <Breakpoint small down>
                <Link to="/" onClick={props.closeMessage}>
                    <img src={LogoText512} alt="Logo" className={classes.logoIconMobileReduced}/>
                </Link>

                <IconButton onClick={openLanguageMenu}
                            className={classes.languageButtonMobileReduced}
                            disableRipple={true}>
                    <LanguageIcon
                        className={classes.languageIconMobileReduced}
                        alt={WordTranslations.language[props.language] + " Icon"}
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
                        alt={WordTranslations.language[props.language] + " Icon"}
                        fontSize="large"/>
                </IconButton>
            </Breakpoint>

            <LanguageMenu anchorElement={languageMenuAnchor}
                          handleClose={closeLanguageMenu}
                          switchLanguage={props.switchLanguage}/>
        </div>
    );
};

const mapStateToPropsReduced = () => ({});

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

