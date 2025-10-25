// src/api/auth.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/user/me'; 

export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/login`, data);
  return res.data;
};
