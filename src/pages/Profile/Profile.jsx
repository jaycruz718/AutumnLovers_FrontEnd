// pages/ProfilePage.jsx
import React from 'react';
import Post from '../../components/Posts/Post';
import './Profile.css';

const samplePosts = [
  {
    id: 1,
    user: 'Jane Doe',
    content: 'Hello, this is my first post!',
    image: null,
    timestamp: '2025-10-20T14:48:00.000Z',
    comments: [
      {
        id: 101,
        user: 'John Smith',
        text: 'Welcome!',
        timestamp: '2025-10-20T15:00:00.000Z',
      },
    ],
  },
];

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h2>Your Posts</h2>
      {samplePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePage;
