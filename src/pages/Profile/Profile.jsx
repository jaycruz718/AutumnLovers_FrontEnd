// Profile.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import '../Profile/Profile.css';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/user/me";

  useEffect(() => {
    console.log("User in Profile:", user);
    const fetchProfileAndPosts = async () => {
      if (!user || !user.token) return;

      setLoading(true);
      setError('');

      try {
        // Fetch profile info
        console.log('Fetching profile with token:', user.token);
        const profileRes = await axios.get('http://localhost:3000/api/user/me', {
          headers: { 'x-auth-token': user.token },
        });

        console.log('Profile data:', profileRes.data);
        setProfileData(profileRes.data);

        // Fetch user's posts
        const postsRes = await axios.get(`http://localhost:3000/api/post/user/me${profileRes.data._id}`, {
          headers: { 'x-auth-token': user.token },
        });
        setUserPosts(postsRes.data || []);
      } catch (err) {
        console.error('Error fetching profile or posts:', err);
        if (err.response?.status === 401) {
          setError('User not authenticated. Please log in again.');
          logout();
        } else if (err.response?.status === 404) {
          setUserPosts([]);
        } else {
          setError('Failed to load profile or posts.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, [user]);

  if (!user) return <p>Loading user info...</p>;
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile">
      <h2>{profileData?.userName}</h2>
      <p>Email: {profileData?.email}</p>
      <p>Joined: {new Date(profileData?.createdAt).toLocaleDateString()}</p>

      <h3>Posts</h3>
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {userPosts.map(post => (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
