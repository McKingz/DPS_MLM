// src/components/ReferralTree.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ReferralTree = ({ referrals }) => {
    if (!referrals || referrals.length === 0) {
        return <div>No referrals to display</div>;
    }

    return (
        <ListGroup>
            {referrals.map((referral, index) => (
                <ListGroup.Item key={index}>
                    {referral.username} - {referral.email}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default ReferralTree;
