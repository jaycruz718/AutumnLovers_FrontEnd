// src/api/events.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/post'; 

/** Get all posts */
export const getPost = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

/** Get a single post by ID */
export const getPosts = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

/** Create a new post */
export const createPost = async (postData) => {
  const response = await axios.post(BASE_URL, postData);
  return response.data;
};

/** Update an existing post */
export const updatePost = async (id, postData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, postData);
  return response.data;
};

/** Delete an post */
export const deletePost = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
