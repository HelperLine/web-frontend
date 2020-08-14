import React from 'react';

import './IndexPage.scss';

import {handleNewAccountData} from "../../ReduxActions";
import {connect} from "react-redux";

import {CollabPanel} from "./CollabPanel";


import {Breakpoint} from "react-socks";


import {useStyles} from './style';
import {PitchPanel} from "./PitchPanel";
import {ActivityPanel} from "./ActivityPanel";
import {SponsorPanel} from "./SponsorPanel";
import {HeadingPanel} from "./HeadingPanel";
import {Footer} from "../Footer/Footer";




export const IndexPageComponent = (props) => {
    const classes = useStyles();

    return (
        <div className="IndexPage">

            <HeadingPanel language={props.language}/>

            <SponsorPanel language={props.language}/>

            <PitchPanel language={props.language}/>

            <div className={classes.colorPanel1}>

                <ActivityPanel language={props.language}/>

            </div>

            <Breakpoint small down>
                <div className={classes.colorPanel2Mobile}>
                    <CollabPanel language={props.language}/>
                </div>
            </Breakpoint>
            <Breakpoint medium up>
                <div className={classes.colorPanel2}>
                    <CollabPanel language={props.language}/>
                </div>
            </Breakpoint>

        </div>
    );
};

const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
});

export const IndexPage = connect(mapStateToProps, mapDispatchToProps)(IndexPageComponent);

