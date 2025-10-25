import React, { createContext, useEffect, useState, useContext } from "react";
// 1. Import your new central API instance
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserOnLoad = async () => {
      // 2. Check for a token in storage first
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/profile');
          setUser(data);
        } catch (err) {
          // Token is invalid or expired, so clear it
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUserOnLoad();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // 3. Get response from login to access the token
      const { data } = await api.post('/auth/login', { email, password });
      // 4. SAVE THE TOKEN!
      localStorage.setItem('token', data.token);
      // Some APIs return { token, user }, others return the user directly
      const resolvedUser = data?.user || data;
      setUser(resolvedUser);
      // Remember email for UX (do NOT store password)
      const resolvedEmail = resolvedUser?.email || email;
      if (resolvedEmail) {
        localStorage.setItem('lastLoginEmail', resolvedEmail);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // 5. Same logic for register
      const { data } = await api.post('/auth/register', { name, email, password });
      // 6. SAVE THE TOKEN!
      localStorage.setItem('token', data.token);
      const resolvedUser = data?.user || data;
      setUser(resolvedUser);
      const resolvedEmail = resolvedUser?.email || email;
      if (resolvedEmail) {
        localStorage.setItem('lastLoginEmail', resolvedEmail);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // 7. Remove the token on logout
    localStorage.removeItem('token');
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);