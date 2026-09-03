import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Database,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { api } from '../services/api';

export const AdminDemoManagementPage = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const res = await api.resetAdminDemoData();
      setResetMessage(res.message || 'Demo dataset successfully restored to deterministic baseline.');
      setIsResetModalOpen(false);
      setTimeout(() => setResetMessage(''), 8000);
    } catch (err) {
      alert('Reset failed: ' + err.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gov-600 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
              Demo Environment Governance
            </span>
            <span className="text-xs text-slate-500 font-medium">Deterministic Evaluation Sandbox</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">
            Demo Data Management & Reset
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Safe demo state management, deterministic dataset inspection, and one-click baseline restoration for SIH 2026.
          </p>
        </div>

        <Button
          size="sm"
          variant="danger"
          icon={RotateCcw}
          onClick={() => setIsResetModalOpen(true)}
        >
          Reset Demo Data
        </Button>
      </div>

      {resetMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{resetMessage}</span>
        </div>
      )}

      {/* Isolation Guarantee Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-blue-900">
          <h3 className="font-bold text-sm text-blue-950">Enterprise Data Isolation Guarantee</h3>
          <p className="text-blue-800 leading-relaxed">
            Anveshak enforces strict database segregation between seeded hackathon evaluation records (<code className="bg-blue-100 px-1 py-0.5 rounded font-mono">isDemo: true</code>) and real authenticated user accounts. Running a demo reset operates purely on deterministic demo keys, leaving all registered production users, custom tenders, and issued reports 100% untouched.
          </p>
        </div>
      </div>

      {/* Demo Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demo Personas</span>
            <Users className="w-4 h-4 text-gov-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">15 Users</div>
          <p className="text-[11px] text-slate-500">
            5 Procurement Officers, 4 Govt Depts, 4 PSUs, 2 Administrators with distinct organization types.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Seeded Analyses</span>
            <FileText className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">42 Analyses</div>
          <p className="text-[11px] text-slate-500">
            Comprehensive tenders across electrical, solar, civil, steel, water supply, and heavy industrial machinery.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Standards Corpus</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">23+ Standards</div>
          <p className="text-[11px] text-slate-500">
            Verified Indian Standards, Gazetted QCOs, testing protocols, and version amendment dependencies.
          </p>
        </div>
      </div>

      {/* Persona Seed Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-outfit">
          Configured SIH Evaluation Personas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <Badge variant="primary" size="xs">Procurement Officer</Badge>
            <div className="font-bold text-slate-900">procurement.demo1-5</div>
            <div className="text-[11px] text-slate-500">Rajesh Kumar (CPWD), Manoj Joshi, Ramesh Chander</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <Badge variant="secondary" size="xs">Government Department</Badge>
            <div className="font-bold text-slate-900">government.demo1-4</div>
            <div className="text-[11px] text-slate-500">Priya Sharma (Public Works), Sunita Rao (MNRE), NHAI</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <Badge variant="warning" size="xs">PSU Executive</Badge>
            <div className="font-bold text-slate-900">psu.demo1-4</div>
            <div className="text-[11px] text-slate-500">Amit Verma (NTPC-NEIC), Dr. Sen (BHEL), Petroleum</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <Badge variant="mandate" size="xs">Platform Admin</Badge>
            <div className="font-bold text-slate-900">admin.demo1-2</div>
            <div className="text-[11px] text-slate-500">Lead Admin, BIS Standards Compliance Auditor</div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirm Deterministic Demo Data Reset"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs text-slate-600">
          <p>
            Are you sure you want to reset the demonstration environment?
          </p>
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 space-y-1">
            <p className="font-bold">What will happen:</p>
            <ul className="list-disc list-inside space-y-0.5 text-amber-800">
              <li>Re-seeds 42 deterministic evaluation analyses</li>
              <li>Restores 15 evaluation persona accounts</li>
              <li>Resets the pending revision queue (`IS 1234:2026`)</li>
              <li>Preserves all non-demo user registrations</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsResetModalOpen(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleReset}
              disabled={isResetting}
            >
              {isResetting ? 'Resetting...' : 'Yes, Reset Demo Data'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
