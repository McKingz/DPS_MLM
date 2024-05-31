// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Commissions from './components/Commissions';
import Earnings from './components/Earnings';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/commissions" element={<Commissions />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
