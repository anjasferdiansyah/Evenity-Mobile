import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ROUTES} from "@/constant/ROUTES";

export const setupAxios = async (token = null) => {
    axios.defaults.baseURL = "https://evenity-eo-app-production.up.railway.app/api/v1";

    if (!token) {
        token = await AsyncStorage.getItem("token");
    }

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }

    axios.interceptors.response.use(
        response => response,
        async error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await AsyncStorage.removeItem("token");
                window.location.href = ROUTES.AUTH.INDEX;
            }
            return Promise.reject(error);
        }
    );
};