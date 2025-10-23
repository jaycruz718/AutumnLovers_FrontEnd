import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/comments';

/** Get comments for a specific post */
export async function getComments(postId) {
  const res = await axios.get(`${API_URL}/${postId}`);
  return res.data;
}

// Add a comment to a post 
export const addComments = async (postId, Text, user) => {
  const res = await axios.post(API_URL, { postId, text, user});
  return res.data;
}

/** Get all comments */
export const getComments = async()=> {
  const response = await axios.get(BASE_URL);
  return response.data;
};

/** Get a single comments by ID */
export const getComments = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

/** Create a new comment */
export const createComment = async (commentData) => {
  const response = await axios.post(BASE_URL, commentData);
  return response.data;
};

/** Update an existing comment */
export const updateComment = async (id, commentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, commentData);
  return response.data;
};

/** Delete an comment */
export const deleteComment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};