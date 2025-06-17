// src/components/profile/ProfileDetails.js
import React from 'react';

const ProfileDetails = ({ profile, onEdit }) => {
  if (!profile) return null;
  
  return (
    <div className="profile-details">
      <div className="profile-header">
        <div className="profile-avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {profile.firstName && profile.firstName[0]}
            </div>
          )}
        </div>
        <div className="profile-title">
          <h2>{profile.firstName} {profile.lastName}</h2>
          <p>{profile.email}</p>
        </div>
        <button className="edit-profile-btn" onClick={onEdit}>
          Edit Profile
        </button>
      </div>
      
      <div className="profile-sections">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-fields">
            <div className="profile-field">
              <span className="field-label">Full Name:</span>
              <span className="field-value">{profile.firstName} {profile.lastName}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Email:</span>
              <span className="field-value">{profile.email}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Phone:</span>
              <span className="field-value">{profile.phone || 'Not provided'}</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Address</h3>
          <div className="profile-fields">
            <div className="profile-field">
              <span className="field-label">Street:</span>
              <span className="field-value">{profile.address?.street || 'Not provided'}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">City:</span>
              <span className="field-value">{profile.address?.city || 'Not provided'}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">State/Province:</span>
              <span className="field-value">{profile.address?.state || 'Not provided'}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Postal Code:</span>
              <span className="field-value">{profile.address?.postalCode || 'Not provided'}</span>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Preferences</h3>
          <div className="profile-fields">
            <div className="profile-field">
              <span className="field-label">Notifications:</span>
              <span className="field-value">{profile.preferences?.notifications ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Marketing Emails:</span>
              <span className="field-value">{profile.preferences?.marketingEmails ? 'Subscribed' : 'Unsubscribed'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;