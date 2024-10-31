import axios from 'axios';

export const setupAxios = (token = null) => {
    axios.defaults.baseURL = "http://10.10.102.61:8080/api/v1";
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
};