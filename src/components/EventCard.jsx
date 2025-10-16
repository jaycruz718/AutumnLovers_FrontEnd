import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css'; 

const EventCard = ({ event }) => {
  const { id, title, date, description, image } = event;

  return (
    <div className="event-card">
      {image && <img src={image} alt={title} className="event-image" />}
      <div className="event-details">
        <h2>{title}</h2>
        <p className="event-date">{new Date(date).toLocaleDateString()}</p>
        <p className="event-description">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>
        <Link to={`/events/${id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
