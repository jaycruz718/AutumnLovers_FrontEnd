// pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../../components/Posts/Post';
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
  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }

  if (loading) return <div className='profile-page'><p>Loading posts...</p></div>;
  if (error) return <div className='profile-page'><p>{error}</p></div>;

  return (
    <div className="profile-page">
      <h2>Your Posts</h2>

      {/* Post Creation Form */}
      <PostForm onPostCreated={handleNewPost} />

      {/* Post List */}
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id || post.id} post={post} />)
      ) : (
        <p>You haven’t posted anything yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;
