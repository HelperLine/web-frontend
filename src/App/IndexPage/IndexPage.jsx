import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, CircularProgress, Container} from "@material-ui/core";
import clsx from "clsx";

import './IndexPage.scss';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

import {IndexPageTranslation} from "./IndexPageTranslation";
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


import DrawingCaller from './images/Drawing_Target_Caller_800px.png';
import DrawingServer from './images/Drawing_Server_600px.png';
import DrawingHelper from './images/Drawing_Target_Helper_800px.png';

import DrawingGroceries from './images/Drawing_Groceries_600px.png';
import DrawingPostal from './images/Drawing_Postal_600px.png';
import DrawingMedication from './images/Drawing_Medication_600px.png';
import DrawingCoffee from './images/Drawing_Coffee_600px.png';

import DrawingMediation from './images/Drawing_Mediation_600px.png';
import DrawingCollab from './images/Drawing_Collab_1200px.png';

import PersonIcon from '@material-ui/icons/Person';
import TuneIcon from '@material-ui/icons/Tune';
import AddIcon from '@material-ui/icons/Add';

import {CollaborateChecklists} from "./CollaborateChecklists";


import {animateScroll as scroll} from 'react-scroll'



const useStyles = makeStyles(theme => ({
    pageStart: {
        marginTop: 100,
    },
    centerText: {
        display: "block",
        textAlign: "center",
    },
    nameReferenceText: {
        color: theme.palette.primary.transparent20,
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
        maxWidth: "100%",

    },
    centerBoxTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    buttonStartIcon: {
        marginLeft: -8,
        marginRight: -4,
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
    connectImageBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: theme.spacing(40),
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
}));

export const IndexPageComponent = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">
            <Container maxWidth="md">

                <Typography variant="h3" className={clsx(classes.centerText, classes.margin1, classes.pageStart)}>
                    HelperLine
                </Typography>
                <Typography variant="h5" className={clsx(classes.centerText,classes.margin3, classes.nameReferenceText)}>
                    <em>(formerly known as "Hilfe am Ohr")</em>
                </Typography>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    A <strong>hotline</strong> for people without internet. <strong>
                    <a href="tel:+49-30-2555-5305" className={classes.pinkLink}>Call +49 30 2555 5305</a></strong>
                </Typography>

                <Divider className={classes.divider}/>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    Due to Covid-19 we <br/>are <strong>matching</strong> ...
                </Typography>

                <Grid container justify="center" spacing={2} className={classes.margin2}>
                    <Grid item xs={12} md={5}>
                        <Paper elevation={0} className={clsx(classes.paper, "LeftTranslateCard")}>
                            <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                                ... People in Need ...
                            </Typography>
                            <div className={classes.centerBox}>
                                <img alt="Caller Drawing" src={DrawingCaller} className={classes.cardImage}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={2} className={classes.withBox}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                            ... with ...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper elevation={0} className={clsx(classes.paper, "RightTranslateCard")}>
                            <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                                ... Digital Volunteers ...
                            </Typography>
                            <div className={classes.centerBox}>
                                <img alt="Helper Drawing" src={DrawingHelper} className={classes.cardImage}/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    ... because most of the <strong>people in need of assist do <u>not</u> use the internet!</strong>
                </Typography>

                <Divider className={classes.divider}/>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                    How to <strong>start helping now?</strong>
                </Typography>

                <Grid container justify="center" spacing={2} className={classes.margin2}>
                    <Grid item xs={12} md={4} className={classes.centerBoxTop}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                            1. Sign up
                        </Typography>
                        <Link to="/register">
                            <Button color="secondary" variant="contained"
                                    startIcon={<PersonIcon className={classes.buttonStartIcon}/>}>Sign Up</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.centerBox}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                            2. Set Call Filters
                        </Typography>
                        <Link to="/calls">
                            <Button color="secondary" variant="contained"
                                    startIcon={<TuneIcon className={classes.buttonStartIcon}/>}>
                                Filter
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.centerBox}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                            3. Start Helping
                        </Typography>
                        <Link to="/calls">
                            <Button color="secondary" variant="contained"
                                    startIcon={<AddIcon className={classes.buttonStartIcon}/>}>Accept Call</Button>
                        </Link>
                    </Grid>
                </Grid>

            </Container>

            <div className={classes.colorPanel1}>

                <Container maxWidth="md">

                    <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                        "Hello sir, how may I help you?"
                    </Typography>

                    <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                        <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                            <img alt="Groceries Drawing" src={DrawingGroceries} className={classes.actionImage}/>
                        </div>
                        <div className={clsx(classes.centerBox, classes.actionText)}>
                            <Typography variant="h5">
                                "Can you help me with <br/> buying groceries?"
                            </Typography>
                        </div>
                    </Paper>

                    <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                        <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                            <img alt="Postal Drawing" src={DrawingPostal} className={classes.actionImage}/>
                        </div>
                        <div className={clsx(classes.centerBox, classes.actionText)}>
                            <Typography variant="h5">
                                "... going to the post office?"
                            </Typography>
                        </div>
                    </Paper>

                    <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                        <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                            <img alt="Medication Drawing" src={DrawingMedication} className={classes.actionImage}/>
                        </div>
                        <div className={clsx(classes.centerBox, classes.actionText)}>
                            <Typography variant="h5">
                                "... picking up medication?"
                            </Typography>
                        </div>
                    </Paper>

                    <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                        <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                            <img alt="Coffee Drawing" src={DrawingCoffee} className={classes.actionImage}
                                 style={{maxHeight: "85%"}}/>
                        </div>
                        <div className={clsx(classes.centerBox, classes.actionText)}>
                            <Typography variant="h5">
                                "... getting over the day <br/> with a coffee break?"
                            </Typography>
                        </div>
                    </Paper>

                    <Divider className={classes.divider}/>

                    <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                        However, sometimes <strong>there might not be a volunteer in that area!</strong>
                    </Typography>

                    <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                        <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                            <img alt="Mediation Drawing" src={DrawingMediation} className={classes.actionImage}
                                 style={{maxHeight: "85%"}}/>
                        </div>
                        <div className={clsx(classes.centerBox, classes.actionText)}>
                            <Typography variant="h5">
                                You can help them find one <br/> in <strong>tons of online forums!</strong>
                            </Typography>
                        </div>
                    </Paper>

                </Container>
            </div>

            <div className={classes.colorPanel2}>
                <Container maxWidth="md">

                    <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                        <strong>Collaborate and connect!</strong>
                    </Typography>

                    <div className={clsx(classes.centerBox, classes.connectImageBox, classes.margin5)}>
                        <img alt="Collaborate Drawing" src={DrawingCollab} className={classes.connectImage}/>
                    </div>

                    <CollaborateChecklists/>

                </Container>
            </div>

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

