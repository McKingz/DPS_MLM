import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, refreshToken, logout } from '../auth';
import './Commissions.css';

const Commissions = () => {
    const [commissions, setCommissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommissions = async () => {
            try {
                let token = localStorage.getItem('access_token');
                if (isTokenExpired(token)) {
                    token = await refreshToken();
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/commissions/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCommissions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching commissions:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchCommissions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className="commissions-page">
            <h1 className="text-primary mt-4">Commissions</h1>
            <Row>
                {commissions.map((commission, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Level {commission.level}</Card.Title>
                                <Card.Text>Percentage Share: {commission.percentage}%</Card.Text>
                                <Card.Text>Earned: R{commission.amount}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Container>
    );
};

export default Commissions;
