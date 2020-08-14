/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

/* Routing Imports --------------------------------------------------------------- */
import {Switch, Route, BrowserRouter} from 'react-router-dom';


/* Component Imports ------------------------------------------------------------- */
import {ReducedNavbar} from "../App/Navbar/Navbar";
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
    contentMobile: {
        flexGrow: 1,
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
            <Breakpoint small down>
                <main className={classes.contentMobile}>
                    <div className={classes.fullHeightContainer}>
                        <div className={classes.children}>
                            {props.children}
                        </div>
                    </div>
                    <Footer/>
                </main>
            </Breakpoint>
            <Breakpoint medium up>
                <main className={classes.content}>
                    <div className={classes.fullHeightContainer}>
                        <div className={classes.children}>
                            {props.children}
                        </div>
                    </div>
                    <Footer/>
                </main>
            </Breakpoint>
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
