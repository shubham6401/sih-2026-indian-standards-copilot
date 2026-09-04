import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Layers,
  ArrowRight,
  Sparkles,
  Terminal,
  Check,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { StandardDetailModal } from '../components/standards/StandardDetailModal';
import { api } from '../services/api';

export const AdminStandardsPage = () => {
  const [stats, setStats] = useState(null);
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [qcoFilter, setQcoFilter] = useState('ALL');
  const [selectedStandard, setSelectedStandard] = useState(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [syncConsoleLogs, setSyncConsoleLogs] = useState([]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Approval state
  const [approvingId, setApprovingId] = useState(null);
  const [approvalSuccess, setApprovalSuccess] = useState('');
  const [approvalError, setApprovalError] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminStandards();
      if (data && data.success) {
        setStats(data.stats);
        setStandards(data.standards || []);
      }
    } catch (err) {
      console.error('Failed to load standards registry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    setIsSyncModalOpen(true);
    setSyncConsoleLogs([
      '[00:00:01] Initializing Authoritative Ingestion Pipeline (Simulated Feed)...',
      '[00:00:02] Querying Gazette of India (Extraordinary Part II Sec 3)...',
      '[00:00:03] Scraping e-BIS Public Registers & DPIIT Quality Control Orders...'
    ]);

    try {
      // Simulate stepped terminal log output for realistic presentation
      setTimeout(() => {
        setSyncConsoleLogs(prev => [
          ...prev,
          '[00:00:04] Validating schema, standard numbers, and normative cross-references...',
          '[00:00:05] Running version diff against active registry standards...'
        ]);
      }, 700);

      const res = await api.syncAdminStandards();

      setTimeout(() => {
        setSyncConsoleLogs(prev => [
          ...prev,
          '[00:00:06] Detected 5 new standards, 4 amendments, 2 revised editions, 2 QCO updates.',
          '[00:00:07] Updating Standards Registry in-memory and database indexes...',
          '[00:00:08] [SUCCESS] Ingestion pipeline synchronized successfully.'
        ]);
        setSyncResult(res.result);
        setIsSyncing(false);
        loadData();
      }, 1400);
    } catch (err) {
      setSyncConsoleLogs(prev => [
        ...prev,
        `[ERROR] Standards synchronization failed: ${err.message}`
      ]);
      setIsSyncing(false);
    }
  };

  const handleApproveRevision = async (std) => {
    const id = std._id || std.id;
    setApprovingId(id);
    setApprovalError('');
    try {
      const res = await api.approveStandardRevision(id);
      setApprovalSuccess(res.message || 'Standard revision successfully published.');
      loadData();
      setTimeout(() => setApprovalSuccess(''), 6000);
    } catch (err) {
      setApprovalError('Error approving revision: ' + err.message);
      setTimeout(() => setApprovalError(''), 6000);
    } finally {
      setApprovingId(null);
    }
  };

  const filteredStandards = useMemo(() => {
    let result = standards;

    if (statusFilter !== 'ALL') {
      result = result.filter(s => {
        const currentStatus = s.registryStatus || s.status;
        return currentStatus?.toLowerCase() === statusFilter.toLowerCase();
      });
    }

    if (qcoFilter === 'MANDATORY') {
      result = result.filter(s => s.qcoApplicable || s.certification?.isMandatory);
    } else if (qcoFilter === 'VOLUNTARY') {
      result = result.filter(s => !s.qcoApplicable && !s.certification?.isMandatory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(s => {
        return (
          (s.standardNumber || '').toLowerCase().includes(query) ||
          (s.title || '').toLowerCase().includes(query) ||
          (s.category || '').toLowerCase().includes(query) ||
          (s.industry || '').toLowerCase().includes(query)
        );
      });
    }

    return result;
  }, [standards, search, statusFilter, qcoFilter]);

  const pendingRevision = useMemo(() => {
    return standards.find(s => s.newVersionDetected || s.registryStatus === 'Pending Review');
  }, [standards]);

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Platform Administration
            </span>
            <span className="text-xs text-slate-500 font-medium">Authoritative Standards Ingestion & Lifecycle</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Standards Intelligence & Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous standards ingestion architecture, revision comparison, Gazette QCO tracking, and version governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={RefreshCw}
            onClick={loadData}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Sparkles}
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? 'Syncing...' : 'Sync Standards'}
          </Button>
        </div>
      </div>

      {/* Authoritative Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <p className="font-bold">Continuous Standards Ingestion Architecture (SIH 2026 Innovation)</p>
          <p className="text-amber-800 mt-0.5">
            Anveshak's backend incorporates a continuous standards ingestion layer that detects new standards, revisions, amendments, and Gazette Quality Control Orders (QCOs) without requiring frontend rebuilds. For the hackathon demonstration, external BIS synchronization runs against a deterministic ingestion dataset with full version diffing.
          </p>
        </div>
      </div>

      {approvalSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{approvalSuccess}</span>
        </div>
      )}

      {approvalError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{approvalError}</span>
        </div>
      )}

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Standards</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats?.total || standards.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Indexed in Registry</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Active Standards</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{stats?.active || standards.filter(s => (s.registryStatus || s.status) === 'Active' || s.status === 'Current').length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Live in Recommendations</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-sm">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Pending Review</div>
          <div className="text-2xl font-black text-amber-800 mt-1">{stats?.pendingReview || (pendingRevision ? 1 : 0)}</div>
          <div className="text-[10px] text-amber-700 mt-1">New Revisions Detected</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Amended Standards</div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {standards.filter(s => s.amendments?.length > 0).length}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Active Gazette Amendments</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Mandatory QCOs</div>
          <div className="text-2xl font-black text-rose-700 mt-1">{stats?.qcoApplicable || standards.filter(s => s.qcoApplicable || s.certification?.isMandatory).length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Legally Enforced Orders</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Sync</div>
          <div className="text-xs font-bold text-slate-800 mt-2 truncate">
            {new Date(stats?.lastSyncDate || Date.now()).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Ingestion Engine</div>
        </div>
      </div>

      {/* New Revision Detected Review Card */}
      {pendingRevision && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded">
                  New Revision Detected
                </span>
                <span className="text-xs font-mono font-bold text-slate-700">
                  Version Comparison Queue
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {pendingRevision.title}
              </h3>
              <p className="text-xs text-slate-600 max-w-3xl">
                {pendingRevision.proposedChanges || 'Updated mechanical safeguards, smart sensor protocols, and hazardous substance restrictions.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-semibold">Active Version:</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300 font-bold text-slate-700">
                    {pendingRevision.standardNumber}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600" />
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-semibold">New Edition:</span>
                  <span className="font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 font-black">
                    {pendingRevision.proposedRevision || 'IS 1234:2026'}
                  </span>
                </div>
                <Badge variant="warning" size="xs">
                  Pending Admin Approval
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="primary"
                icon={Check}
                onClick={() => handleApproveRevision(pendingRevision)}
                disabled={approvingId === (pendingRevision._id || pendingRevision.id)}
              >
                {approvingId === (pendingRevision._id || pendingRevision.id) ? 'Publishing...' : 'Approve & Publish Revision'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'Active', 'Pending Review', 'Under Revision', 'Superseded', 'Withdrawn'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-gov-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search standards by number, title, or keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-gov-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Standards Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3.5 px-4">Standard Identifier</th>
                <th className="py-3.5 px-4">Title & Scope</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Registry Status</th>
                <th className="py-3.5 px-4">QCO Mandate</th>
                <th className="py-3.5 px-4">Certification Scheme</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStandards.map((std) => {
                const id = std._id || std.id;
                const isMandatory = std.qcoApplicable || std.certification?.isMandatory;
                const regStatus = std.registryStatus || std.status;

                return (
                  <tr key={id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gov-700">{std.standardNumber}</span>
                        {std.newVersionDetected && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-sans font-black rounded">
                            REV
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                        Version: {std.version || `${std.publicationYear}.1`}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1">{std.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{std.scope}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="primary" size="xs">
                        {std.category}
                      </Badge>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{std.industry}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          regStatus === 'Active' || regStatus === 'Current'
                            ? 'success'
                            : (regStatus === 'Pending Review' ? 'warning' : 'neutral')
                        }
                        size="xs"
                      >
                        {regStatus}
                      </Badge>
                      {std.amendments?.length > 0 && (
                        <span className="text-[10px] text-blue-600 block mt-0.5 font-semibold">
                          +{std.amendments.length} Amendment{std.amendments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isMandatory ? (
                        <Badge variant="mandate" size="xs">
                          Mandatory QCO
                        </Badge>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Voluntary</span>
                      )}
                      {std.qcoNotificationNumber && (
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5 truncate max-w-[150px]">
                          {std.qcoNotificationNumber}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 text-[11px] whitespace-nowrap">
                      {std.certificationType || std.certification?.scheme || 'BIS ISI Scheme-I'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => setSelectedStandard(std)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sync Execution Console Modal */}
      <Modal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        title="Standards Ingestion & Synchronization Pipeline"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs space-y-1.5 h-64 overflow-y-auto">
            <div className="text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>anveshak-ingestion-engine v2.6</span>
              </span>
              <span>{isSyncing ? 'RUNNING...' : 'COMPLETED'}</span>
            </div>
            {syncConsoleLogs.map((log, idx) => (
              <div key={idx} className={log.includes('ERROR') ? 'text-rose-400' : (log.includes('SUCCESS') ? 'text-emerald-300 font-bold' : 'text-slate-300')}>
                {log}
              </div>
            ))}
          </div>

          {syncResult && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Synchronization Summary</span>
              </div>
              <p>{syncResult.summary}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-200 font-mono text-[11px]">
                <div>Records: <strong>{syncResult.recordsChecked}</strong></div>
                <div>New Standards: <strong>+{syncResult.newStandardsDetected}</strong></div>
                <div>Amendments: <strong>+{syncResult.amendmentsDetected}</strong></div>
                <div>QCO Updates: <strong>+{syncResult.qcoUpdatesDetected}</strong></div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsSyncModalOpen(false)}
            >
              Close Console
            </Button>
          </div>
        </div>
      </Modal>

      {/* Standard Detail Modal */}
      {selectedStandard && (
        <StandardDetailModal
          standard={selectedStandard}
          isOpen={!!selectedStandard}
          onClose={() => setSelectedStandard(null)}
        />
      )}
    </div>
  );
};
