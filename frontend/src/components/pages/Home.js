import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

const Home = () => {
  return (
    <div className="home-page">
      <Header 
        title="Welcome to Banks" 
        subTitle="Compare credit cards and find the perfect match for your needs"
      />
      <div className="home-content">
        <div className="welcome-section">
          <h2>Find Your Ideal Credit Card</h2>
          <p>
            Our platform provides comprehensive credit card comparisons to help you make informed decisions.
            Whether you're looking for rewards, cash back, or low interest rates, we've got you covered.
          </p>
          <div className="home-cta">
            <Link to="/credit-cards" className="cta-button">
              Start Comparing Cards
            </Link>
          </div>
        </div>
        
        <div className="features-section">
          <div className="feature-card">
            <h3>Compare Benefits</h3>
            <p>Side-by-side comparison of card benefits and rewards programs</p>
          </div>
          <div className="feature-card">
            <h3>Filter by Bank</h3>
            <p>Find cards from your preferred financial institutions</p>
          </div>
          <div className="feature-card">
            <h3>Sort by Fees</h3>
            <p>Easily identify low or no annual fee credit card options</p>
          </div>
          <div className="feature-card">
            <h3>Interest Rate Analysis</h3>
            <p>Compare purchase and cash advance interest rates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;