import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Button, Container} from "@material-ui/core";
import clsx from "clsx";

import './IndexPage.scss';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

import {IndexPageTranslation} from "../../Translations/Pages/IndexPageTranslation";
import {WordTranslations} from "../../Translations/Standard/WordTranslations";

import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

import HowToRegIcon from '@material-ui/icons/HowToReg';

import {CollabPanel} from "./CollabPanel";


import {Breakpoint} from "react-socks";


import {useStyles} from './style';
import {PitchPanel} from "./PitchPanel";
import {ActivityPanel} from "./ActivityPanel";




export const IndexPageComponent = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">
            <Container maxWidth="md">

                <Typography variant="h3" className={clsx(classes.centerText, classes.margin6, classes.pageStart)}>
                    {IndexPageTranslation.title1[props.language]}
                </Typography>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin1, classes.nameReferenceText)}>
                    <em>{IndexPageTranslation.title2[props.language]}</em>
                </Typography>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin1)}>
                    {IndexPageTranslation.title3[props.language]}
                </Typography>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    <strong><a href="tel:+49-30-2555-5305" className={classes.pinkLink}>
                        {IndexPageTranslation.title4[props.language]}
                    </a></strong>
                </Typography>

                <Divider className={classes.divider}/>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    <strong>{IndexPageTranslation.title5[props.language]}</strong>
                </Typography>

                <Grid container justify="center" spacing={2}>
                    <Grid item className={classes.centerBoxTop}>
                        <Link to="/register">
                            <Button color="secondary" variant="contained"
                                    startIcon={<HowToRegIcon className={classes.buttonStartIcon}/>}>{WordTranslations.register[props.language]}</Button>
                        </Link>
                    </Grid>
                </Grid>

                <Link to="/login">
                    <Breakpoint small down>
                        <Button className={classes.reducedLoginButtonMobile} disableElevation variant="contained">
                            {WordTranslations.login[props.language]}
                        </Button>
                    </Breakpoint>
                    <Breakpoint medium up>
                        <Button className={classes.reducedLoginButton} disableElevation variant="contained">
                            {WordTranslations.login[props.language]}
                        </Button>
                    </Breakpoint>
                </Link>

                <Divider className={classes.divider}/>

                <PitchPanel language={props.language}/>

            </Container>

            <div className={classes.colorPanel1}>

                <ActivityPanel language={props.language}/>

            </div>

            <Breakpoint small down>
                <div className={classes.colorPanel2Mobile}>
                    <CollabPanel language={props.language}/>
                </div>
            </Breakpoint>
            <Breakpoint medium up>
                <div className={classes.colorPanel2}>
                    <CollabPanel language={props.language}/>
                </div>
            </Breakpoint>

        </div>
    );
};

const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const IndexPage = connect(mapStateToProps, mapDispatchToProps)(IndexPageComponent);

