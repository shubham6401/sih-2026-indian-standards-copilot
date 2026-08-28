import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AnalysisContext = createContext();

const LOCAL_STORAGE_HISTORY_KEY = 'is_analysis_history';
const LOCAL_STORAGE_SAVED_KEY = 'is_saved_standards';

// Initial starter history items so dashboard has realistic data on first load
const INITIAL_DEMO_HISTORY = [
  {
    _id: 'demo_analysis_led_01',
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
    procurementReadiness: { totalScore: 78, statusLabel: 'Readiness Evaluated', actionCount: 2 },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'demo_analysis_cement_02',
    productName: 'Ordinary Portland Cement (53 Grade)',
    productCategory: 'Cement & Building Materials',
    rawInput: '53 Grade Ordinary Portland Cement for high-load bridge pier construction requiring 53 MPa 28-day compressive strength.',
    inputType: 'specification',
    confidenceScore: 89,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 269: 2015', title: 'Ordinary Portland Cement - Specification (33, 43 and 53 Grade)', relevanceScore: 92, edition: '6th Revision', status: 'Current' }
    ],
    relatedStandards: [
      { standardNumber: 'IS 456: 2000', title: 'Plain and Reinforced Concrete Code of Practice', relationshipType: 'Installation Standard', relevanceScore: 85 }
    ],
    tenderGaps: [],
    procurementReadiness: { totalScore: 88, statusLabel: 'Tender Ready', actionCount: 0 },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: 'demo_analysis_helmet_03',
    productName: 'Industrial Safety Helmet (Hard Hat)',
    productCategory: 'Personal Protective Equipment',
    rawInput: 'Industrial safety helmet for construction site workers with 2200V electrical proof test and impact resistance.',
    inputType: 'specification',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    primaryStandards: [
      { standardNumber: 'IS 2925: 1984', title: 'Specification for Industrial Safety Helmets', relevanceScore: 95, edition: '2nd Revision', status: 'Current' }
    ],
    relatedStandards: [],
    tenderGaps: [],
    procurementReadiness: { totalScore: 92, statusLabel: 'Tender Ready', actionCount: 0 },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString()
  }
];

export const AnalysisProvider = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysisState] = useState(() => {
    try {
      const stored = localStorage.getItem('is_current_analysis');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_DEMO_HISTORY;
    } catch {
      return INITIAL_DEMO_HISTORY;
    }
  });

  const [savedStandards, setSavedStandards] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedStandardNumbers, setSavedStandardNumbers] = useState(
    new Set((savedStandards || []).map(s => s.standardNumber))
  );
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Enhanced setCurrentAnalysis that automatically prepends to history and syncs to localStorage
  const setCurrentAnalysis = (analysis) => {
    if (!analysis) return;
    setCurrentAnalysisState(analysis);
    try {
      localStorage.setItem('is_current_analysis', JSON.stringify(analysis));
    } catch (e) {}

    // Add / Prepend to history
    setHistory(prev => {
      const filtered = prev.filter(item => String(item._id) !== String(analysis._id));
      const updated = [analysis, ...filtered];
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const loadHistory = async () => {
    try {
      // 1. Load from localStorage
      let localItems = [];
      const stored = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (stored) {
        try {
          localItems = JSON.parse(stored);
        } catch (e) {}
      }

      // 2. Fetch from backend API
      let remoteItems = [];
      try {
        remoteItems = await api.getAnalyses();
      } catch (e) {}

      // 3. Merge unique items by _id
      const idMap = new Map();
      (localItems || []).forEach(item => {
        if (item && item._id) idMap.set(String(item._id), item);
      });
      (remoteItems || []).forEach(item => {
        if (item && item._id) idMap.set(String(item._id), item);
      });

      if (idMap.size === 0) {
        INITIAL_DEMO_HISTORY.forEach(item => idMap.set(String(item._id), item));
      }

      const merged = Array.from(idMap.values()).sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setHistory(merged);
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(merged));
      } catch (e) {}
    } catch (e) {
      console.warn('Failed to load history:', e.message);
    }
  };

  const loadSaved = async () => {
    try {
      let localSaved = [];
      const stored = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
      if (stored) {
        try {
          localSaved = JSON.parse(stored);
        } catch (e) {}
      }

      let remoteSaved = [];
      try {
        remoteSaved = await api.getSavedStandards();
      } catch (e) {}

      const numMap = new Map();
      (localSaved || []).forEach(s => numMap.set(s.standardNumber, s));
      (remoteSaved || []).forEach(s => numMap.set(s.standardNumber, s));

      const merged = Array.from(numMap.values());
      setSavedStandards(merged);
      setSavedStandardNumbers(new Set(merged.map(s => s.standardNumber)));
      try {
        localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(merged));
      } catch (e) {}
    } catch (e) {
      console.warn('Failed to load saved standards:', e.message);
    }
  };

  useEffect(() => {
    loadHistory();
    loadSaved();
  }, []);

  const toggleSaveStandard = async (standard) => {
    const stdNum = standard.standardNumber || standard;
    if (savedStandardNumbers.has(stdNum)) {
      // Remove
      setSavedStandards(prev => {
        const next = prev.filter(s => s.standardNumber !== stdNum);
        try {
          localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(next));
        } catch (e) {}
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
        try {
          localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(next));
        } catch (e) {}
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

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        setCurrentAnalysis,
        history,
        setHistory,
        loadHistory,
        savedStandards,
        savedStandardNumbers,
        toggleSaveStandard,
        loadSaved,
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
