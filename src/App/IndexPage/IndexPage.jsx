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
import Paper from "@material-ui/core/Paper";


import DrawingCaller from './images/Drawing_Target_Caller_800px.png';
import DrawingHelper from './images/Drawing_Target_Helper_800px.png';

import DrawingGroceries from './images/Drawing_Groceries_600px.png';
import DrawingPostal from './images/Drawing_Postal_600px.png';
import DrawingMedication from './images/Drawing_Medication_600px.png';
import DrawingCoffee from './images/Drawing_Coffee_600px.png';

import DrawingMediation from './images/Drawing_Mediation_600px.png';
import DrawingCollab from './images/Drawing_Collab_1200px.png';

import HowToRegIcon from '@material-ui/icons/HowToReg';

import {CollaborateChecklists} from "./CollaborateChecklists";


import {Breakpoint} from "react-socks";


import {useStyles} from './style';


const FlyingCards = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" spacing={2} className={classes.margin2}>
            <Grid item xs={8} md={4}>
                <Paper elevation={0} className={clsx(classes.paper, "LeftTranslateCard")}>
                    <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                        <strong>{IndexPageTranslation.pitch2[props.language]}</strong>
                    </Typography>
                    <div className={classes.centerBox}>
                        <img alt="Caller Drawing" src={DrawingCaller} className={classes.cardImage}/>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={1} className={classes.withBox}>
                <Breakpoint small down>
                    <Typography variant="h5" className={clsx(classes.centerText)}>
                        {IndexPageTranslation.pitch3[props.language]}
                    </Typography>
                </Breakpoint>
                <Breakpoint medium up>
                    <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                        {IndexPageTranslation.pitch3[props.language]}
                    </Typography>
                </Breakpoint>
            </Grid>
            <Grid item xs={8} md={4}>
                <Paper elevation={0} className={clsx(classes.paper, "RightTranslateCard")}>
                    <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                        <strong>{IndexPageTranslation.pitch4[props.language]}</strong>
                    </Typography>
                    <div className={classes.centerBox}>
                        <img alt="Helper Drawing" src={DrawingHelper} className={classes.cardImage}/>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

const ActivityCard = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Breakpoint small down>
                <Paper elevation={2} className={clsx(classes.actionPaperMobile, classes.margin2)}>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={clsx(classes.centerBox, classes.actionImageBoxMobile)}>
                                <img alt={props.alt} src={props.src} className={classes.actionImageMobile}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={clsx(classes.centerBox, classes.actionTextMobile)}>
                                <Typography variant="h5">{props.description}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Breakpoint>

            <Breakpoint medium up>
                <Paper elevation={2} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img alt={props.alt} src={props.src} className={classes.actionImage}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">{props.description}</Typography>
                    </div>
                </Paper>
            </Breakpoint>
        </React.Fragment>
    );
};


const CollabPanel = (props) => {

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                <strong>{IndexPageTranslation.collab1[props.language]}</strong>
            </Typography>

            <Breakpoint small down>
                <div className={clsx(classes.centerBox, classes.connectImageBoxMobile, classes.margin5)}>
                    <img alt="Collaborate Drawing" src={DrawingCollab} className={classes.connectImage}/>
                </div>
            </Breakpoint>
            <Breakpoint medium up>
                <div className={clsx(classes.centerBox, classes.connectImageBox, classes.margin5)}>
                    <img alt="Collaborate Drawing" src={DrawingCollab} className={classes.connectImage}/>
                </div>
            </Breakpoint>

            <CollaborateChecklists language={props.language}/>

        </Container>
    );
};

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

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    {IndexPageTranslation.pitch1[props.language]}
                </Typography>

                <FlyingCards language={props.language}/>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    {IndexPageTranslation.pitch5[props.language]}
                </Typography>

            </Container>

            <div className={classes.colorPanel1}>

                <Container maxWidth="md">

                    <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                        {IndexPageTranslation.scene1[props.language]}
                    </Typography>

                    <ActivityCard alt="Groceries Drawing" src={DrawingGroceries} description={(
                        <React.Fragment>{IndexPageTranslation.scene2[props.language]}</React.Fragment>
                    )}/>

                    <ActivityCard alt="Postal Drawing" src={DrawingPostal} description={(
                        <React.Fragment>{IndexPageTranslation.scene3[props.language]}</React.Fragment>
                    )}/>

                    <ActivityCard alt="Medication Drawing" src={DrawingMedication} description={(
                        <React.Fragment>{IndexPageTranslation.scene4[props.language]}</React.Fragment>
                    )}/>

                    <ActivityCard alt="Coffee Drawing" src={DrawingCoffee} description={(
                        <React.Fragment>{IndexPageTranslation.scene5[props.language]}</React.Fragment>
                    )}/>

                    <Divider className={classes.divider}/>

                    <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                        {IndexPageTranslation.scene6[props.language]}
                    </Typography>

                    <ActivityCard alt="Mediation Drawing" src={DrawingMediation} description={
                        IndexPageTranslation.scene7[props.language]
                    }/>

                </Container>
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

