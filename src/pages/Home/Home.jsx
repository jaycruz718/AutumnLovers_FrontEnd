import React from 'react';
import videobg from './assets/Background1.mp4';
import './Home.css'; 

export default function Home() {
  const user = localStorage.getItem('user');

  return (
    <div className='video_wrap'>
      <video src={videobg} autoPlay muted loop />
      <h1>Welcome to Autumn Lovers</h1>
      {user ? (
        <p>Hi, {user}!</p>
      ) : (
        <p>Please <a href="/login">log in</a> to enjoy the full experience.</p>
      )}
    </div>
  );
}
