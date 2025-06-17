// // src/pages/Profile.js
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import ProfileDetails from '../profile/ProfileDetails';
// import ProfileEdit from '../profile/ProfileEdit';
// import Header from '../layout/Header';
// //  import { fetchUserProfile, updateUserProfile } from '../services/profileService';

// const Profile = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadProfile = async () => {
//       if (!currentUser) return;
      
//       try {
//         setLoading(true);
//         const profileData = await fetchUserProfile(currentUser.id);
//         setProfile(profileData);
//       } catch (err) {
//         setError('Failed to load profile');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadProfile();
//   }, [currentUser]);

//   const handleUpdateProfile = async (updatedData) => {
//     try {
//       setLoading(true);
//       await updateUserProfile(currentUser.id, updatedData);
//       setProfile({...profile, ...updatedData});
//       setIsEditing(false);
//     } catch (err) {
//       setError('Failed to update profile');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="profile-page">
//         <Header title="Profile" />
//         <div className="auth-required">
//           <h2>Authentication Required</h2>
//           <p>Please login to view your profile.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-page">
//       <Header title="My Profile" />
      
//       {loading ? (
//         <div className="loader">
//           <div className="loader-spinner"></div>
//           <p>Loading profile...</p>
//         </div>
//       ) : error ? (
//         <div className="api-error">
//           <p>{error}</p>
//           <button 
//             className="retry-btn" 
//             onClick={() => window.location.reload()}
//           >
//             Retry
//           </button>
//         </div>
//       ) : isEditing ? (
//         <ProfileEdit 
//           profile={profile} 
//           onSave={handleUpdateProfile} 
//           onCancel={() => setIsEditing(false)}
//         />
//       ) : (
//         <ProfileDetails 
//           profile={profile} 
//           onEdit={() => setIsEditing(true)} 
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;