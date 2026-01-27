// import axios from "axios";

// const instance = axios.create({
//     baseURL: "/api/v1",   // 🔥 use proxy
//     withCredentials: true,
// });

// export default instance;




import axios from "axios";

const instance = axios.create({
    baseURL: "/api/v1",
});

instance.interceptors.request.use((config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
        const parsed = JSON.parse(auth);
        if (parsed?.token) {
            config.headers.Authorization = `Bearer ${parsed.token}`;
        }
    }
    return config;
});

export default instance;
