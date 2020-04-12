import React from 'react';
import {useStyles} from "./style";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import MongoDBLogo from './sponsors/MongoDBLogo_800px.png';
import GCPLogo from './sponsors/GCPLogo_800px.png';
import TwilioLogo from './sponsors/TwilioLogo_800px.png';

import clsx from "clsx";

export const SponsorPanel = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.colorPanel1}>
            <Container maxWidth="md">
                <Grid container justify="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5" className={clsx(classes.centerText)}>
                            Proudly Sponsored By:
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <a href="https://mongodb.com/" target="_blank" rel="noopener noreferrer">
                            <img className={classes.sponsorImage} src={MongoDBLogo} alt="MongoDB Logo"/>
                        </a>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <a href="https://cloud.google.com/gcp/" target="_blank" rel="noopener noreferrer">
                            <img className={classes.sponsorImage} src={GCPLogo} alt="GCP Logo"/>
                        </a>
                    </Grid>
                    <Grid item xs={8} md={4}>
                        <a href="https://www.twilio.com/" target="_blank" rel="noopener noreferrer">
                            <img className={classes.sponsorImage} src={TwilioLogo} alt="Twilio Logo"/>
                        </a>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
