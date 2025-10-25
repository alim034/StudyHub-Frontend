import api from "./api";  
const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const createRoom = async (room) => {
  const { data } = await api.post(`/rooms`, room);
  return data;
};

export const joinByCode = async (code) => {
  const { data } = await api.post(`/rooms/join`, { code });
  return data;
};

export const getMyRooms = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/rooms/mine`, { params: { page, limit } });
  return data;
};

export const getRoomById = async (id) => {
  const { data } = await api.get(`/rooms/${id}`);
  return data;
};

export const updateRoom = async (id, updates) => {
  const { data } = await api.patch(`/rooms/${id}`, updates);
  return data;
};

export const deleteRoom = async (id) => {
  const { data } = await api.delete(`/rooms/${id}`);
  return data;
};

export const regenerateInvite = async (id) => {
  const { data } = await api.post(`/rooms/${id}/invite/regenerate`);
  return data;
};

// Get all rooms
export const getRooms = async () => {
  const res = await api.get('/rooms');
  return res.data;
};