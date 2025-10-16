import React from 'react';
import videobg from "../../assets/Background1.mp4";
import './Home.css'; 

export default function Home() {
  const user = localStorage.getItem('user');

  return (
    <div className="video_wrap">
  <video autoPlay muted loop>
    <source src={videobg} type="video/mp4" />
  </video>
  <div className="content">
    <h1>Welcome</h1>
    <p>This is the autumn vibe</p>
  </div>
</div>
)}
