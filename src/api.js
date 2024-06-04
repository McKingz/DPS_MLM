import axios from 'axios';

// Configure the base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Helper function to get the auth token
const getAuthToken = () => localStorage.getItem('access_token');

// Using axios for all API calls
export const fetchUserData = async () => {
    try {
        const response = await axios.get('/api/user/', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post('/register/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('/login/', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const getUserDetail = async () => {
    try {
        const response = await axios.get('/user-detail/', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting user details:', error);
        throw error;
    }
};

export const getEarnings = async () => {
    try {
        const response = await axios.get('/earnings/', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching earnings:', error);
        throw error;
    }
};

export const getCommissions = async () => {
    try {
        const response = await axios.get('/commissions/', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching commissions:', error);
        throw error;
    }
};