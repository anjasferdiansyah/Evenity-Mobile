import axios from 'axios';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const setupAxios = (token = null) => {
    axios.defaults.baseURL = "https://evenity-eo-app-production.up.railway.app/api/v1";
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401 || error.response.status === 403) {
                asyncStorage.removeItem("token");
                asyncStorage.removeItem("userId");
                asyncStorage.removeItem("email");
                asyncStorage.removeItem("role");
                window.location.href = "/auth/login";
            }
            return Promise.reject(error);
        }
    )
};