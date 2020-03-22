
export const handleLogout = () => ({
    type: "LOGOUT"
});

export const handleLogin = (api_key, account) => ({
    type: "LOGIN",
    email: account.email,
    api_key: api_key,
    account: account
});

export const startAutoLogin = () => ({
    type: "START_AUTOLOGIN",
});

export const abortAutoLogin = () => ({
    type: "ABORT_AUTOLOGIN",
});

export const handleNewAccountData = (account) => ({
    type: "NEW_ACCOUNT_DATA",
    account: account,
});