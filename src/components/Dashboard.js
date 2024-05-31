import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Button, Navbar, Nav, Image } from 'react-bootstrap';
import { FaBell, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired, refreshToken, logout } from '../auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState({});
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('access_token');
                if (isTokenExpired(token)) {
                    token = await refreshToken();
                }

                const userRequest = axios.get(`${process.env.REACT_APP_API_URL}/user/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const referralsRequest = axios.get(`${process.env.REACT_APP_API_URL}/referred-users/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const [userResponse, referralsResponse] = await Promise.all([userRequest, referralsRequest]);

                setUserData(userResponse.data);
                setReferrals(referralsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 401) {
                    logout();
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleRefer = () => {
        navigate('/register');
    };

    const referralUrl = `${window.location.origin}/register?referral_code=${userData.referral_code}`;

    const handleShareReferralUrl = () => {
        navigator.clipboard.writeText(referralUrl).then(() => {
            alert('Referral URL copied to clipboard!');
        });
    };

    return (
        <div className={`dashboard-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>DPS MLM</h3>
                </div>
                <ul className="list-unstyled components">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/referrals">Referrals</a></li>
                    <li><a href="/commissions">Commissions</a></li>
                    <li><a href="/earnings">Earnings</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/settings">Settings</a></li>
                </ul>
                <ul className="list-unstyled CTAs">
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
            <div className="content">
                <Navbar bg="dark" variant="dark" className="top-navbar">
                    <Button variant="link" className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaBars className="text-white" />
                    </Button>
                    <Button variant='link' className='text-white'>
                        <a href='/'>Home</a>
                    </Button>
                    <Nav className="ml-auto align-items-center">
                        <Nav.Link href="/notifications">
                            <FaBell className="text-white" />
                        </Nav.Link>
                        <Navbar.Text className="mr-3">
                            Welcome: <a href="/profile">{userData.username ? userData.username : 'Guest'}</a>
                        </Navbar.Text>
                        <Image src={userData.profile_picture} roundedCircle className="mr-3" />
                    </Nav>
                </Navbar>
                <Container fluid>
                    <h1 className="text-primary mt-4">Dashboard</h1>
                    <Row>
                        <Col lg={4} xs={12} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Welcome, {userData.username}!</Card.Title>
                                    <Card.Text>Level: {userData.rank}</Card.Text>
                                    <Card.Text>Total Referrals: {userData.total_referrals}</Card.Text>
                                    <Card.Text>Earnings: R{userData.earnings}</Card.Text>
                                    <div className="scrollable-div">
                                        {referrals.length > 0 ? (
                                            referrals.map((referral, index) => (
                                                <div key={index}>
                                                    <p>Username: {referral.username}</p>
                                                    {referral.referred_users.length > 0 ? (
                                                        referral.referred_users.map((subReferral, subIndex) => (
                                                            <p key={subIndex}>Referred User: {subReferral}</p>
                                                        ))
                                                    ) : (
                                                        <p>No referred users</p>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No referrals found</p>
                                        )}
                                    </div>
                                    <Button variant="primary" href="/profile">View Profile</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={8} xs={12} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Referred Users</Card.Title>
                                    <div className="scrollable-div-referred">
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
                                    <Button variant="success" onClick={handleShareReferralUrl}>Share Referral URL</Button>
                                    <Button variant="primary" onClick={handleRefer}>Refer a Friend</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
