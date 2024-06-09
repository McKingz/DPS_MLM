import axios from 'axios';

// Configure the base URL for axios
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Helper function to get the auth token
const getAuthToken = () => localStorage.getItem('access_token');

// Function to get CSRF token from cookies
function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length));
                break;
            }
        }
    }
    return cookieValue;
}

// Using axios for all API calls
export const fetchUserData = async () => {
    try {
        const response = await axios.get('/user/', {
            headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const apiUrl = 'http://localhost:8000';
export const registerUser = async (formData) => {
    try {
        const response = await axios.post('/register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCSRFToken(),
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error registering user:', error.response.data);
            // Handle error response from backend
        } else {
            console.error('Error registering user:', error.message);
            // Handle other errors
        }
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${apiUrl}/login/`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;  // Ensure the response contains 'access', 'refresh', and 'user' fields
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
