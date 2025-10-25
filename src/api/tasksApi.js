import api from './api';

export const getTasks = (roomId, params = {}) =>
  api.get(`/api/rooms/${roomId}/tasks`, { params });

export const createTask = (roomId, taskData) =>
  api.post(`/api/rooms/${roomId}/tasks`, taskData);

export const updateTask = (roomId, taskId, updateData) =>
  api.patch(`/api/rooms/${roomId}/tasks/${taskId}`, updateData);

export const deleteTask = (roomId, taskId) =>
  api.delete(`/api/rooms/${roomId}/tasks/${taskId}`);

export const getTaskSummary = (roomId) =>
  api.get(`/api/rooms/${roomId}/tasks/summary`);
