// components/Posts/PostItem.jsx
import React from 'react';

export default function PostItem({ post }) {
  return (
    <div className="post-item">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      {post.tags && <p><strong>Tags:</strong> {post.tags.join(', ')}</p>}
    </div>
  );
}
