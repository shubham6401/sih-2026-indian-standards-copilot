import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [savedStandards, setSavedStandards] = useState([]);
  const [savedStandardNumbers, setSavedStandardNumbers] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadHistory = async () => {
    try {
      const data = await api.getAnalyses();
      setHistory(data || []);
    } catch (e) {
      console.warn('Failed to load history:', e.message);
    }
  };

  const loadSaved = async () => {
    try {
      const data = await api.getSavedStandards();
      setSavedStandards(data || []);
      const numSet = new Set((data || []).map(s => s.standardNumber));
      setSavedStandardNumbers(numSet);
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
      const item = savedStandards.find(s => s.standardNumber === stdNum);
      if (item) {
        try {
          await api.removeSavedStandard(item._id || stdNum);
          setSavedStandards(prev => prev.filter(s => s.standardNumber !== stdNum));
          setSavedStandardNumbers(prev => {
            const next = new Set(prev);
            next.delete(stdNum);
            return next;
          });
          showToast(`Standard ${stdNum} removed from bookmarks.`, 'info');
        } catch (e) {
          showToast('Failed to remove standard', 'error');
        }
      }
    } else {
      // Save
      try {
        const res = await api.saveStandard({
          standardNumber: stdNum,
          notes: `Added from ${currentAnalysis?.productName || 'Analysis'}`,
          tags: ['Procurement Baseline', standard.category || 'Standards']
        });
        const newRecord = res.savedStandard || { standardNumber: stdNum, title: standard.title || stdNum };
        setSavedStandards(prev => [newRecord, ...prev]);
        setSavedStandardNumbers(prev => new Set([...prev, stdNum]));
        showToast(`Standard ${stdNum} saved to your repository!`, 'success');
      } catch (e) {
        showToast('Failed to save standard: ' + e.message, 'error');
      }
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
