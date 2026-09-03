import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Filter,
  RefreshCw,
  Clock,
  User,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { api } from '../services/api';

export const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminAuditLogs();
      if (data && data.success) {
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    let result = logs;

    if (roleFilter !== 'ALL') {
      result = result.filter(l => l.userRole?.toLowerCase().includes(roleFilter.toLowerCase()));
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(l => l.status?.toLowerCase() === statusFilter.toLowerCase());
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(l => {
        return (
          (l.userName || '').toLowerCase().includes(query) ||
          (l.action || '').toLowerCase().includes(query) ||
          (l.resource || '').toLowerCase().includes(query) ||
          (l.organization || '').toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [logs, search, roleFilter, statusFilter]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'User', 'Role', 'Organization', 'Action', 'Resource', 'Status', 'IP'];
    const rows = filteredLogs.map(l => [
      l.id,
      l.timestamp,
      `"${l.userName}"`,
      `"${l.userRole}"`,
      `"${l.organization}"`,
      `"${l.action}"`,
      `"${l.resource}"`,
      l.status,
      l.ipAddress
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `anveshak_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Governance & Compliance
            </span>
            <span className="text-xs text-slate-500 font-medium">Enterprise Security & Activity Auditing</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            System Audit Trail & Activity Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable chronological log of procurement analyses, standards syncs, role modifications, and dossier exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={RefreshCw}
            onClick={loadLogs}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Download}
            onClick={handleExportCSV}
            disabled={filteredLogs.length === 0}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'Procurement', 'Department', 'PSU', 'Admin'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                roleFilter === r
                  ? 'bg-gov-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {r === 'ALL' ? 'All Roles' : r}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by user, action, or resource..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">User & Role</th>
                <th className="py-3.5 px-4">Organization</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Resource / Scope</th>
                <th className="py-3.5 px-4">Channel / IP</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.userName}</div>
                    <span className="text-[10px] text-gov-600 font-semibold">{log.userRole}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {log.organization}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-sm">
                    <span className="line-clamp-1">{log.resource}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                    {log.ipAddress}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge
                      variant={log.status === 'Success' ? 'success' : (log.status === 'Warning' ? 'warning' : 'neutral')}
                      size="xs"
                    >
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
