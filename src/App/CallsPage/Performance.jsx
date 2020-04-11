import React from 'react';
import {connect} from 'react-redux';

import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CommunityDrawing from './images/Drawing_Performance_Community_800px.png';

import {CallsPageTranslation} from "../../Translations/Pages/CallsPageTranslation";

import {Breakpoint} from "react-socks";


const useStyles = makeStyles(theme => ({
    title: {
        width: "100%",
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    performancePaper: {
        padding: theme.spacing(2),
    },
    margin4: {
        marginBottom: theme.spacing(4),
    },
    performanceImageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        marginBottom: theme.spacing(2),
    },
    performanceImageContainerMobile: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        marginBottom: theme.spacing(2),
    },
    performanceImage: {
        maxHeight: "100%",
    },
    performanceRow: {
        textAlign: "center",
    },
    performanceNumber: {
        color: theme.palette.secondary.main,
    },
}));


function PerformanceComponent(props) {

    const classes = useStyles();

    const PerformanceRow = (props) => (
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.performanceRow}>{props.text}:&nbsp;
                <span className={classes.performanceNumber}><strong>{props.value}</strong></span>
            </Typography>
        </Grid>
    );

    return (
        <React.Fragment>
            <Breakpoint small down>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} md={6} className={classes.margin4}>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12} className={classes.performanceImageContainerMobile}>
                                <img src={CommunityDrawing} alt={CallsPageTranslation.performanceAlt1[props.language]}
                                     className={classes.performanceImage}/>
                            </Grid>
                            <PerformanceRow text={CallsPageTranslation.performanceKey1[props.language]}
                                            value={props.performance.area.volunteers}/>
                            <PerformanceRow text={CallsPageTranslation.performanceKey2[props.language]}
                                            value={props.performance.area.callers}/>
                            <PerformanceRow text={CallsPageTranslation.performanceKey3[props.language]}
                                            value={props.performance.area.calls}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Breakpoint>
            <Breakpoint medium up>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12} className={classes.performanceImageContainer}>
                                <img src={CommunityDrawing} alt={CallsPageTranslation.performanceAlt1[props.language]}
                                     className={classes.performanceImage}/>
                            </Grid>
                            <PerformanceRow text={CallsPageTranslation.performanceKey1[props.language]}
                                            value={props.performance.area.volunteers}/>
                            <PerformanceRow text={CallsPageTranslation.performanceKey2[props.language]}
                                            value={props.performance.area.callers}/>
                            <PerformanceRow text={CallsPageTranslation.performanceKey3[props.language]}
                                            value={props.performance.area.calls}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Breakpoint>
        </React.Fragment>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,

    performance: state.performance,
});

const mapDispatchToProps = dispatch => ({});

export const Performance = connect(mapStateToProps, mapDispatchToProps)(PerformanceComponent);


