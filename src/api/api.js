import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// IMPORTANT: Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    // Try multiple locations for the auth token
    let token = localStorage.getItem('token');
    if (!token) {
      try {
        const au = JSON.parse(localStorage.getItem('authUser') || '{}');
        token = au?.token || token;
      } catch {}
    }
    if (!token) {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        token = u?.token || token;
      } catch {}
    }
    if (!token) {
      try {
        const au = JSON.parse(sessionStorage.getItem('authUser') || '{}');
        token = au?.token || token;
      } catch {}
    }
    if (!token) {
      try {
        const u = JSON.parse(sessionStorage.getItem('user') || '{}');
        token = u?.token || token;
      } catch {}
    }
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;