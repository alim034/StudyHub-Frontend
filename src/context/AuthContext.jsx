import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// 1. Import your central API instance
import api from "../api/api"; // Make sure this path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading until check is complete
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Runs ONCE on initial app load to check localStorage for existing session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        // Use the stored user data for faster initial load
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Optional: You could verify the token here with an API call if needed,
        // but for speed, trusting localStorage is often okay initially.
        // If the token is invalid, later API calls will fail anyway.
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        // Clear invalid stored data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
    setLoading(false); // Finished initial check
  }, []);

  // --- LOGIN FUNCTION ---
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });

      // Check if response contains user and token
      if (!data.user || !data.token) {
        throw new Error("Login response missing user data or token.");
      }

      // 1. Save all necessary data to storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user object
      localStorage.setItem('rememberedEmail', email); // Save email for autofill

      // 2. Set the React state. This updates the app INSTANTLY.
      setUser(data.user);

      // 3. Navigate AFTER state update (React 18 batches state updates)
      navigate("/dashboard"); // Redirect to dashboard

      // Optional: Return user data if needed by the calling component
      return data.user;

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      console.error("Login API error:", err);
      setError(errorMessage);
      setUser(null); // Ensure user state is cleared on failure
      // Re-throw error so the Login component's catch block can handle UI feedback
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER FUNCTION ---
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { name, email, password });

      // Check if response contains user and token
      if (!data.user || !data.token) {
        throw new Error("Registration response missing user data or token.");
      }

      // 1. Save all necessary data to storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user object
      localStorage.setItem('rememberedEmail', email); // Save email for autofill

      // 2. Set the React state.
      setUser(data.user);

      // 3. Navigate
      navigate("/dashboard"); // Redirect to dashboard

      // Optional: Return user data
      return data.user;

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Registration failed";
      console.error("Register API error:", err);
      setError(errorMessage);
      setUser(null);
      // Re-throw error for the Register component
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGOUT FUNCTION ---
  const logout = () => {
    // Remove token AND user from storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Don't remove 'rememberedEmail' here if you want it to persist after logout
    setUser(null); // Clear React state
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading, // Share loading state for spinners etc.
        error, // Share error state for displaying messages
        isAuthenticated: !!user, // Convenient boolean flag
        login,
        register,
        logout,
        setError, // Allow components to clear global errors if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => useContext(AuthContext);