import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const AnalysisContext = createContext();

const getHistoryKey = (userId) => `is_analysis_history_${userId || 'anonymous'}`;
const getSavedKey = (userId) => `is_saved_standards_${userId || 'anonymous'}`;

// Reference starter history items for demo accounts
export const INITIAL_DEMO_HISTORY = [
  {
    _id: 'po_analysis_01',
    demoKey: 'po_analysis_01',
    productName: '100W Outdoor LED Street Light',
    productCategory: 'LED Lighting',
    rawInput: '100W outdoor LED street lights for municipal roads with IP66 waterproof housing, energy efficacy above 120 lm/W and surge protection up to 10kV.',
    inputType: 'specification',
    confidenceScore: 92,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 10322 (Part 5/Sec 3): 2012', title: 'Luminaires for Road and Street Lighting', relevanceScore: 94, edition: '3rd Revision', status: 'Current' },
      { standardNumber: 'IS 15885 (Part 2/Sec 13): 2012', title: 'Safety of Lamp Controlgear - LED Drivers', relevanceScore: 89, edition: '1st Revision', status: 'Current' }
    ],
    relatedStandards: [
      { standardNumber: 'IS 16107 (Part 2/Sec 1): 2012', title: 'LED Luminaire Performance', relationshipType: 'Testing Standard', relevanceScore: 88 }
    ],
    tenderGaps: [
      { category: 'Testing & Verification Gap', severity: 'HIGH', title: 'No Explicit Test Method Cited', description: 'Missing laboratory type test report clause.', remedy: 'Include IS 16107 testing.' }
    ],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 10322 (Part 5/Sec 3) & IS 15885 (Part 2/Sec 13)',
        authority: 'Ministry of Electronics & Information Technology (MeitY)',
        mandateReason: 'Covered under Electronics and IT Goods (Requirement for Compulsory Registration) Order. Mandatory for all LED luminaires and controlgear.',
        verificationNote: 'Verify valid MeitY CRS R-Number on the official BIS CRS portal.'
      },
      {
        type: 'BEE Star Labeling Energy Rating',
        status: 'Applicable',
        standardNumber: 'IS 16107 (Part 2/Sec 1)',
        authority: 'Bureau of Energy Efficiency (BEE), Ministry of Power',
        mandateReason: 'Mandatory energy efficiency star rating label under the Energy Conservation Act.',
        verificationNote: 'Check valid BEE Star rating certificate on the BEE online portal.'
      }
    ],
    procurementReadiness: { totalScore: 78, statusLabel: 'Readiness Evaluated', actionCount: 2 },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'po_analysis_24',
    demoKey: 'po_analysis_24',
    productName: '5 HP Solar Submersible Water Pump Set',
    productCategory: 'Water Pumps & Motors',
    rawInput: '5 HP (3.7 kW) Solar Submersible Water Pump Set with 100m total head, stainless steel impeller, and MPPT inverter.',
    inputType: 'specification',
    confidenceScore: 95,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 8034: 2018', title: 'Submersible Pumpsets - Specification', relevanceScore: 95, edition: '3rd Revision', status: 'Current' },
      { standardNumber: 'IS 8472: 2019', title: 'Pumps - Centrifugal Pumps for Clear Water', relevanceScore: 90, edition: '3rd Revision', status: 'Current' }
    ],
    relatedStandards: [
      { standardNumber: 'IS 14286: 2010', title: 'Crystalline Silicon Terrestrial PV Modules', relationshipType: 'Testing Standard', relevanceScore: 88 }
    ],
    tenderGaps: [
      { category: 'Installation & Workmanship Gap', severity: 'LOW', title: 'Installation Code of Practice Not Referenced', description: 'Tender does not tie contractor workmanship to published Indian Standard Codes of Practice.', remedy: 'Reference IS 9694 (Part 2).' }
    ],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 8034: 2018',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Covered under mandatory Submersible Pumps (Quality Control) Order. Procuring authority must ensure active BIS License.',
        verificationNote: 'Verify valid 7-digit CML Number on official e-BIS portal (manakonline.in).'
      },
      {
        type: 'BEE Star Labeling Energy Rating (Minimum 5-Star)',
        status: 'Applicable',
        standardNumber: 'Energy Conservation Act, 2001',
        authority: 'Bureau of Energy Efficiency (BEE)',
        mandateReason: 'Mandatory energy efficiency star rating label for agricultural water pumpsets.',
        verificationNote: 'Check active BEE star certificate in the BEE portal.'
      }
    ],
    procurementReadiness: { totalScore: 92, statusLabel: 'Tender Ready (High Quality)', actionCount: 1 },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'po_analysis_04',
    demoKey: 'po_analysis_04',
    productName: 'Ordinary Portland Cement (53 Grade)',
    productCategory: 'Cement & Building Materials',
    rawInput: '53 Grade Ordinary Portland Cement for high-load bridge pier construction requiring 53 MPa 28-day compressive strength.',
    inputType: 'specification',
    confidenceScore: 89,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 269: 2015', title: 'Ordinary Portland Cement - Specification', relevanceScore: 96, edition: '6th Revision', status: 'Current' }
    ],
    relatedStandards: [
      { standardNumber: 'IS 4031 (Part 6): 1988', title: 'Methods of Physical Tests for Hydraulic Cement', relationshipType: 'Testing Standard', relevanceScore: 89 }
    ],
    tenderGaps: [
      { category: 'Outdated Reference', severity: 'HIGH', title: 'Superseded Standard Cited', description: 'IS 12269 is superseded by IS 269:2015.', remedy: 'Revise reference to IS 269:2015.' }
    ],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 269: 2015',
        authority: 'DPIIT, Ministry of Commerce & Industry',
        mandateReason: 'Statutory Cement (Quality Control) Order requires mandatory BIS ISI certification.',
        verificationNote: 'Verify ISI mark and license validity on manakonline.in.'
      }
    ],
    procurementReadiness: { totalScore: 85, statusLabel: 'Tender Ready', actionCount: 1 },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'po_analysis_14',
    demoKey: 'po_analysis_14',
    productName: 'Industrial Safety Helmets (Non-Metallic)',
    productCategory: 'PPE & Safety Equipment',
    rawInput: 'High-density polyethylene non-metallic industrial safety helmets for construction sites with chin strap and shock absorption.',
    inputType: 'specification',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 2925: 1984', title: 'Specification for Industrial Safety Helmets', relevanceScore: 95, edition: '2nd Revision', status: 'Current' }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 2925: 1984',
        authority: 'DPIIT, Ministry of Commerce & Industry',
        mandateReason: 'Covered under mandatory Personal Protective Equipment (Quality Control) Order. Industrial safety helmets must carry standard ISI mark.',
        verificationNote: 'Verify active CML License on official BIS portal.'
      }
    ],
    procurementReadiness: { totalScore: 92, statusLabel: 'Tender Ready', actionCount: 0 },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
];

export const AnalysisProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id ? String(user._id) : null;
  const isDemo = Boolean(user?.isDemo);

  const [currentAnalysis, setCurrentAnalysisState] = useState(null);
  const [history, setHistory] = useState([]);
  const [savedStandards, setSavedStandards] = useState([]);
  const [savedStandardNumbers, setSavedStandardNumbers] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const resetAnalysisState = () => {
    setCurrentAnalysisState(null);
    setHistory([]);
    setSavedStandards([]);
    setSavedStandardNumbers(new Set());
    try {
      localStorage.removeItem('is_current_analysis');
    } catch (e) {}
  };

  const setCurrentAnalysis = (analysis) => {
    if (!analysis) {
      setCurrentAnalysisState(null);
      try {
        localStorage.removeItem('is_current_analysis');
      } catch (e) {}
      return;
    }

    setCurrentAnalysisState(analysis);
    try {
      localStorage.setItem('is_current_analysis', JSON.stringify(analysis));
    } catch (e) {}

    // Add / Prepend to history
    setHistory(prev => {
      const filtered = prev.filter(item => String(item._id || item.id) !== String(analysis._id || analysis.id));
      const updated = [analysis, ...filtered];
      if (userId) {
        try {
          localStorage.setItem(getHistoryKey(userId), JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });
  };

  const loadHistory = async (force = false) => {
    if (!userId && !isDemo) {
      setHistory([]);
      return;
    }

    try {
      let remoteItems = [];
      try {
        remoteItems = await api.getAnalyses();
      } catch (e) {
        console.warn('[AnalysisContext] Failed to fetch analyses from backend:', e.message);
      }

      const idMap = new Map();
      (remoteItems || []).forEach(item => {
        if (item && (item._id || item.id)) {
          idMap.set(String(item._id || item.id), item);
        }
      });

      const merged = Array.from(idMap.values()).sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setHistory(merged);
      if (userId) {
        try {
          localStorage.setItem(getHistoryKey(userId), JSON.stringify(merged));
        } catch (e) {}
      }
    } catch (e) {
      console.warn('Failed to load history:', e.message);
    }
  };

  const loadSaved = async () => {
    if (!userId && !isDemo) {
      setSavedStandards([]);
      setSavedStandardNumbers(new Set());
      return;
    }

    try {
      let remoteSaved = [];
      try {
        remoteSaved = await api.getSavedStandards();
      } catch (e) {}

      const numMap = new Map();
      (remoteSaved || []).forEach(s => {
        if (s && s.standardNumber) numMap.set(s.standardNumber, s);
      });

      const merged = Array.from(numMap.values());
      setSavedStandards(merged);
      setSavedStandardNumbers(new Set(merged.map(s => s.standardNumber)));
      if (userId) {
        try {
          localStorage.setItem(getSavedKey(userId), JSON.stringify(merged));
        } catch (e) {}
      }
    } catch (e) {
      console.warn('Failed to load saved standards:', e.message);
    }
  };

  // Synchronize when authenticated user changes or logs out
  useEffect(() => {
    resetAnalysisState();

    if (user && userId) {
      // 1. Try loading cached user history from user-scoped key
      try {
        const cachedHistory = localStorage.getItem(getHistoryKey(userId));
        if (cachedHistory) {
          const parsed = JSON.parse(cachedHistory);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHistory(parsed);
          }
        }

        const cachedSaved = localStorage.getItem(getSavedKey(userId));
        if (cachedSaved) {
          const parsedSaved = JSON.parse(cachedSaved);
          if (Array.isArray(parsedSaved)) {
            setSavedStandards(parsedSaved);
            setSavedStandardNumbers(new Set(parsedSaved.map(s => s.standardNumber)));
          }
        }
      } catch (e) {}

      // 2. Fetch fresh user records from backend
      loadHistory(true);
      loadSaved();
    }
  }, [userId]);

  const toggleSaveStandard = async (standard) => {
    const stdNum = standard.standardNumber || standard;
    if (savedStandardNumbers.has(stdNum)) {
      // Remove
      setSavedStandards(prev => {
        const next = prev.filter(s => s.standardNumber !== stdNum);
        if (userId) {
          try {
            localStorage.setItem(getSavedKey(userId), JSON.stringify(next));
          } catch (e) {}
        }
        return next;
      });
      setSavedStandardNumbers(prev => {
        const next = new Set(prev);
        next.delete(stdNum);
        return next;
      });
      try {
        const item = savedStandards.find(s => s.standardNumber === stdNum);
        if (item?._id) await api.removeSavedStandard(item._id);
      } catch (e) {}
      showToast(`Standard ${stdNum} removed from bookmarks.`, 'info');
    } else {
      // Save
      const newRecord = {
        _id: 'saved_' + Date.now(),
        standardNumber: stdNum,
        title: standard.title || stdNum,
        category: standard.category || 'Standards',
        notes: `Added from ${currentAnalysis?.productName || 'Analysis'}`,
        tags: ['Procurement Baseline', standard.category || 'Standards'],
        savedAt: new Date().toISOString()
      };

      setSavedStandards(prev => {
        const next = [newRecord, ...prev];
        if (userId) {
          try {
            localStorage.setItem(getSavedKey(userId), JSON.stringify(next));
          } catch (e) {}
        }
        return next;
      });
      setSavedStandardNumbers(prev => new Set([...prev, stdNum]));
      try {
        await api.saveStandard({
          standardNumber: stdNum,
          notes: newRecord.notes,
          tags: newRecord.tags
        });
      } catch (e) {}
      showToast(`Standard ${stdNum} saved to your repository!`, 'success');
    }
  };

  const deleteAnalysisRecord = async (id) => {
    if (!id) return;
    try {
      try {
        await api.deleteAnalysis(id);
      } catch (err) {
        console.warn('Backend delete analysis notice:', err.message);
      }

      setHistory(prev => {
        const next = prev.filter(item => String(item._id || item.id) !== String(id));
        if (userId) {
          try {
            localStorage.setItem(getHistoryKey(userId), JSON.stringify(next));
          } catch (e) {}
        }
        return next;
      });

      if (currentAnalysis && String(currentAnalysis._id || currentAnalysis.id) === String(id)) {
        setCurrentAnalysis(null);
      }

      showToast('Report deleted successfully.', 'success');
      return true;
    } catch (err) {
      showToast('Failed to delete report: ' + err.message, 'error');
      throw err;
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        setCurrentAnalysis,
        history,
        setHistory,
        loadHistory,
        deleteAnalysisRecord,
        savedStandards,
        savedStandardNumbers,
        toggleSaveStandard,
        loadSaved,
        resetAnalysisState,
        loading,
        setLoading,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
