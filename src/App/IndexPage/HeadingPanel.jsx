import React from 'react';
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {IndexPageTranslation} from "../../Translations/Pages/IndexPageTranslation";
import {Container} from "@material-ui/core";
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

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                <strong><a href="tel:+49-30-2555-5305" className={classes.pinkLink}>
                    {IndexPageTranslation.title4[props.language]}
                </a></strong>
            </Typography>

        </Container>
    );
};