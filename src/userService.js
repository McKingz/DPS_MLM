// src/userService.js
import api from './axiosConfig';

export const getUserData = async () => {
    try {
        const response = await api.get('/api/user/');
        console.log('User data:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error fetching user data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
        throw error;
    }
};
