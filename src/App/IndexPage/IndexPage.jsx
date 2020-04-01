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
                <Typography variant="h5" className={clsx(classes.centerText, classes.margin6)}>
                    A hotline for people without internet. <strong>
                    <a href="tel:+49-30-2555-5305" className={classes.pinkLink}>Call +49 30 2555 5305</a></strong>
                </Typography>

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    Due to Covid-19 we are <strong>matching</strong> ...
                </Typography>

                <Grid container justify="center" spacing={2} className={classes.margin2}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            <div className={classes.centerBox}>
                                <img src={DrawingCaller} className={classes.cardImage}/>
                            </div>

                            <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                                People in Need
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} className={classes.centerBox}>
                        <div className={classes.centerBox}>
                            <img src={DrawingServer} className={classes.cardImage} style={{maxWidth: "30%"}}/>
                        </div>
                        <Typography variant="h5" className={clsx(classes.centerText, classes.padding2)}>
                            ... with ...
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
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

                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    ... because most of the <strong>people in need of assist do not use the internet!</strong>
                </Typography>

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

