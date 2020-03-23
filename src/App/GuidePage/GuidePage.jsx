import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Container} from "@material-ui/core";

import './GuidePage.scss';

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

export const GuidePage = (props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className="GuidePage">
            <Typography variant="h4" className={classes.title}>Guide <em>(coming soon)</em></Typography>

            <Container maxWidth="sm">
                <Typography variant="body1" className={classes.description}>
                    Call-Center-Volunteers should not have to figure out everything by themselves.

                    This page will contain a <strong>list of tips</strong> for <strong>all kinds of
                    scenarios</strong> our
                    volunteers might have to conquer.

                    <br/><br/>

                    Since we do not want to share "truth's" specified by only a small number of people we are
                    <strong> not yet ready to share</strong> these tips.

                    We're already <strong>crowdsourcing the best strategies</strong> which people broadly agreed on.

                    <br/><br/>

                    Stay tuned!
                </Typography>
            </Container>

            <div className={classes.root}>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>Einkaufen gehen</Typography>
                    </ExpansionPanelSummary>

                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>Pakete von der Post
                            abholen</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>Geschäfte zu/problematisch: Hilfe
                            beim Internetkauf</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>Ein Rezept beim Arzt abholen,
                            Medikamente besorgen</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

                <ExpansionPanel disabled>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant="subtitle1" className={classes.heading}>Vermittlung bei Seelsorge</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>

            </div>

            <Container maxWidth="sm">
                <Typography variant="body1" className={classes.crowdSource}>
                    If you want to <strong>help us in the process</strong> feel free to contact us via:
                    <br/>
                    <a href="mailto:info@hilfe-am-ohr.de">info@hilfe-am-ohr.de</a>
                </Typography>
            </Container>
        </Container>
    );
};
