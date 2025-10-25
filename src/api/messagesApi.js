// Import our new configured api instance
import api from './api.js';

export const getMessages = async (roomId, { before, limit = 30 } = {}) => {
  const params = new URLSearchParams();
  if (before) params.append('before', before);
  if (limit) params.append('limit', limit);

  // The request to this URL will now automatically have the Authorization header.
  // No need for withCredentials: true anymore.
  const { data } = await api.get(`/rooms/${roomId}/messages`, { params });
  return data;
};
