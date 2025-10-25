import api from './api';

export const getVideoSession = (roomId) =>
  api.get(`/rooms/${roomId}/video`);