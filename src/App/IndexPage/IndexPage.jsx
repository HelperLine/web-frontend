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

import PersonIcon from '@material-ui/icons/Person';
import TuneIcon from '@material-ui/icons/Tune';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
    centerText: {
        display: "block",
        textAlign: "center",
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
    }

}));

export const IndexPageComponent = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">
            <Container maxWidth="md">

                <Typography variant="h3" className={clsx(classes.centerText, classes.margin1)}>
                    Hilfe am Ohr!
                </Typography>
                <Typography variant="h5" className={clsx(classes.centerText)}>
                    A <strong>hotline</strong> for people without internet. <strong>
                    <a href="tel:+49-30-2555-5305" className={classes.pinkLink}>Call +49 30 2555 5305</a></strong>
                </Typography>

                <Divider className={classes.divider}/>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    Due to Covid-19 we are <strong>matching</strong> ...
                </Typography>

                <Grid container justify="center" spacing={2} className={classes.margin2}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <div className={classes.centerBox}>
                                <img src={DrawingCaller} className={classes.cardImage}/>
                            </div>

                            <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                                People in Need
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.centerBox}>
                        <div className={classes.centerBox}>
                            <img src={DrawingServer} className={classes.cardImage} style={{maxWidth: "30%"}}/>
                        </div>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                            ... with ...
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <div className={classes.centerBox}>
                                <img src={DrawingHelper} className={classes.cardImage}/>
                            </div>

                            <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                                Digital Volunteers
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    ... because most of the <strong>people in need of assist do not use the internet!</strong>
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
                        <Button color="secondary" variant="contained" startIcon={<PersonIcon className={classes.buttonStartIcon}/>}>Sign Up</Button>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.centerBox}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                            2. Set Call Filters
                        </Typography>
                        <Button color="secondary" variant="contained" startIcon={<TuneIcon className={classes.buttonStartIcon}/>}>
                            Filter
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.centerBox}>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                            3. Start Helping
                        </Typography>
                        <Button color="secondary" variant="contained" startIcon={<AddIcon className={classes.buttonStartIcon}/>}>Accept Call</Button>
                    </Grid>
                </Grid>

                <Divider className={classes.divider}/>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                    "Hello sir, how may I help you?"
                </Typography>

                <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img src={DrawingGroceries} className={classes.actionImage}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">
                            "Can you help me with <br/> buying groceries?"
                        </Typography>
                    </div>
                </Paper>

                <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img src={DrawingPostal} className={classes.actionImage}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">
                            "... going to the post office?"
                        </Typography>
                    </div>
                </Paper>

                <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img src={DrawingMedication} className={classes.actionImage}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">
                            "... picking up medication?"
                        </Typography>
                    </div>
                </Paper>

                <Paper elevation={3} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img src={DrawingCoffee} className={classes.actionImage} style={{maxHeight: "85%"}}/>
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
                        <img src={DrawingMediation} className={classes.actionImage} style={{maxHeight: "85%"}}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">
                            You can help them find one <br/> in <strong>tons of online forums!</strong>
                        </Typography>
                    </div>
                </Paper>

            </Container>
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

