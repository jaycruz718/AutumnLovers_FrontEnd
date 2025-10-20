import React, { useState } from 'react';
import './AboutContact.css'; 
import { sendContactForm } from '../../api/contact';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactForm(formData);
      alert("Message sent!");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
