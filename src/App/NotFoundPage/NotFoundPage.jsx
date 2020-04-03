import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import Drawing_404 from './images/Drawing_404.svg';
import {NotFoundPageTranslation} from "./NotFoundPageTranslation";
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";
import {IndexPageComponent} from "../IndexPage/IndexPage";


const useStyles = makeStyles(theme => ({
    centerBox: {
        width: "100vw",
        height: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    image: {
        width: 600,
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
    supportLink: {
        color: theme.palette.secondary.transparent60,
        textDecoration: "none",
    },
    supportText: {
        textAlign: "center",
        color: theme.palette.primary.transparent60,
    },
    backLink: {
        color: theme.palette.primary.main,
    },
}));

export const NotFoundPageComponent = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.centerBox}>
            <img src={Drawing_404} alt={"Not Found Image"} className={clsx(classes.image, classes.margin6)}/>

            <Typography variant="h6" className={clsx(classes.margin3)}>
                <a className={classes.backLink} href="/"><strong>
                    {NotFoundPageTranslation.backText[props.language]}
                </strong></a>
            </Typography>

            <Typography variant="h6" className={clsx(classes.supportText)}>
                {NotFoundPageTranslation.supportText[props.language]}
                <a className={classes.supportLink} href="mailto:support@helperline.io">
                <strong>support@helperline.io</strong></a>
            </Typography>
        </div>
    );
};


const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = () => ({
});

export const NotFoundPage = connect(mapStateToProps, mapDispatchToProps)(NotFoundPageComponent);


