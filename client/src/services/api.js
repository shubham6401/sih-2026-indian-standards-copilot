const API_BASE = '/api';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('is_auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  login: async (credentials) => {
    const payload = {
      email: (credentials.email || '').trim().toLowerCase(),
      password: credentials.password || ''
    };
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  register: async (userData) => {
    const orgValue = (userData.organizationName || userData.organization || '').trim();
    const payload = {
      name: (userData.name || '').trim(),
      email: (userData.email || '').trim().toLowerCase(),
      organizationName: orgValue,
      organization: orgValue,
      accountType: userData.accountType || 'procurement_officer',
      role: userData.role || 'Procurement Officer',
      password: userData.password || ''
    };
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return null;
    return await res.json();
  },

  // Analysis
  createAnalysis: async (payload) => {
    const res = await fetch(`${API_BASE}/analysis`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Analysis failed');
    return data;
  },

  getAnalyses: async () => {
    const res = await fetch(`${API_BASE}/analysis`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch analysis history');
    return data;
  },

  getAnalysisById: async (id) => {
    const res = await fetch(`${API_BASE}/analysis/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load analysis report');
    return data;
  },

  deleteAnalysis: async (id) => {
    const res = await fetch(`${API_BASE}/analysis/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete analysis');
    return data;
  },

  // Documents
  uploadTenderPdf: async (formData) => {
    const token = localStorage.getItem('is_auth_token');
    const res = await fetch(`${API_BASE}/documents/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to upload and analyze document');
    return data;
  },

  // Standards Explorer & Transparency
  searchStandards: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/standards/search?${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to search standards');
    return data;
  },

  getStandardById: async (id) => {
    const res = await fetch(`${API_BASE}/standards/${encodeURIComponent(id)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load standard details');
    return data;
  },

  getFilterFacets: async () => {
    const res = await fetch(`${API_BASE}/standards/filters`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load filters');
    return data;
  },

  getKnowledgeBaseStats: async () => {
    const res = await fetch(`${API_BASE}/standards/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load knowledge base stats');
    return data;
  },

  // Saved Standards
  saveStandard: async (payload) => {
    const res = await fetch(`${API_BASE}/saved-standards`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save standard');
    return data;
  },

  getSavedStandards: async () => {
    const res = await fetch(`${API_BASE}/saved-standards`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch saved standards');
    return data;
  },

  removeSavedStandard: async (id) => {
    const res = await fetch(`${API_BASE}/saved-standards/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to remove saved standard');
    return data;
  },

  // Reports
  getReportData: async (id) => {
    const res = await fetch(`${API_BASE}/reports/${id}`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch report');
    return data;
  },

  deleteReport: async (id) => {
    const res = await fetch(`${API_BASE}/reports/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete report');
    return data;
  },

  // Admin Platform Operations
  getAdminUsers: async () => {
    const res = await fetch(`${API_BASE}/admin/users`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load platform users');
    return data;
  },

  getAdminStats: async () => {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load platform stats');
    return data;
  },

  getAdminActivity: async () => {
    const res = await fetch(`${API_BASE}/admin/activity`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load system activity');
    return data;
  },

  updateAdminUserRole: async (id, role) => {
    const res = await fetch(`${API_BASE}/admin/users/${id}/role`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user role');
    return data;
  },

  getAdminStandards: async () => {
    const res = await fetch(`${API_BASE}/admin/standards`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load standards registry');
    return data;
  },

  syncAdminStandards: async () => {
    const res = await fetch(`${API_BASE}/admin/standards/sync`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to synchronize standards');
    return data;
  },

  approveStandardRevision: async (id) => {
    const res = await fetch(`${API_BASE}/admin/standards/${id}/approve`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to approve standard revision');
    return data;
  },

  getAdminAuditLogs: async () => {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load audit logs');
    return data;
  },

  resetAdminDemoData: async () => {
    const res = await fetch(`${API_BASE}/admin/demo/reset`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to reset demo data');
    return data;
  }
};
