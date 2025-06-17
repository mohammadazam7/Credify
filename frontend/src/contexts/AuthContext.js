import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In a real app, you would authenticate with a backend here
    // For now, just store the user in local storage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const signup = (userData) => {
    // In a real app, you would register with a backend here
    // For now, just store the user in local storage
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};