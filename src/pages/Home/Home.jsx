import React, { useEffect, useState } from 'react';
import videobg from "../../assets/Background1.mp4";
import './Home.css';

export default function Home() {
  const user = localStorage.getItem('user');

  // Set your countdown target date here
  const targetDate = new Date("2025-10-31T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);

    updateCountdown(); // Run once immediately

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  return (
    <div className="video_wrap">
      <video autoPlay muted loop>
        <source src={videobg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Welcome{user ? `, ${user}` : ''}</h1>
        <p>This is the Autumn Vibe</p>

        <div className="countdown">
          <h2>Countdown to HALLOWEEN</h2>
          <div className="timer">
            <span>{timeLeft.days}d</span> :
            <span>{timeLeft.hours}h</span> :
            <span>{timeLeft.minutes}m</span> :
            <span>{timeLeft.seconds}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
