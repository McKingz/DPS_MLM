import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import './Profile.css';
import { isTokenExpired, refreshToken, logout } from '../auth';
import BackButton from './BackButton'
const Profile = () => {
    const [userData, setUserData] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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

                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('access_token');

            if (isTokenExpired(token)) {
                token = await refreshToken();
            }

            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('phone', userData.phone);

            if (profilePicture) {
                formData.append('profile_picture', profilePicture);
            }

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUserData(response.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="profile-container">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Card>
                        <Card.Body>
                            <h2 className="text-center">Profile</h2>
                            <BackButton />
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={userData.username}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formProfilePicture">
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleProfilePictureChange}
                                    />
                                    {userData.profilePicture && (
                                        <div className="mt-3">
                                            <Image src={userData.profilePicture} roundedCircle width="100" height="100" />
                                        </div>
                                    )}
                                </Form.Group>
                                <Button variant="primary" type="submit" block='true'>
                                    Update Profile
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
