import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { UserContext } from '../context/UserContext';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import './Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('token_expiry', new Date().getTime() + 5 * 60 * 1000); // Adjust based on your expiry
            setUser(data.user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed');
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center">
                <Col md="4">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" block="true">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
