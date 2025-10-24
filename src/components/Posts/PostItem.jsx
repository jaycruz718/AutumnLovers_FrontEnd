// components/Posts/PostItem.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import PostForm from './PostForm';

export default function PostItem({ post, onDeleted, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/post/${post._id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      onDeleted(post._id);
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Error deleting post');
    }
  };

  // checks for creator of the post
  const isAuthor =
    !!user &&
    (
      post.author?._id?.toString() === user._id?.toString() ||
      post.author?.toString() === user._id?.toString()
    );

  return (
    <div className="post-item">
      {editing ? (
        <PostForm
          existingPost={post}
          onUpdate={(updatedPost) => {
            onUpdated(updatedPost);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <h4>{post.title}</h4>
          <p>{post.content}</p>

          {post.tags?.length > 0 && (
            <small>Tags: {post.tags.join(', ')}</small>
          )}

          <div className="meta">
            <small>
              Author:{' '}
              {post.author?.username ||
                post.author?.name ||
                'Unknown User'}
            </small>
          </div>

          {isAuthor && (
            <div className="actions">
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
