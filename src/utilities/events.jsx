import axios from 'axios';

const BASE = '/api/events';

export const getEvents = () => axios.get(BASE);
export const getEvent = (id) => axios.get(`${BASE}/${id}`);
export const createEvent = (data) => axios.post(BASE, data);
export const updateEvent = (id, data) => axios.put(`${BASE}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${BASE}/${id}`);