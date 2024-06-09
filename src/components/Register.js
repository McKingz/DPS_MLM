import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserDetail } from '../api';
import { Form, Button, Container, Row, Col, Card, Navbar, Nav, Image } from 'react-bootstrap';
import { FaBars, FaBell } from 'react-icons/fa';
import './Register.css';
import BackButton from './BackButton';

function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                callback(blob);
            }, 'image/jpeg', 0.9);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [referralCode, setReferralCode] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggedInUserReferralCode, setLoggedInUserReferralCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                const userDetail = await getUserDetail();
                setLoggedInUserReferralCode(userDetail.referral_code);
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };

        fetchUserDetail();

        const urlReferralCode = new URLSearchParams(location.search).get('referral');
        if (urlReferralCode) {
            setReferralCode(urlReferralCode);
        }
    }, [location.search]);

    useEffect(() => {
        if (!referralCode && loggedInUserReferralCode) {
            setReferralCode(loggedInUserReferralCode);
        }
    }, [loggedInUserReferralCode, referralCode]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            resizeImage(file, 800, 800, (resizedBlob) => {
                const resizedFile = new File([resizedBlob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                });
                setProfilePic(resizedFile);
                setProfilePicUrl(URL.createObjectURL(resizedFile));
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password2', password2);
        formData.append('phone_number', phoneNumber);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('referral_code', referralCode);
        if (profilePic) {
            formData.append('profile_picture', profilePic);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Registration successful', response.data);
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                console.error('Server response:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <div className={`register-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>DPS MLM</h3>
                </div>
                <Navbar bg="dark" variant="dark" className="top-navbar">
                    <Button variant="link" className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaBars className="text-white" />
                    </Button>
                    <Nav className="ml-auto align-items-center">
                        <Navbar.Text className="mr-3">
                            Signed in as: <a href="/profile">{username}</a>
                        </Navbar.Text>
                        <Image src={profilePicUrl || "https://via.placeholder.com/30"} roundedCircle className="mr-3" />
                        <FaBell className="text-white" />
                    </Nav>
                </Navbar>
            </nav>
            <Container className="register-container">
                <Row className="justify-content-md-center">
                    <Col md="6">
                        <Card>
                            <Card.Body>
                                <BackButton />
                                <h2 className="text-center">Register</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm password"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicProfilePic">
                                        <Form.Label>Profile Picture</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicReferralCode">
                                        <Form.Label>Referral Code</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter referral code"
                                            value={referralCode}
                                            onChange={(e) => setReferralCode(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Register
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
