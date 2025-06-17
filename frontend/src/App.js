import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import CreditCards from './components/pages/CreditCards';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './components/pages/Profile';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
