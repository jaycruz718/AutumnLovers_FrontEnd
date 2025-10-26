import React from 'react';
import './EventCard.css'; 
import { deleteEvent } from '../../api/events'; // import API call

const EventCard = ({ event, onDelete }) => {
  const { _id, title, date, description, image } = event;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(_id); // call backend delete
      if (onDelete) onDelete(_id); // update parent state
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return (
    <div className="event-card">
      {image && <img src={image} alt={title} className="event-image" />}
      <div className="event-details">
        <h2>{title}</h2>
        <p className="event-date">{new Date(date).toLocaleDateString()}</p>
        <p className="event-description">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </p>
        <button className="read-more-btn">Read More</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EventCard;
