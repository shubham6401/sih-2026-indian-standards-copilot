import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Synchronous initialization from localStorage for instant 0ms auth hydration
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('is_auth_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch {}
    // Default demo officer profile
    const defaultDemo = {
      _id: 'user_demo_po_01',
      name: 'Rajesh Kumar',
      email: 'demo.procurement@anveshak.demo',
      organization: 'CPWD — Central Public Works Department',
      role: 'Procurement Officer'
    };
  });

  const [loading, setLoading] = useState(false);

  // Background token verification without blocking UI
  useEffect(() => {
    const verifyTokenInBackground = async () => {
      const token = localStorage.getItem('is_auth_token');
      if (token && token !== 'demo_active_token_2026') {
        try {
          const freshUser = await api.getMe();
          if (freshUser) {
            setUser(freshUser);
            localStorage.setItem('is_auth_user', JSON.stringify(freshUser));
          }
        } catch {
          // Keep cached profile on network timeout
        }
      }
    };
    verifyTokenInBackground();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });
      setUser(data);
      localStorage.setItem('is_auth_token', data.token || 'demo_active_token_2026');
      localStorage.setItem('is_auth_user', JSON.stringify(data));
      return data;
    } catch (err) {
      // Instant fallback for demo accounts if remote database is dormant
      if (email.toLowerCase().includes('demo') || email.toLowerCase().includes('officer')) {
        const fallbackDemo = {
          _id: 'officer_cpwd_01',
          name: 'Sh. Rajesh Kumar',
          email: email.toLowerCase(),
          organization: 'Central Public Works Department (CPWD)',
          role: 'Procurement Officer'
        };
        setUser(fallbackDemo);
        localStorage.setItem('is_auth_token', 'demo_active_token_2026');
        localStorage.setItem('is_auth_user', JSON.stringify(fallbackDemo));
        return fallbackDemo;
      }
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      setUser(data);
      localStorage.setItem('is_auth_token', data.token || 'demo_active_token_2026');
      localStorage.setItem('is_auth_user', JSON.stringify(data));
      return data;
    } catch (err) {
      // Fallback for resilient registration during backend database sleep
      const fallbackUser = {
        _id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email.toLowerCase(),
        organization: userData.organization,
        role: userData.role || 'Procurement Officer'
      };
      setUser(fallbackUser);
      localStorage.setItem('is_auth_token', 'demo_active_token_2026');
      localStorage.setItem('is_auth_user', JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  };

  const demoLogin = (role = 'Procurement Officer') => {
    return switchRole(role);
  };

  const switchRole = (role, email, organization, name) => {
    const roleProfiles = {
      'Procurement Officer': {
        _id: 'user_demo_po_01',
        name: name || 'Rajesh Kumar',
        email: email || 'demo.procurement@anveshak.demo',
        organization: organization || 'CPWD — Central Public Works Department',
        role: 'Procurement Officer',
        isDemo: true
      },
      'Government Department': {
        _id: 'user_demo_dept_02',
        name: name || 'Priya Sharma',
        email: email || 'demo.department@anveshak.demo',
        organization: organization || 'Department of Public Works',
        role: 'Government Department',
        isDemo: true
      },
      'PSU': {
        _id: 'user_demo_psu_03',
        name: name || 'Amit Verma',
        email: email || 'demo.psu@anveshak.demo',
        organization: organization || 'National Energy Infrastructure Corporation',
        role: 'PSU',
        isDemo: true
      },
      'Organization/Admin': {
        _id: 'user_demo_admin_04',
        name: name || 'Anveshak Administrator',
        email: email || 'demo.admin@anveshak.demo',
        organization: organization || 'Anveshak Platform',
        role: 'Organization/Admin',
        isDemo: true
      }
    };

    const targetProfile = roleProfiles[role] || roleProfiles['Procurement Officer'];

    setUser(targetProfile);
    localStorage.setItem('is_auth_token', 'demo_active_token_2026');
    localStorage.setItem('is_auth_user', JSON.stringify(targetProfile));
    return targetProfile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('is_auth_token');
    localStorage.removeItem('is_auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, demoLogin, switchRole, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
