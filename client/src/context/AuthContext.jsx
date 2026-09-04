import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('is_auth_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch {}
    return null;
  });

  const [loading, setLoading] = useState(false);

  // Background token verification to keep session verified and fresh
  useEffect(() => {
    const verifyTokenInBackground = async () => {
      const token = localStorage.getItem('is_auth_token');
      if (token) {
        try {
          const freshUser = await api.getMe();
          if (freshUser) {
            setUser(freshUser);
            localStorage.setItem('is_auth_user', JSON.stringify(freshUser));
          }
        } catch (err) {
          // Token is invalid or expired
          console.warn('[AuthContext] Session expired or invalid token:', err.message);
          logout();
        }
      }
    };
    verifyTokenInBackground();
  }, []);

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = password || '';

    const data = await api.login({ email: cleanEmail, password: cleanPass });
    setUser(data);
    localStorage.setItem('is_auth_token', data.token);
    localStorage.setItem('is_auth_user', JSON.stringify(data));
    return data;
  };

  const register = async (userData) => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    const cleanName = (userData.name || '').trim();
    const cleanOrg = (userData.organizationName || userData.organization || '').trim();
    const cleanAccountType = userData.accountType || 'procurement_officer';

    const typeToRole = {
      'procurement_officer': 'Procurement Officer',
      'government_department': 'Government Department',
      'psu': 'PSU',
      'organization_admin': 'Organization/Admin'
    };

    const cleanRole = userData.role || typeToRole[cleanAccountType] || 'Procurement Officer';

    const normalizedData = {
      name: cleanName,
      email: cleanEmail,
      organizationName: cleanOrg,
      organization: cleanOrg,
      accountType: cleanAccountType,
      role: cleanRole,
      password: userData.password
    };

    const data = await api.register(normalizedData);
    setUser(data);
    localStorage.setItem('is_auth_token', data.token);
    localStorage.setItem('is_auth_user', JSON.stringify(data));
    return data;
  };

  const demoLogin = async (role = 'Procurement Officer') => {
    return await switchRole(role);
  };

  const switchRole = async (role) => {
    const demoCredentials = {
      'Procurement Officer': { email: 'demo.procurement@anveshak.demo', password: 'Demo@12345' },
      'Government Department': { email: 'demo.department@anveshak.demo', password: 'Demo@12345' },
      'PSU': { email: 'demo.psu@anveshak.demo', password: 'Demo@12345' },
      'Organization/Admin': { email: 'demo.admin@anveshak.demo', password: 'Demo@12345' }
    };

    const creds = demoCredentials[role] || demoCredentials['Procurement Officer'];
    const data = await api.login({ email: creds.email, password: creds.password });
    setUser(data);
    localStorage.setItem('is_auth_token', data.token);
    localStorage.setItem('is_auth_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('is_auth_token');
    localStorage.removeItem('is_auth_user');
    localStorage.removeItem('is_current_analysis');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, switchRole, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
