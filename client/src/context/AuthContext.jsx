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

  const switchRole = async (roleOrPersona) => {
    let email = 'procurement@anveshak.demo';
    const password = 'Demo@12345';

    if (roleOrPersona && typeof roleOrPersona === 'object') {
      email = roleOrPersona.email || email;
    } else {
      const r = String(roleOrPersona || '').toLowerCase().trim();
      if (r.includes('admin') || r.includes('directorate') || r === 'organization_admin') {
        email = 'admin@anveshak.demo';
      } else if (r.includes('psu') || r.includes('energy') || r.includes('ntpc')) {
        email = 'psu@anveshak.demo';
      } else if (r.includes('dept') || r.includes('department') || r.includes('mohua') || r.includes('public works')) {
        email = 'department@anveshak.demo';
      } else {
        email = 'procurement@anveshak.demo';
      }
    }

    setLoading(true);
    try {
      const data = await api.login({ email, password });
      setUser(data);
      localStorage.setItem('is_auth_token', data.token);
      localStorage.setItem('is_auth_user', JSON.stringify(data));
      return data;
    } finally {
      setLoading(false);
    }
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
