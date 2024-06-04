import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

fetch(`${apiUrl}/some-endpoint`, {
  method: 'GET',
  // other fetch options
})
.then(response => response.json())
.then(data => {
  // handle the data
});


export const registerUser = async (formData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login/`, credentials);
    return response.data;
};

export const fetchUserData = async (token) => {
    const response = await apiClient.get('/user/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getUserDetail = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-detail/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response.data;
};

export const getEarnings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/earnings/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response.data;
};

export const getCommissions = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/commissions/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    return response.data;
};
