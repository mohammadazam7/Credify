import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../layout/Header';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(userData.name)) {
      return 'Name must contain only letters and spaces';
    }
    if (!emailRegex.test(userData.email)) {
      return 'Invalid email format';
    }
    if (!passwordRegex.test(userData.password)) {
      return 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    if (userData.password !== userData.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      signup({ name: userData.name, email: userData.email });
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <Header 
        title="Sign Up" 
        subTitle="Create an account to save and compare credit cards"
      />
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={userData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={userData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={userData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={userData.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="auth-btn">Sign Up</button>
          
          <div className="auth-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
