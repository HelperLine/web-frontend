
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";
import {Themer} from "./Themer";


import Cookies from 'js-cookie';
import axios from "axios";
import {handleLogin, abortAutoLogin, startAutoLogin} from "../ReduxActions";

import {BACKEND_URL} from "../secrets";


var cloneDeep = require('lodash.clonedeep');


function storeReducer(state = {
    loggedIn: false,
    autoLogin: false,
    language: "deutsch",

    account: {
        email: "",
        online: false,
    },
    calls: {
        accepted: [],
        fulfilled: []
    },
    api_key: "",
}, action) {

    let newState = cloneDeep(state);

    switch (action.type) {
        case "LOGIN":
            newState.loggedIn = true;
            newState.autoLogin = false;
            newState.api_key = action.api_key;
            newState.account = action.account;
            newState.calls = action.calls;

            Cookies.set('email', action.account.email, {expires: 7});
            Cookies.set('api_key', action.api_key, {expires: 7});

            return newState;

        case "LOGOUT":
            newState.loggedIn = false;
            delete newState.account.email;
            delete newState.api_key;

            Cookies.remove('email');
            Cookies.remove('api_key');

            return newState;

        case "START_AUTOLOGIN":
            newState.autoLogin = true;
            return newState;

        case "ABORT_AUTOLOGIN":
            newState.autoLogin = false;

            Cookies.remove('email');
            Cookies.remove('api_key');

            return newState;

        case "NEW_ACCOUNT_DATA":
            newState.account = action.account;
            newState.calls = action.calls;

            Cookies.remove('email');
            Cookies.set('email', action.account.email);
            return newState;

        default:
            return newState;
    }
}

let store = createStore(storeReducer);


// Try to log in automatically on launch

let cookieEmail =  Cookies.get('email');
let cookieApiKey =  Cookies.get('api_key');

if (cookieEmail !== undefined && cookieApiKey !== undefined) {
    store.dispatch(startAutoLogin());
    axios.post(BACKEND_URL + "backend/login", {email: cookieEmail, api_key: cookieApiKey})
        .then(response => {
            if (response.data.status === "ok") {
                // Instant view-change looks laggy rather than fast -> 1.0 second delay
                setTimeout(() => {
                    store.dispatch(handleLogin(response));
                }, 1000);
            } else {
                store.dispatch(abortAutoLogin());
            }
        }).catch(response => {
        console.log("Axios promise rejected! Response:");
        console.log(response);
        store.dispatch(abortAutoLogin());
    });
}

export const ReduxWrapper = () => {

    return (
        <Provider store={store}>
            <Themer/>
        </Provider>
    );
};
