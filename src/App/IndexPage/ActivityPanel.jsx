
import React from 'react';
import {useStyles} from "./style";
import {Breakpoint} from "react-socks";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {IndexPageTranslation} from "../../Translations/Pages/IndexPageTranslation";
import DrawingGroceries from "./images/Drawing_Groceries_600px.png";
import DrawingPostal from "./images/Drawing_Postal_600px.png";
import DrawingMedication from "./images/Drawing_Medication_600px.png";
import DrawingCoffee from "./images/Drawing_Coffee_600px.png";
import Divider from "@material-ui/core/Divider";
import DrawingMediation from "./images/Drawing_Mediation_600px.png";
import {Container} from "@material-ui/core";


const ActivityCard = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Breakpoint small down>
                <Paper elevation={2} className={clsx(classes.actionPaperMobile, classes.margin2)}>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={clsx(classes.centerBox, classes.actionImageBoxMobile)}>
                                <img alt={props.alt} src={props.src} className={classes.actionImageMobile}/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={clsx(classes.centerBox, classes.actionTextMobile)}>
                                <Typography variant="h5">{props.description}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Breakpoint>

            <Breakpoint medium up>
                <Paper elevation={2} className={clsx(classes.actionPaper, classes.margin2)}>
                    <div className={clsx(classes.centerBox, classes.actionImageBox)}>
                        <img alt={props.alt} src={props.src} className={classes.actionImage}/>
                    </div>
                    <div className={clsx(classes.centerBox, classes.actionText)}>
                        <Typography variant="h5">{props.description}</Typography>
                    </div>
                </Paper>
            </Breakpoint>
        </React.Fragment>
    );
};


export const ActivityPanel = (props) => {

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                {IndexPageTranslation.scene1[props.language]}
            </Typography>

            <ActivityCard alt="Groceries Drawing" src={DrawingGroceries} description={(
                <React.Fragment>{IndexPageTranslation.scene2[props.language]}</React.Fragment>
            )}/>

            <ActivityCard alt="Postal Drawing" src={DrawingPostal} description={(
                <React.Fragment>{IndexPageTranslation.scene3[props.language]}</React.Fragment>
            )}/>

            <ActivityCard alt="Medication Drawing" src={DrawingMedication} description={(
                <React.Fragment>{IndexPageTranslation.scene4[props.language]}</React.Fragment>
            )}/>

            <ActivityCard alt="Coffee Drawing" src={DrawingCoffee} description={(
                <React.Fragment>{IndexPageTranslation.scene5[props.language]}</React.Fragment>
            )}/>

            <Divider className={classes.divider}/>

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                {IndexPageTranslation.scene6[props.language]}
            </Typography>

            <ActivityCard alt="Mediation Drawing" src={DrawingMediation} description={
                IndexPageTranslation.scene7[props.language]
            }/>

        </Container>
    );
};
