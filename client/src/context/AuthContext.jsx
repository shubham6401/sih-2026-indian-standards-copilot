import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('is_auth_token');
      const savedUser = localStorage.getItem('is_auth_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const freshUser = await api.getMe();
          if (freshUser) setUser(freshUser);
        } catch (e) {
          console.warn('Auth token refresh failed, keeping cached profile');
        }
      } else {
        // Auto-login with default demo officer profile for seamless first-click experience if wanted
        const defaultDemo = {
          _id: 'officer_cpwd_01',
          name: 'Sh. Rajesh Kumar',
          email: 'officer@cpwd.gov.in',
          organization: 'Central Public Works Department (CPWD)',
          role: 'Procurement Officer'
        };
        setUser(defaultDemo);
        localStorage.setItem('is_auth_user', JSON.stringify(defaultDemo));
        localStorage.setItem('is_auth_token', 'demo_active_token_2026');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    setUser(data);
    localStorage.setItem('is_auth_token', data.token);
    localStorage.setItem('is_auth_user', JSON.stringify(data));
    return data;
  };

  const register = async (userData) => {
    const data = await api.register(userData);
    setUser(data);
    localStorage.setItem('is_auth_token', data.token);
    localStorage.setItem('is_auth_user', JSON.stringify(data));
    return data;
  };

  const demoLogin = (role = 'Procurement Officer') => {
    const demo = {
      _id: 'demo_' + Date.now(),
      name: 'Sh. Rajesh Kumar',
      email: 'rajesh.kumar@gov.in',
      organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
      role
    };
    setUser(demo);
    localStorage.setItem('is_auth_token', 'demo_active_token_2026');
    localStorage.setItem('is_auth_user', JSON.stringify(demo));
    return demo;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('is_auth_token');
    localStorage.removeItem('is_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
