import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://localhost:7165",
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.response.use(
    (res) => {
        return res.data.response ?? res.status;
    },
    (err) => Promise.reject(err)
);

export default api;