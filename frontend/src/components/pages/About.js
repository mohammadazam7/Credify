import React from 'react';
import Header from '../layout/Header';

const About = () => {
  return (
    <div className="about-page">
      <Header 
        title="About Us" 
        subTitle="Learn more about our credit card comparison service"
      />
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Credit Card Comparison, we're dedicated to providing transparent, accurate, and up-to-date 
            information about credit cards from all major banks. Our goal is to help you make informed 
            financial decisions by comparing features, benefits, and costs across a wide range of credit cards.
          </p>
        </div>
        
        <div className="about-section">
          <h2>How We Work</h2>
          <p>
            We gather information directly from financial institutions and update our database regularly 
            to ensure accuracy. Our advanced filtering and comparison tools allow you to quickly find 
            the credit cards that best match your specific needs and lifestyle.
          </p>
        </div>
        
        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of financial experts and technology professionals who are passionate about 
            financial literacy and helping people make smart choices with their money. With years of 
            experience in the banking and fintech industries, we understand what matters most when 
            choosing a credit card.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;