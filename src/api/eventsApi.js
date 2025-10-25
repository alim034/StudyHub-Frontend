// frontend/src/api/eventsApi.js
import api from './api';

export const getEvents = (roomId, from, to) =>
  api.get(`/rooms/${roomId}/events`, { params: { from, to } });

export const createEvent = (roomId, eventData) =>
  api.post(`/rooms/${roomId}/events`, eventData);

export const updateEvent = (roomId, eventId, eventData) =>
  api.patch(`/rooms/${roomId}/events/${eventId}`, eventData);

export const deleteEvent = (roomId, eventId) =>
  api.delete(`/rooms/${roomId}/events/${eventId}`);