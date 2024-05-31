// dps-mlm/src/components/ReferredUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReferredUsers = () => {
    const [referredUsers, setReferredUsers] = useState([]);

    useEffect(() => {
        const fetchReferredUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/referred-users/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                setReferredUsers(response.data);
            } catch (error) {
                console.error('Error fetching referred users:', error);
            }
        };

        fetchReferredUsers();
    }, []);

    return (
        <div className="referred-users">
            <h2>Referred Users</h2>
            <ul>
                {referredUsers.map(user => (
                    <li key={user.username}>
                        {user.username}
                        {user.referred_users.length > 0 && (
                            <ul>
                                {user.referred_users.map(subUser => (
                                    <li key={subUser}>{subUser}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReferredUsers;
