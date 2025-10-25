import axios from "axios";

axios.defaults.withCredentials = true;

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const getNotes = async () => {
  const { data } = await axios.get(`${API}/notes`);
  return data;
};

export const createNote = async (note) => {
  const { data } = await axios.post(`${API}/notes`, note);
  return data;
};

export const updateNote = async (id, note) => {
  const { data } = await axios.put(`${API}/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await axios.delete(`${API}/notes/${id}`);
  return data;
};