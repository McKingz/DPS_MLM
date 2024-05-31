import React, { useState } from 'react';
import { Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';
import '../styles/images/about-image.png';
import '../styles/images/new-image.png';

const Home = () => {
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);

    const handleReadMore = () => {
        setShowMore(!showMore);
    };

    return (
        <Container fluid className="text-center p-0">
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
            <div className='logo'>
                <img src={require('../styles/images/logo.png')} alt='Logo'/>
            </div>
                <Container bg='darg' variant='dark' className='c-navbar'>
                    <Navbar.Brand href="/">DPS Better Life Club</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="#hero">Home</Nav.Link>
                            <Nav.Link href="#about">About</Nav.Link>
                            <Nav.Link href="#product">Our Product</Nav.Link>
                            <Nav.Link href="#compensation">Compensation</Nav.Link>
                            <Nav.Link href="#model-hero">Our Model</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <div>
                    <Button>
                        <a href='/login/'>Login /</a>
                        <a href='/register/'> Register</a>
                    </Button>
                </div>
            </Navbar>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-content">
                    <h1>Creating a Better Life for All</h1>
                    <Button variant="primary" onClick={() => navigate('/register')} className="cta-button">Join Us Now</Button>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="about-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h2>About Us</h2>
                            <div className={`text-content ${showMore ? 'show-more' : ''}`} id="textContent">
                                <p>DPS Better Life Club was founded in 2019, and has a social impact footprint in Lesotho, Zimbabwe and South Africa doing community sustainable development work - humanitarian work with sustainable models (food being the focus) is dedicated to fostering resilient communities through our comprehensive insurance solutions. We understand that resilience encompasses the ability to withstand and recover from life's challenges, including the emotional and financial day to day burdens.</p>
                                <p>Our mission is to support individuals and families in creating a legacy while they live, ensuring that they can lead and leave behind a meaningful and impactful legacy for their loved ones and communities.</p>
                                <p>By providing you with an opportunity to become a distributor, we empower you, your family, and the community to live financially liberated lives while resting assured that you are provided for. Join us in building stronger, more resilient communities where everyone can thrive.</p>
                                <p><i>DPS Better Life Club is committed to providing a better life for everyone through our innovative products and unique compensation plan...</i></p>
                            </div>
                            <Button className="read-more" onClick={handleReadMore}>{showMore ? 'Read Less' : 'Read More'}</Button>
                        </Col>
                        <Col md={6}>
                            <img src={require('../styles/images/about-image.png')} alt="About Us" className="img-fluid" />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Product Section */}
            <section id="product" className="product-section py-5 bg-light">
                <Container>
                    <h2>Our Product</h2>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <img src={require('../styles/images/product-image.png')} alt="Our Product" className="img-fluid" />
                        </Col>
                        <Col md={6}>
                            <p>Discover our range of products designed to improve your life. Our products include health supplements, skincare items, and more...</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Compensation Plan Section */}
            <section id="compensation" className="compensation-section py-5">
                <Container>  
                    <img src={require('../styles/images/new-image.png')} alt="About Us" className="img-fluid" />
                </Container>
            </section>

            {/* Our Model Section */}
            <section id="model-hero" className="py-5 bg-light">
                <div className="px-4 pt-5 my-5 text-center border-bottom">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">OUR MODEL</h1>
                    <Container>
                        <Row className='align-items-center'>
                            <Col md={6}>
                                <ul>
                                    <li>Multi-level Networking</li>
                                    <li>Building communities</li>
                                    <li>Compound strategies</li>
                                    <li>Reward Systems</li>
                                    <li>Application back end office</li>
                                    <li>Fast starter Awards</li>
                                    <li>Top points Awards</li>
                                    <li>High flyer Awards</li>
                                </ul>
                            </Col>
                            <Col md={6}>
                                <img src={require('../styles/images/model-image.png')} alt="About Us" className="img-fluid" />
                            </Col>
                        </Row>
                    </Container>
                    <div>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <a href='/register'><button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Get Started</button></a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-dark text-white py-4">
                <Container className='container-footer'>
                    <p>Contact us: info@dpsbetterlifeclub.com</p>
                    <p>Follow us on social media: [Social Media Links]</p>
                    <p>
                        <a href="/" className="text-white">Privacy Policy</a> | 
                        <a href="/" className="text-white">Terms of Service</a>
                    </p>
                </Container>
            </footer>
        </Container>
    );
};

export default Home;
