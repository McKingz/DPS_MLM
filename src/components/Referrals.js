import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { isTokenExpired, refreshToken, logout } from '../auth';
import { UserContext } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Referrals.css';

const Referrals = () => {
    const { user } = useContext(UserContext);
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('access_token');
                if (isTokenExpired(token)) {
                    token = await refreshToken();
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/referred-users/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setReferrals(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching referrals:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    return (
        <Container fluid>
            <h1 className="text-primary mt-4">Referrals</h1>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>All Referrals for {user.username}</Card.Title>
                            <div className="scrollable-div">
                                <ListGroup>
                                    {referrals.map((referral, index) => (
                                        <ListGroup.Item key={index}>
                                            {referral.username}
                                            {referral.referred_users.length > 0 && (
                                                <ul>
                                                    {referral.referred_users.map((subUser, subIndex) => (
                                                        <li key={subIndex}>{subUser}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Container>
    );
};

export default Referrals;