
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import {createStore} from 'redux'
import {Provider} from "react-redux";

import Cookies from 'js-cookie';
import { switchLanguage} from "../ReduxActions";

let cloneDeep = require('lodash.clonedeep');


function storeReducer(state = {
    messageOpen: true,
    language: "deutsch",
}, action) {

    let newState = {
        messageOpen: state. messageOpen,
        language: state.language,
    }

    switch (action.type) {
        case "CLOSE_MESSAGE":
            newState.messageOpen = false;
            return newState;

        case "SWITCH_LANGUAGE":
            newState.language = action.language;
            Cookies.set('language', action.language, {expires: 365});
            return newState;

        default:
            return newState;
    }
}

let store = createStore(storeReducer);


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
