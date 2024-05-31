import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser, getUserDetail } from '../api';  // Make sure this path is correct
import { Form, Button, Container, Row, Col, Card, Navbar, Nav, Image } from 'react-bootstrap';
import { FaBars, FaBell } from 'react-icons/fa';
import './Register.css';
import BackButton from './BackButton';
import { logout } from '../auth';  // Make sure this path is correct

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState(null);
    const [referralCode, setReferralCode] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loggedInUserReferralCode, setLoggedInUserReferralCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch logged-in user details
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
        setProfilePic(file);
        setProfilePicUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('phone_number', phoneNumber);
        formData.append('referral_code', referralCode);
        formData.append('profile_picture', profilePic);

        try {
            await registerUser(formData);
            alert('Registration successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration failed', error);
            if (error.response && error.response.data) {
                console.error('Server response:', error.response.data);
                alert(`Registration failed: ${error.response.data.error || 'Unknown error'}`);
            } else {
                alert('Registration failed');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`register-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>DPS MLM</h3>
                </div>
                <div>
                    <Button variant='link' onClick={handleLogout}>Logout</Button>
                </div>
                <div className="content">
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
                </div>
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
