import api from './api';

export const uploadResources = (roomId, formData) =>
  api.post(`/rooms/${roomId}/resources`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getResources = (roomId, params) =>
  api.get(`/rooms/${roomId}/resources`, { params });

export const uploadNewVersion = (roomId, resourceId, formData) =>
  api.post(`/rooms/${roomId}/resources/${resourceId}/version`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const deleteResource = (roomId, resourceId) =>
  api.delete(`/rooms/${roomId}/resources/${resourceId}`);