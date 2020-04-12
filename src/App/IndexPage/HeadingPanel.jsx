import React from 'react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {IndexPageTranslation} from "../../Translations/Pages/IndexPageTranslation";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {Button, Container} from "@material-ui/core";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {WordTranslations} from "../../Translations/Standard/WordTranslations";
import {Breakpoint} from "react-socks";
import {useStyles} from "./style";


export const HeadingPanel = (props) => {

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <Typography variant="h3" className={clsx(classes.centerText, classes.margin6, classes.pageStart)}>
                {IndexPageTranslation.title1[props.language]}
            </Typography>

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin1, classes.nameReferenceText)}>
                <em>{IndexPageTranslation.title2[props.language]}</em>
            </Typography>

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin1)}>
                {IndexPageTranslation.title3[props.language]}
            </Typography>

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin6)}>
                <strong><a href="tel:+49-30-2555-5305" className={classes.pinkLink}>
                    {IndexPageTranslation.title4[props.language]}
                </a></strong>
            </Typography>

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin2)}>
                <strong>{IndexPageTranslation.title5[props.language]}</strong>
            </Typography>

            <Grid container justify="center" spacing={2}>
                <Grid item className={classes.centerBoxTop}>
                    <Link to="/register">
                        <Button color="secondary" variant="contained"
                                startIcon={<HowToRegIcon className={classes.buttonStartIcon}/>}>{WordTranslations.register[props.language]}</Button>
                    </Link>
                </Grid>
            </Grid>

            <Link to="/login">
                <Breakpoint small down>
                    <Button className={classes.reducedLoginButtonMobile} disableElevation variant="contained">
                        {WordTranslations.login[props.language]}
                    </Button>
                </Breakpoint>
                <Breakpoint medium up>
                    <Button className={classes.reducedLoginButton} disableElevation variant="contained">
                        {WordTranslations.login[props.language]}
                    </Button>
                </Breakpoint>
            </Link>

        </Container>
    );
};