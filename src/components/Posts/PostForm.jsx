// components/Posts/PostForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './PostForm.css';

export default function PostForm({ onSubmit }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/post', {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        author: user._id, // or user._id depending on your backend
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        }
      });

      setFormData({ title: '', content: '', tags: '' });
      if (onSubmit) onSubmit(res.data); // callback to update post list
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>Create a New Post</h3>
      {error && <p className="error">{error}</p>}
      
      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <textarea
        name="content"
        placeholder="Write your post..."
        rows="4"
        value={formData.content}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
}
