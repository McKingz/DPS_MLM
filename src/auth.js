import axios from 'axios';

export const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return Date.now() >= expiry * 1000;
};

export const refreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, {
        refresh: refresh_token,
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
};

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
};

export const registerUser = async (formData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register/`, formData);
    return response.data;
};


