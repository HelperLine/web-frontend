
export const handleLogout = () => ({
    type: "LOGOUT"
});

export const handleLogin = (response) => ({
    type: "LOGIN",

    email: response.data.email,
    api_key: response.data.api_key,

    account: response.data.account,
    performance: response.data.performance,
    filters: response.data.filters,
    calls: response.data.calls,
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