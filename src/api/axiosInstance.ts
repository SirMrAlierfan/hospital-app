import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3500',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(
    //n handle configs
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //n handle errs
        return Promise.reject(error);
    }
);

export default api;