// Profile.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PostForm from '../../components/Posts/PostForm';
import PostItem from '../../components/Posts/PostItem';
import './Profile.css';

export default function Profile() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      if (!user?.token) return;

      setLoading(true);
      setError('');

      try {
        // Fetch profile info
        const profileRes = await axios.get('http://localhost:3000/api/user/me', {
          headers: { 'x-auth-token': user.token },
        });
        setProfileData(profileRes.data);

        setProfileForm({
          userName: profileRes.data.userName,
          email: profileRes.data.email,
          password: '',
        });

        // Fetch user's posts
        const postsRes = await axios.get('http://localhost:3000/api/post', {
          params: { author: profileRes.data._id },
          headers: { 'x-auth-token': user.token },
        });
        setUserPosts(postsRes.data || []);
      } catch (err) {
        console.error('Error fetching profile or posts:', err);
        if (err.response?.status === 401) {
          setError('User not authenticated. Please log in again.');
          logout();
        } else {
          setError('Failed to load profile or posts.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [user, logout]);

  if (!user) {
    return (
      <div className="not-logged-in">
        <div className="login-message">
          <h2>Please Log In to View Profile</h2>
          <p>Come inside we have snacks and black cats!</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <p className="error">{error}</p>
      </div>
    );
  }

  // ---- Post handlers ----
  const handleNewPost = (post) => {
    setUserPosts([post, ...userPosts]);
  };

  const handleUpdatePost = (updatedPost) => {
    setUserPosts(userPosts.map(p => (p._id === updatedPost._id ? updatedPost : p)));
    setEditingPost(null);
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
  };

  const handleDeletePost = (postId) => {
    setUserPosts(userPosts.filter(p => p._id !== postId));
  };

  // ---- Profile form handlers ----
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileLoading(true);

    try {
      const updatedData = { ...profileForm };
      if (!updatedData.password) delete updatedData.password; // don't send empty password

      const res = await updateProfile(updatedData);
      if (!res.success) {
        setProfileError(res.errors?.join(', ') || 'Failed to update profile.');
      } else {
        setProfileData(prev => ({ ...prev, ...profileForm, password: undefined }));
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setProfileError('Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h2>{profileData?.userName}</h2>
        <p>Email: {profileData?.email}</p>
        <p>Joined: {new Date(profileData?.createdAt).toLocaleDateString()}</p>
        <button onClick={() => setIsEditingProfile(prev => !prev)}>
          {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Edit Profile Form */}
      {isEditingProfile && (
        <form className="profile-form" onSubmit={handleProfileSubmit}>
          {profileError && <p className="error">{profileError}</p>}

          <label>
            Username:
            <input
              type="text"
              name="userName"
              value={profileForm.userName}
              onChange={handleProfileChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              required
            />
          </label>

          <label>
            Password (leave blank to keep current):
            <input
              type="password"
              name="password"
              value={profileForm.password}
              onChange={handleProfileChange}
            />
          </label>

          <div className="button-group">
            <button type="submit" disabled={profileLoading}>
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Post Form */}
      <PostForm
        onSubmit={handleNewPost}
        onUpdate={handleUpdatePost}
        existingPost={editingPost}
      />

      {/* Posts List */}
      <h3>Your Posts</h3>
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="profile-posts">
          {userPosts.map(post => (
            <li key={post._id}>
              <PostItem
                post={post}
                onUpdate={handleUpdatePost}
                onDelete={() => handleDeletePost(post._id)}
                onEdit={() => handleEditClick(post)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
