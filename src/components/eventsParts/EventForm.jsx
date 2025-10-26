import React, { useState, useContext } from 'react';
import '../../components/eventsParts/EventForm.css';
import { AuthContext } from '../../context/AuthContext'; 

const EventForm = ({ onSubmit }) => {
  const { user } = useContext(AuthContext) || {};
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    image: '',
    createdBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEvent = {
      ...formData,
      createdBy: user?.userName || 'Guest', // matches backend schema
    };

    if (onSubmit) onSubmit(newEvent);

    setFormData({
      title: '',
      date: '',
      description: '',
      location: '',
      image: '',
      createdBy: '',
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Create New Event</h2>

      <label>
        Event Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </label>

      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
