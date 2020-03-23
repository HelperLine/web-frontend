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
        marginBottom: theme.spacing(3),
    },
    description: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(3),
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
                <Typography variant="body1" className={classes.description}>
                    <em>Showcase coming soon!</em>
                </Typography>

                <Typography variant="body1" className={classes.links}>
                    Webapp Frontend Repository on <a target="_blank" href="https://github.com/dostuffthatmatters/callcenter-frontend">GitHub</a>
                    <br/>
                    Webapp Backend Repository on <a target="_blank" href="https://github.com/dostuffthatmatters/callcenter-backend">GitHub</a>
                    <br/>
                    Telegram Bot Repository: <em>sharing soon</em>
                    <br/>
                    Hub Backend Repository: <em>sharing soon</em>
                </Typography>
            </Container>

            <div className="ButtonBox">
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

        </div>
    );
};
