import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../layout/Header';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(credentials.email)) {
      return 'Invalid email format';
    }
    if (!passwordRegex.test(credentials.password)) {
      return 'Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
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
      login({ email: credentials.email });
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <Header 
        title="Login" 
        subTitle="Access your account to manage your credit card comparisons"
      />
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={credentials.email} 
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
              value={credentials.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="auth-btn">Login</button>
          
          <div className="auth-link">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
