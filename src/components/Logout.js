import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/');
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;