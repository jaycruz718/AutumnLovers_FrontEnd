// src/api/contact.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/user';

// Sends contact form data to your backend
export const sendContactForm = async (formData) => {
  const response = await axios.post('http://localhost:3000/api/contact', formData);
  return response.data;
};
