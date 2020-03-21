
export const handleLogout = () => ({
    type: "LOGOUT"
});

export const handleLogin = (email, api_key) => ({
    type: "LOGIN",
    email: email,
    api_key: api_key,
});

export const startAutoLogin = () => ({
    type: "START_AUTOLOGIN",
});

export const abortAutoLogin = () => ({
    type: "ABORT_AUTOLOGIN",
});