// src/api/auth.js
import axios from 'axios';

// Shared backend route for both login and registration
const BASE_URL = 'http://localhost:3000/api/user';

export const loginUser = async (data) => {
  const res = await axios.post('http://localhost:3000/api/user/login', data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post('http://localhost:3000/api/user/register', data);
  return res.data;
};
