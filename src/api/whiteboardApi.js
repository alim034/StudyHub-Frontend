import api from './api';

export const getBoard = (roomId) => api.get(`/rooms/${roomId}/board`);

export const saveBoard = (roomId, boardData) =>
  api.put(`/rooms/${roomId}/board`, { data: boardData });

export default { getBoard, saveBoard };
