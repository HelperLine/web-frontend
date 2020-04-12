/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

/* Routing Imports --------------------------------------------------------------- */
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {Navbar, ReducedNavbar} from "../App/Navbar/Navbar";
import {LoginPage} from '../App/SignInPage/LoginPage';
import {RegisterPage} from "../App/SignInPage/RegisterPage";
import {AccountPage} from "../App/AccountPage/AccountPage";
import {CallsPage} from "../App/CallsPage/CallsPage";
import {GuidePage} from "../App/GuidePage/GuidePage";
import {IndexPage} from "../App/IndexPage/IndexPage";
import {NotFoundPage} from "../App/NotFoundPage/NotFoundPage";
import {Footer} from "../App/Footer/Footer";
import {Breakpoint} from "react-socks";


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: 240,
        width: "100vw",
    },
    fullHeightContainer: {
        minHeight: "100vh",
    },
    children: {
        padding: theme.spacing(0),
    },
    toolbar: theme.mixins.toolbar,
}));

const Content = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <main className={classes.content}>
                <div className={classes.fullHeightContainer}>
                    <div className={classes.children}>
                        {props.children}
                    </div>
                </div>
                <Footer/>
            </main>
        </React.Fragment>
    );
};


const RouterComponent = (props) => (
    <BrowserRouter>

        <Route>
            <Switch>
                <Route exact strict path="/">
                    <ReducedNavbar/>
                    <IndexPage/>
                    <Footer/>
                </Route>

                <Route exact strict path="/guide">
                    <Navbar/>
                    <Content>
                        <GuidePage/>
                    </Content>
                </Route>

                <Route exact strict path="/calls">
                    {props.loggedIn && (
                        <React.Fragment>
                            <Navbar/>
                            <Content>
                                <CallsPage/>
                            </Content>
                        </React.Fragment>
                    )}
                    {(!props.loggedIn && props.autoLogin) && (<Navbar/>)}
                    {(!props.loggedIn && !props.autoLogin) && (<Redirect to="/login"/>)}
                </Route>

                <Route exact strict path="/account">
                    {props.loggedIn && (
                        <React.Fragment>
                            <Navbar/>
                            <Content>
                                <AccountPage/>
                            </Content>
                        </React.Fragment>
                    )}
                    {(!props.loggedIn && props.autoLogin) && (<Navbar/>)}
                    {(!props.loggedIn && !props.autoLogin) && (<Redirect to="/login"/>)}
                </Route>

                <Route exact strict path="/login">
                    {(props.loggedIn || props.autoLogin) && (
                        <Redirect to="/calls"/>
                    )}
                    {(!props.loggedIn && !props.autoLogin) && (
                        <React.Fragment>
                            <ReducedNavbar/>
                            <LoginPage/>
                            <Footer/>
                        </React.Fragment>
                    )}
                </Route>
                <Route exact strict path="/register">
                    {(props.loggedIn || props.autoLogin) && (
                        <Redirect to="/calls"/>
                    )}
                    {(!props.loggedIn && !props.autoLogin) && (
                        <React.Fragment>
                            <ReducedNavbar/>
                            <RegisterPage/>
                            <Footer/>
                        </React.Fragment>
                    )}
                </Route>
                <Route exact strict path="/logout">
                    <Redirect to="/guide"/>
                </Route>

                <Route>
                    <ReducedNavbar/>
                    <NotFoundPage/>
                    <Footer/>
                </Route>
            </Switch>
        </Route>
    </BrowserRouter>
);


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */

const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    autoLogin: state.autoLogin,
});

const mapDispatchToProps = dispatch => ({});

export const Router = connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
