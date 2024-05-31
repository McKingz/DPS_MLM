// src/api/index.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update this URL

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${REACT_APP_API_URL}/register/`, userData);
    return response.data;
};

const fetchRecentActivity = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/recent-activity/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.5',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        throw error;
    }
};
