import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import './Footer.scss';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    impressumBox: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    simpleBox: {
        textAlign: "center",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: "white",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    link: {
        textDecoration: "none",
        display: "block",
        color: "white",
    },
}));

export const Footer = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.impressumBox}>
            <Grid container justify="center" spacing={1}>

                <Grid item>
                    <Card elevation={0} className={clsx(classes.simpleBox, "BrightCard")}>
                        <a href="https://github.com/dostuffthatmatters"
                           rel="noopener noreferrer"
                           target="_blank"
                           className={classes.link}>
                            <Typography variant="p">© Moritz Makowski</Typography>
                        </a>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
};
