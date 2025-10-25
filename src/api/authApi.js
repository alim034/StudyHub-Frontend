// Import our new configured api instance, NOT the default axios
import api from './api.js';
// Import the API_BASE_URL from config
import { API_BASE_URL } from '../config/config.js';

export const login = async (email, password) => {
  // Use 'api' which has the baseURL already set
  const { data } = await api.post('/auth/login', { email, password });
  
  // IMPORTANT: Store user info in localStorage after a successful login
  if (data && data.token) {
    localStorage.setItem('token', data.token); // Store token
    localStorage.setItem('user', JSON.stringify(data.user || data)); // Store user data
  }
  
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  
  // Also store user info after a successful registration
  if (data && data.token) {
    localStorage.setItem('token', data.token); // Store token
    localStorage.setItem('user', JSON.stringify(data.user || data)); // Store user data
  }
  
  return data;
};

export const logout = async () => {
  // Clear user info from localStorage on logout
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userInfo');
  // You might have a backend logout endpoint, or this might just be a frontend action.
  // If you have a backend endpoint, it would be: await api.post('/auth/logout');
};

// Request password reset link
export const forgotPassword = async (email) => {
  return api.post('/auth/forgot-password', { email });
};

// Reset password with token
export const resetPassword = async (token, password) => {
  return api.post(`/auth/reset-password/${token}`, { password });
};

// Add get profile endpoint - FIXED VERSION
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            // If no token, try to get user from localStorage as fallback
            const cachedUser = localStorage.getItem('user');
            if (cachedUser && cachedUser !== 'null') {
                const userData = JSON.parse(cachedUser);
                console.log('📦 Using cached user data:', userData);
                return { user: userData };
            }
            throw new Error('No authentication token found. Please login again.');
        }

        console.log('🔍 Fetching profile from:', `${API_BASE_URL}/api/auth/profile`);

        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('📡 Profile response status:', response.status);

        if (!response.ok) {
            if (response.status === 404) {
                // Profile endpoint might not exist, use cached data
                const cachedUser = localStorage.getItem('user');
                if (cachedUser && cachedUser !== 'null') {
                    const userData = JSON.parse(cachedUser);
                    console.log('📦 Profile endpoint not found, using cached data:', userData);
                    return { user: userData };
                }
                throw new Error('Profile not found and no cached data available');
            }
            
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch profile`);
        }

        const responseData = await response.json();
        console.log('✅ Profile data received:', responseData);
        return responseData;

    } catch (error) {
        console.error('❌ Profile fetch error:', error);
        
        // Try cached data as ultimate fallback
        const cachedUser = localStorage.getItem('user');
        if (cachedUser && cachedUser !== 'null') {
            try {
                const userData = JSON.parse(cachedUser);
                console.log('🔄 Using cached user data as fallback:', userData);
                return { user: userData };
            } catch (parseError) {
                console.error('❌ Failed to parse cached user data:', parseError);
            }
        }
        
        throw error;
    }
};

// Add avatar upload endpoint
export const uploadAvatar = async (file) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const formData = new FormData();
        formData.append('avatar', file);

        console.log('📸 Uploading avatar to:', `${API_BASE_URL}/api/auth/upload-avatar`);

        const response = await fetch(`${API_BASE_URL}/api/auth/upload-avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Avatar upload endpoint not implemented yet');
            }
            const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
            throw new Error(errorData.message || 'Avatar upload failed');
        }

        return await response.json();
    } catch (error) {
        console.error('❌ Avatar upload error:', error);
        throw error;
    }
};

// Add profile update endpoint
export const updateProfile = async (profileData) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        console.log('💾 Updating profile at:', `${API_BASE_URL}/api/auth/profile`);

        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        if (!response.ok) {
            if (response.status === 404) {
                // Update endpoint doesn't exist, save to localStorage instead
                console.log('⚠️ Profile update endpoint not found, saving to localStorage');
                const cachedUser = JSON.parse(localStorage.getItem('user') || '{}');
                const updatedUser = { ...cachedUser, ...profileData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return { user: updatedUser, message: 'Profile saved locally' };
            }
            
            const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
            throw new Error(errorData.message || 'Profile update failed');
        }

        const result = await response.json();
        
        // Update localStorage with new data
        if (result.user) {
            localStorage.setItem('user', JSON.stringify(result.user));
        }
        
        return result;
    } catch (error) {
        console.error('❌ Profile update error:', error);
        
        // Fallback: save to localStorage if backend fails
        if (error.message.includes('fetch')) {
            console.log('🔄 Backend unavailable, saving to localStorage');
            const cachedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...cachedUser, ...profileData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return { user: updatedUser, message: 'Profile saved locally (offline mode)' };
        }
        
        throw error;
    }
};