import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { isTokenExpired, refreshToken, logout } from '../auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let token = localStorage.getItem('access_token');
                if (isTokenExpired(token)) {
                    token = await refreshToken();
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};