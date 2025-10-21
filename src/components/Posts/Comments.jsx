// components/Comment.jsx
import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <strong>{comment.user}</strong> <span>{comment.text}</span>
      <div className="comment-time">
        <small>{new Date(comment.timestamp).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default Comment;
