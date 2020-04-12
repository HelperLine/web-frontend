import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import './Footer.scss';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import Container from "@material-ui/core/Container";

import Button from '@material-ui/core/Button';
import CopyrightIcon from '@material-ui/icons/Copyright';
import GitHubIcon from '@material-ui/icons/GitHub';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
    footer: {
        maxWidth: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        backgroundColor: theme.palette.primary.transparent30,
    },
    brightCard: {
        textAlign: "center",
        padding: theme.spacing(1),
        color: "white",
        backgroundColor: theme.palette.primary.transparent30,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    link: {
        textDecoration: "none",
        display: "block",
        color: "white",
        fontWeight: "500",
    },
    gridItem: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        color: "white",
        textTransform: "capitalize",
    },
    startIcon: {
        marginLeft: 8,
        marginRight: 4,
    },
}));

export const Footer = () => {

    const classes = useStyles();

    return (
        <div className={clsx(classes.footer, "Footer")}>
            <Container maxWidth="md">
                <Grid container justify="center" spacing={2}>

                    <Grid item xs={12} md className={classes.gridItem}>
                        <a href="https://github.com/dostuffthatmatters"
                           rel="noopener noreferrer"
                           target="_blank">
                            <Button
                                className={classes.button}
                                size="large"
                                startIcon={<CopyrightIcon className={classes.startIcon}/>}>
                                        Moritz Makowski
                            </Button>
                        </a>
                    </Grid>

                    <Grid item xs={12} md className={classes.gridItem}>
                        <a href="https://github.com/helperline"
                           rel="noopener noreferrer"
                           target="_blank">
                            <Button
                                className={classes.button}
                                size="large"
                                startIcon={<GitHubIcon className={classes.startIcon}/>}>
                                Open Source
                            </Button>
                        </a>
                    </Grid>

                    <Grid item xs={12} md className={classes.gridItem}>
                        <a href="https://github.com/orgs/HelperLine/projects/1"
                           rel="noopener noreferrer"
                           target="_blank">
                            <Button
                                className={classes.button}
                                size="large"
                                startIcon={<DeveloperModeIcon className={classes.startIcon}/>}>
                                Progress
                            </Button>
                        </a>
                    </Grid>

                    <Grid item xs={12} md className={classes.gridItem}>
                        <a href="https://helperline.github.io/project/"
                           rel="noopener noreferrer"
                           target="_blank">
                            <Button
                                className={classes.button}
                                size="large"
                                startIcon={<GroupIcon className={classes.startIcon}/>}>
                                About
                            </Button>
                        </a>
                    </Grid>

                </Grid>
            </Container>
        </div>
    );
};
