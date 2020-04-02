import React from 'react';

import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CommunityDrawing from './images/Drawing_Performance_Community_800px.png';
import SelfDrawing from './images/Drawing_Performance_Self_800px.png';


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
    performanceImageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
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


export function Performance(props) {

    const classes = useStyles();

    const performance = {
        area: {
            volunteers: 11,
            callers: 6,
            calls: 31
        },
        account: {
            registered: "21.03.20",
            calls: 7,
            avgCalls: 3,
        }
    };

    const PerformanceRow = (props) => (
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.performanceRow}>{props.text}:&nbsp;
                <span className={classes.performanceNumber}><strong>{props.value}</strong></span>
            </Typography>
        </Grid>
    );

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} className={classes.performanceImageContainer}>
                            <img src={CommunityDrawing} alt="Community Performance"
                                 className={classes.performanceImage}/>
                        </Grid>
                        <PerformanceRow text="Volunteers in your area" value={performance.area.volunteers}/>
                        <PerformanceRow text="Callers in your area" value={performance.area.callers}/>
                        <PerformanceRow text="Fulfilled calls" value={performance.area.calls}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} className={classes.performanceImageContainer}>
                            <img src={SelfDrawing} alt="Your Performance" className={classes.performanceImage}/>
                        </Grid>
                        <PerformanceRow text="Registered since" value={performance.account.registered}/>
                        <PerformanceRow text="Fulfilled calls" value={performance.account.calls}/>
                        <PerformanceRow text="Avg. calls per week" value={performance.account.avgCalls}/>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
