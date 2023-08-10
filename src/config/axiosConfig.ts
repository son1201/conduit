import axios from "axios";
import { store } from "../store";

export const axiosClient = axios.create({
    baseURL: "https://api.realworld.io/api/"
})

axiosClient.interceptors.request.use(
function (config) {
    // Do something before request is sent
    const state = store.getState();
    const token = state.userReducer.user.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
},
function (error) {
    console.log(error);
    // Do something with request error
}
);
