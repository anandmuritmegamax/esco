import axios from "axios";

const instance = axios.create({
    baseURL: "/api/v1",   // 🔥 use proxy
    withCredentials: true,
});

export default instance;
