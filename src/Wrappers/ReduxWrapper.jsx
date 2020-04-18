
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";


import Cookies from 'js-cookie';
import axios from "axios";
import {handleLogin, abortAutoLogin, startAutoLogin, switchLanguage} from "../ReduxActions";

import {BACKEND_URL} from "../secrets";


let cloneDeep = require('lodash.clonedeep');


function storeReducer(state = {
    loggedIn: false,
    autoLogin: false,
    language: "deutsch",

    email: "",
    api_key: "",

    account: {
        email: "",
        email_verified: "",
        phone_number: "",
        phone_number_verified: "",
        zip_code: "",
        country: "",
    },
    filter: {
        call_type: {
            only_local: false,
            only_global: false,
        },
        language: {
            english: false,
            german: false,
        }
    },
    calls: {
        accepted: [],
        fulfilled: []
    },
    performance: {
        callers: 0,
        calls: 0,
        helpers: 0
    },
    message: {
        open: false,
        text: ""
    },
}, action) {

    let newState = cloneDeep(state);

    switch (action.type) {
        case "LOGIN":
            newState.loggedIn = true;
            newState.autoLogin = false;

            newState.email = action.email;
            newState.api_key = action.api_key;

            newState.account = action.account;
            newState.filter = action.filter;
            newState.calls = action.calls;
            newState.performance = action.performance;

            Cookies.set('email', action.email, {expires: 7});
            Cookies.set('api_key', action.api_key, {expires: 7});

            return newState;

        case "LOGOUT":
            newState.loggedIn = false;
            delete newState.email;
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
            newState.email = action.email;

            newState.account = action.account;
            newState.performance = action.performance;
            newState.filters = action.filters;
            newState.calls = action.calls;

            Cookies.remove('email');
            Cookies.set('email', action.email);
            return newState;

        case "SWITCH_LANGUAGE":
            newState.language = action.language;
            Cookies.set('language', action.language, {expires: 365});
            return newState;

        case "OPEN_MESSAGE":
            newState.message.open = true;
            newState.message.text = action.text;
            return newState;

        case "CLOSE_MESSAGE":
            newState.message.open = false;
            return newState;

        default:
            return newState;
    }
}

// noinspection JSCheckFunctionSignatures
let store = createStore(storeReducer);


// Try to log in automatically on launch

let cookieEmail =  Cookies.get('email');
let cookieApiKey =  Cookies.get('api_key');

if (cookieEmail !== undefined && cookieApiKey !== undefined) {
    store.dispatch(startAutoLogin());
    axios.post(BACKEND_URL + "authentication/login/helper", {email: cookieEmail, api_key: cookieApiKey})
        .then(loginResponse => {
            let query_string = "database/fetchall?email=" + cookieEmail + "&api_key=" + loginResponse.data.api_key;
            axios.get(BACKEND_URL + query_string)
                .then(fetchallResponse => {
                    store.dispatch(handleLogin(cookieEmail, fetchallResponse.data));
                }).catch(() => {
                store.dispatch(abortAutoLogin());
            })
        }).catch(() => {
        store.dispatch(abortAutoLogin());
    });
}


// Set language if stored in Cookie
let cookieLanguage =  Cookies.get('language');

if (cookieLanguage !== undefined) {
    switch (cookieLanguage) {
        case "english":
            store.dispatch(switchLanguage("english"));
            break;
        case "deutsch":
            store.dispatch(switchLanguage("deutsch"));
            break;
        default:
            break;
    }
}


export const ReduxWrapper = (props) => {

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};
