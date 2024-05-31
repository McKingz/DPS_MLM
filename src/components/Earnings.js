import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, refreshToken, logout } from '../auth';
import './Earnings.css';

const Earnings = () => {
    const [earnings, setEarnings] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                let token = localStorage.getItem('access_token');
                if (isTokenExpired(token)) {
                    token = await refreshToken();
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/earnings/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setEarnings(response.data.totalEarnings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching earnings:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchEarnings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className="earnings-page">
            <h1 className="text-primary mt-4">Total Earnings</h1>
            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Earnings Summary</Card.Title>
                            <Card.Text>Total Earnings: R{earnings}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Container>
    );
};

export default Earnings;
