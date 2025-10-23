// src/api/events.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/events'; 

/** Get all events */
export const getEvents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

/** Get a single event by ID */
export const getEvent = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

/** Create a new event */
export const createEvent = async (eventData) => {
  const response = await axios.post('http://localhost:3000/api/events', eventData);
  return response.data;
};

/** Update an existing event */
export const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, eventData);
  return response.data;
};

/** Delete an event */
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
