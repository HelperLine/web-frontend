/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

/* Routing Imports --------------------------------------------------------------- */
import {Switch, Route, BrowserRouter, Redirect, Link} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {Navbar, ReducedNavbar} from "../App/Navbar/Navbar";
import {LoginPage} from '../App/SignInPage/LoginPage';
import {RegisterPage} from "../App/SignInPage/RegisterPage";
import {AccountPage} from "../App/AccountPage/AccountPage";
import {CallsPage} from "../App/CallsPage/CallsPage";
import {GuidePage} from "../App/GuidePage/GuidePage";
import {IndexPage} from "../App/IndexPage/IndexPage";
// import {Footer} from "../App/Footer/Footer";


/* Component --------------------------------------------------------------------- */


const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
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
                    <div className={classes.toolbar}/>
                    <div className={classes.children}>
                        {props.children}
                    </div>
                </div>
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
                    {props.loggedIn && (
                        <Redirect to="/account"/>
                    )}
                    {!props.loggedIn && (
                        <React.Fragment>
                            <ReducedNavbar/>
                            <LoginPage/>
                        </React.Fragment>
                    )}
                </Route>
                <Route exact strict path="/register">
                    {props.loggedIn && (
                        <Redirect to="/account"/>
                    )}
                    {!props.loggedIn && (
                        <React.Fragment>
                            <ReducedNavbar/>
                            <RegisterPage/>
                        </React.Fragment>
                    )}
                </Route>
                <Route exact strict path="/logout">
                    <Redirect to="/guide"/>
                </Route>

                <Route>
                    <ReducedNavbar/>
                    <Content>
                        <p>page not found</p>
                    </Content>
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
