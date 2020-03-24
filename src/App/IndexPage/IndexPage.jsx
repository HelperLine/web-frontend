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

const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(1),
    },
    title2: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    videoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(6),
    },
    description: {
        display: "block",
        textAlign: "center",
    },
    description1: {
        marginBottom: theme.spacing(2),
    },
    description2: {
        marginBottom: theme.spacing(2),
    },
    description3: {
        marginBottom: theme.spacing(2),
    },
    buttonBox: {
        marginBottom: theme.spacing(0),
    },
    divider1: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    description4: {
        marginBottom: theme.spacing(3),
    },
    description5: {
        marginBottom: theme.spacing(0),
    },
    description6: {
        marginBottom: theme.spacing(5),
    },
    links: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(3),
        lineHeight: theme.spacing(0.3),
    },
    link: {
        textDecoration: "none",
        display: "block"
    },
    button: {
        color: "white",
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        position: 'relative',
    }
}));

export const IndexPage = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">
            <Typography variant="h4" className={classes.title}>Hilfe am Ohr!</Typography>
            <Typography variant="h6" className={classes.title2}>Eine Hotline für Menschen ohne Internetzugang</Typography>

            <Container maxWidth="sm">
                <div className={clsx(classes.videoContainer, "VideoContainer")}>
                    <iframe src="https://www.youtube.com/embed/veRkcaPmV4g?rel=0" frameBorder="0"
                            allowFullScreen="allowfullscreen"/>
                </div>

                <Typography variant="h5" className={clsx(classes.description, classes.description1)}>
                    Call now: <strong>+49 (0) 30 2555 5305</strong>
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description2)}>
                    <em>Showcase coming soon!</em>
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description3)}>
                    See all Repositories on <a rel="noopener noreferrer" target="_blank" href="https://github.com/Hilfe-am-Ohr">GitHub</a>
                </Typography>
            </Container>

            <div className={clsx("ButtonBox", classes.buttonBox)}>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}>
                    <Link to={"/guide"} className={classes.link}>Read our Guide</Link>
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}>
                    <Link to={"/register"} className={classes.link}>Register</Link>
                </Button>
            </div>

            <Container maxWidth="sm">

                <Divider className={classes.divider1}/>

                <Typography variant="h5" className={clsx(classes.description, classes.description4)}>
                    How can you support us?
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description5)}>
                    1. Like our pitch - you saw above - on&nbsp;
                    <a href="https://www.youtube.com/watch?v=veRkcaPmV4g"
                       rel="noopener noreferrer"
                       target="_blank"><strong>YouTube</strong></a>

                    <br/><br/>

                    2. Like our project on&nbsp;
                    <a href="https://devpost.com/software/hilfehotline-finde-einfach-helfende"
                       rel="noopener noreferrer"
                       target="_blank"><strong>DevPost</strong></a>

                    <br/><br/>

                    3. Take part in <strong>our survey</strong> by calling the hotline <em>(~ 1 minute)</em>
                </Typography>

                <Divider className={classes.divider1}/>

                <Typography variant="body1" className={clsx(classes.description, classes.description2)}>
                    <em>Job postings coming soon!</em>
                </Typography>

            </Container>

        </div>
    );
};
