// components/Posts/PostForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './PostForm.css';

export default function PostForm({ onSubmit, onUpdate, existingPost }) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title || '',
        content: existingPost.content || '',
        tags: existingPost.tags?.join(', ') || '',
      });
    }
  }, [existingPost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        author: user._id,
      };

      let res;
      if (existingPost) {
        // UPDATE existing post
        res = await axios.put(`http://localhost:3000/api/post/${existingPost._id}`, payload, {
          headers: { 'x-auth-token': token },
        });
        if (onUpdate) onUpdate(res.data);
      } else {
        // CREATE new post
        res = await axios.post('http://localhost:3000/api/post', payload, {
          headers: { 'x-auth-token': token },
        });
        if (onSubmit) onSubmit(res.data);
      }

      setFormData({ title: '', content: '', tags: '' });
    } catch (err) {
      console.error('Error submitting post:', err);
      setError(err.response?.data?.error || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>{existingPost ? 'Edit Post' : 'Create a New Post'}</h3>
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
        {loading ? 'Saving...' : existingPost ? 'Update Post' : 'Post'}
      </button>
    </form>
  );
}
