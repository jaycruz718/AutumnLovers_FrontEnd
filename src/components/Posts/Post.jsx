// components/Post.jsx
import React, { useState } from 'react';
import Comment from '../Posts/Comments';

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: 'Current User', // Replace with actual user info
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="post">
      <div className="post-header">
        <h4>{post.user}</h4>
        <small>{new Date(post.timestamp).toLocaleString()}</small>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100%' }} />}
      </div>
      <div className="post-comments">
        <h5>Comments</h5>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
