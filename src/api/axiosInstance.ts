import { useAuthStore } from '@/store/useAuthStore';
import axios, { type AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3500/api',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(

);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            await api.post('/auth/logout');
            useAuthStore.getState().logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;