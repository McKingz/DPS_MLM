import axios from 'axios';
import { isTokenExpired, refreshToken, logout } from './auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('access_token');
        if (isTokenExpired(token)) {
            try {
                token = await refreshToken();
            } catch (error) {
                logout();
                return Promise.reject(error);
            }
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
