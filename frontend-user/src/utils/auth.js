export const setAuth = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = () => {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
};

export const logout = () => {
    localStorage.removeItem("auth");
};
