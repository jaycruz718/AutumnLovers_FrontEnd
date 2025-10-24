// pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PostForm from '../../components/Posts/PostForm';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const res = await axios.get('http://localhost:3000/api/post', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });

        // Safely handles data structure
        const postsArray = Array.isArray(res.data) ? res.data : res.data.posts || [];

        // Filter posts that belong to this user
        const userPosts = res.data.filter(post => post.author === user.id);
        setPosts(res.data.posts || []); // note: use .posts if that's the correct key
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Add new post to start immediately after successful creation

  // If no user is logged in:
  if(!user) {
    return (
      <div className="profile-page not-logged-in">
        <div className="login-message">
          <h2>Please Log in to view Your Profile</h2>
            <p>You must be logged in to create or view your posts.</p>
          
          </div>     
      </div>
    )
  }

  if (loading) return <div className='profile-page'><p>Loading posts...</p></div>;
  if (error) return <div className='profile-page'><p>{error}</p></div>;

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="profile-page">
      <h2>Your Posts</h2>

      {/* Post Creation Form */}
      <PostForm onSubmit={handleNewPost} />
      
      {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id || post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
  ))
) : (
  <p>You haven’t posted anything yet.</p>
)}

    </div>
  );
};

export default ProfilePage;
