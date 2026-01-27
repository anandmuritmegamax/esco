import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false,
});

instance.interceptors.request.use(
    (config) => {
        const auth = localStorage.getItem("auth");

        if (auth) {
            const parsed = JSON.parse(auth);

            if (parsed?.token) {
                config.headers.Authorization = `Bearer ${parsed.token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
