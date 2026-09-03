import React, { useState, useEffect } from 'react';
import {
  Users,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Building2,
  Mail,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { api } from '../services/api';
import { normalizeRole, ROLE_CONFIG, ROLE_KEYS } from '../config/roleConfig';
import { useAnalysis } from '../context/AnalysisContext';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  const { showToast } = useAnalysis();

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getAdminUsers();
      if (data && data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      setError(err.message || 'Failed to load platform users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      await api.updateAdminUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
      showToast(`User role updated to ${newRole}`, 'success');
    } catch (err) {
      showToast(`Failed to update role: ${err.message}`, 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.organization || '').toLowerCase().includes(search.toLowerCase());

    if (roleFilter === 'ALL') return matchesSearch;
    return matchesSearch && normalizeRole(u.role) === roleFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-700 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Platform Administration
            </span>
            <span className="text-xs text-slate-500 font-medium">User Directory & Governance</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Registered Platform Users
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit user organizations, manage designated stakeholder roles, and oversee platform access.
          </p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          icon={RefreshCw}
          loading={loading}
          onClick={loadUsers}
        >
          Refresh Directory
        </Button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name, official email, or ministry/organization..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-gov-500/20 focus:border-gov-500 bg-slate-50/50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 font-medium text-slate-700 cursor-pointer"
          >
            <option value="ALL">All Roles ({users.length})</option>
            <option value={ROLE_KEYS.PROCUREMENT_OFFICER}>Procurement Officer</option>
            <option value={ROLE_KEYS.GOVERNMENT_DEPARTMENT}>Government Department</option>
            <option value={ROLE_KEYS.PSU}>Public Sector Undertaking (PSU)</option>
            <option value={ROLE_KEYS.ADMIN}>Organization / Admin</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Users Table / Mobile Cards */}
      {loading ? (
        <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-gov-600 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Loading platform directory...</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">User Details</th>
                  <th className="py-3 px-4">Organization / Department</th>
                  <th className="py-3 px-4">Designated Role</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4 text-right">Access Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredUsers.map((u) => {
                  const roleKey = normalizeRole(u.role);
                  const roleConfig = ROLE_CONFIG[roleKey] || ROLE_CONFIG.procurement_officer;
                  const isUpdating = updatingId === u._id;

                  return (
                    <tr key={u._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gov-100 text-gov-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{u.name}</p>
                            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{u.email}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{u.organization || 'Government of India'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant={roleConfig.badgeVariant} size="xs">
                          {roleConfig.badgeTitle}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{new Date(u.createdAt || Date.now()).toLocaleDateString('en-IN')}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <select
                          disabled={isUpdating}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="text-[11px] p-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700 focus:ring-2 focus:ring-gov-500 cursor-pointer disabled:opacity-50"
                        >
                          <option value="Procurement Officer">Procurement Officer</option>
                          <option value="Government Department">Government Department</option>
                          <option value="PSU">PSU</option>
                          <option value="Organization/Admin">Organization/Admin</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List (<768px) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredUsers.map((u) => {
              const roleKey = normalizeRole(u.role);
              const roleConfig = ROLE_CONFIG[roleKey] || ROLE_CONFIG.procurement_officer;
              const isUpdating = updatingId === u._id;

              return (
                <div key={u._id} className="p-4 space-y-3 hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{u.name}</h3>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                    <Badge variant={roleConfig.badgeVariant} size="xs">
                      {roleConfig.badgeTitle}
                    </Badge>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{u.organization || 'Government of India'}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-400">
                      {new Date(u.createdAt || Date.now()).toLocaleDateString('en-IN')}
                    </span>
                    <select
                      disabled={isUpdating}
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="text-[11px] p-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700"
                    >
                      <option value="Procurement Officer">Procurement Officer</option>
                      <option value="Government Department">Government Department</option>
                      <option value="PSU">PSU</option>
                      <option value="Organization/Admin">Admin</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="py-14 text-center bg-white rounded-2xl border border-slate-200 space-y-3 p-6">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Users Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No platform accounts match the specified criteria "{search}".
          </p>
          <Button size="sm" variant="secondary" onClick={() => { setSearch(''); setRoleFilter('ALL'); }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
