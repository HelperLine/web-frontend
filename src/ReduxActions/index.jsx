
export const handleLogout = () => ({
    type: "LOGOUT"
});

export const handleLogin = (email, fetchallResponse) => ({
    type: "LOGIN",

    email: email,
    api_key: fetchallResponse.api_key,

    account: fetchallResponse.account,
    filter: fetchallResponse.filter,
    forward: fetchallResponse.forward,
    calls: fetchallResponse.calls,
    performance: fetchallResponse.performance,
});

export const startAutoLogin = () => ({
    type: "START_AUTOLOGIN",
});

export const abortAutoLogin = () => ({
    type: "ABORT_AUTOLOGIN",
});

export const handleNewAccountData = (response) => ({
    type: "NEW_ACCOUNT_DATA",

    email: response.data.email,

    account: response.data.account,
    performance: response.data.performance,
    filters: response.data.filters,
    calls: response.data.calls,
});

export const switchLanguage = (language) => ({
    type: "SWITCH_LANGUAGE",
    language: language,
});


export const openMessage = (text) => ({
    type: "OPEN_MESSAGE",
    text: text,
});


export const closeMessage = () => ({
    type: "CLOSE_MESSAGE",
});




export const setForward = (forward) => ({
    type: "SET_FORWARD",
    forward: forward,
});

export const setFilter = (filter) => ({
    type: "SET_FILTER",
    filter: filter,
});
