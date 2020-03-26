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

export const IndexPageComponent = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">
            <Typography variant="h4" className={classes.title}>Hilfe am Ohr!</Typography>
            <Typography variant="h6" className={classes.title2}>{IndexPageTranslation.indexSubtitle[props.language]}</Typography>

            <Container maxWidth="sm">
                <div className={clsx(classes.videoContainer, "VideoContainer")}>
                    <iframe src="https://www.youtube.com/embed/veRkcaPmV4g?rel=0" frameBorder="0"
                            allowFullScreen="allowfullscreen"/>
                </div>

                <Typography variant="h5" className={clsx(classes.description, classes.description1)}>
                    {IndexPageTranslation.text1[props.language]}
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description2)}>
                    {IndexPageTranslation.text2[props.language]}
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description3)}>
                    {IndexPageTranslation.text3[props.language]}
                </Typography>
            </Container>

            <div className={clsx("ButtonBox", classes.buttonBox)}>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}>
                    <Link to={"/guide"} className={classes.link}>{IndexPageTranslation.readOurGuide[props.language]}</Link>
                </Button>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}>
                    <Link to={"/register"} className={classes.link}>{IndexPageTranslation.register[props.language]}</Link>
                </Button>
            </div>

            <Container maxWidth="sm">

                <Divider className={classes.divider1}/>

                <Typography variant="h5" className={clsx(classes.description, classes.description4)}>
                    {IndexPageTranslation.text4[props.language]}
                </Typography>

                <Typography variant="body1" className={clsx(classes.description, classes.description5)}>
                    {IndexPageTranslation.text5[props.language]}
                </Typography>

                <Divider className={classes.divider1}/>

                <Typography variant="body1" className={clsx(classes.description, classes.description2)}>
                    {IndexPageTranslation.text6[props.language]}
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

