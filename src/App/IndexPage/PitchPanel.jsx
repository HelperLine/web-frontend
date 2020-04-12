import React from 'react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {IndexPageTranslation} from "../../Translations/Pages/IndexPageTranslation";
import {useStyles} from "./style";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DrawingCaller from "./images/Drawing_Target_Caller_800px.png";
import {Breakpoint} from "react-socks";
import DrawingHelper from "./images/Drawing_Target_Helper_800px.png";
import Container from "@material-ui/core/Container";


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


export const PitchPanel = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.marginTop6}>
            <Container maxWidth="md">
                <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                    {IndexPageTranslation.pitch1[props.language]}
                </Typography>

                <FlyingCards language={props.language}/>

                <Typography variant="h5" className={clsx(classes.centerText)}>
                    {IndexPageTranslation.pitch5[props.language]}
                </Typography>
            </Container>
        </div>
    );
};
