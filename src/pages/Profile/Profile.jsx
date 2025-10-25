import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PostForm from '../../components/Posts/PostForm';
import PostItem from '../../components/Posts/PostItems';
import ProfileDetail from '../Profile/ProfileDetails'; // import the new component

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/me', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setProfileData(res.data);

        const postsRes = await axios.get(`http://localhost:3000/api/post?author=${res.data._id}`);
        setUserPosts(postsRes.data);
      } catch (err) {
        console.error('Error loading profile or posts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  if (loading) return <p>Loading profile...</p>;
  if (!profileData) return <p>Could not load profile.</p>;

  const handlePostCreated = (newPost) => {
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {/* Profile details */}
      <ProfileDetail user={{ ...profileData, posts: userPosts }} />

      <h3>Create a New Post</h3>
      <PostForm
        authorId={profileData._id}
        onSubmit={handlePostCreated} // callback to add new post to list
      />

      <h3>My Posts</h3>
      {userPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        userPosts.map(post => (
          <PostForm
            key={post._id}
            existingPost={post}       // pass post for editing
            onUpdate={(updatedPost) => setUserPosts(userPosts.map(p => p._id === updatedPost._id ? updatedPost : p))}
          />
        ))
      )}
    </div>
  );
}

