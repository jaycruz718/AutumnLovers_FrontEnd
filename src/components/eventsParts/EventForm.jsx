import React, { useState } from 'react';
import './EventForm.css'; // optional: for styling

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    // You can handle the event data here or pass it to a parent via props
    if (onSubmit) {
      onSubmit(formData);
    }

    // Optional: reset the form
    setFormData({
      title: '',
      date: '',
      description: '',
      image: ''
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
