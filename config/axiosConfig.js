import axios from 'axios';

export const setupAxios = (token = null) => {
    axios.defaults.baseURL = "https://evenity-eo-app-production.up.railway.app/api/v1";
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
};