// src/components/profile/ProfileEdit.js
import React, { useState } from 'react';

const ProfileEdit = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: {
      street: profile?.address?.street || '',
      city: profile?.address?.city || '',
      state: profile?.address?.state || '',
      postalCode: profile?.address?.postalCode || '',
    },
    preferences: {
      notifications: profile?.preferences?.notifications || false,
      marketingEmails: profile?.preferences?.marketingEmails || false,
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const [section, field] = name.split('.');
    
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Address</h3>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State/Province</label>
            <input
              type="text"
              id="state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Preferences</h3>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="notifications"
              name="preferences.notifications"
              checked={formData.preferences.notifications}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="notifications">Receive notifications</label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="marketingEmails"
              name="preferences.marketingEmails"
              checked={formData.preferences.marketingEmails}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="marketingEmails">Receive marketing emails</label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;