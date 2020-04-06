import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Container} from "@material-ui/core";

import './GuidePage.scss';
import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";

import {GuidePageTranslation} from "./GuidePageTranslation";


const useStyles = makeStyles(theme => ({
    title: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    description: {
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(6),
    },
    crowdSource: {
        display: "block",
        textAlign: "center",
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    root: {
        width: '100%',
    },
    heading: {
        fontWeight: "500"
    },
}));

const GuidePageComponent = (props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className="GuidePage">
            <Typography variant="h4" className={classes.title}>{GuidePageTranslation.guideTitle[props.language]}</Typography>

            <Container maxWidth="sm">
                <Typography variant="body1" className={classes.description}>
                    {GuidePageTranslation.text1[props.language]}
                </Typography>
            </Container>

            <div className={classes.root}>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.groceryShopping[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>

                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.pickingUpParcels[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.storesAreClosed[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.pickingUpMedication[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.mentalHealth[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>
                            {GuidePageTranslation.moneyTransfer[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

            </div>

            <Container maxWidth="sm">
                <Typography variant="body1" className={classes.crowdSource}>
                    {GuidePageTranslation.text2[props.language]}
                </Typography>
            </Container>
        </Container>
    );
};


const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    handleNewAccountData: (response) => dispatch(handleNewAccountData(response)),
});

export const GuidePage = connect(mapStateToProps, mapDispatchToProps)(GuidePageComponent);

