import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Award,
  Layers,
  FileCheck2,
  AlertTriangle,
  History,
  Calendar
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { useAnalysis } from '../context/AnalysisContext';
import { api } from '../services/api';

export const StandardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savedStandardNumbers, savedStandards, history, toggleSaveStandard } = useAnalysis();

  // Instant in-memory resolver
  const resolveInMemoryStandard = () => {
    if (!id) return null;
    const decodedId = decodeURIComponent(id).toLowerCase().replace(/[:\s]+/g, ' ').trim();

    // Check saved standards
    const foundSaved = (savedStandards || []).find(s => {
      const sNum = (s.standardNumber || '').toLowerCase().replace(/[:\s]+/g, ' ').trim();
      return sNum.includes(decodedId) || decodedId.includes(sNum) || String(s._id) === String(id) || String(s.id) === String(id);
    });
    if (foundSaved) return foundSaved.standardDetails || foundSaved;

    // Check analysis history
    if (history && history.length > 0) {
      for (const rep of history) {
        const allStds = [...(rep.primaryStandards || []), ...(rep.relatedStandards || [])];
        const found = allStds.find(s => {
          const sNum = (s.standardNumber || '').toLowerCase().replace(/[:\s]+/g, ' ').trim();
          return sNum.includes(decodedId) || decodedId.includes(sNum) || String(s._id) === String(id) || String(s.id) === String(id);
        });
        if (found) return found;
      }
    }
    return null;
  };

  const [standard, setStandard] = useState(() => resolveInMemoryStandard());
  const [loading, setLoading] = useState(!standard);
  const [error, setError] = useState('');

  useEffect(() => {
    const memoryMatch = resolveInMemoryStandard();
    if (memoryMatch) {
      setStandard(memoryMatch);
      setLoading(false);
      setError('');
    }

    const fetchStandard = async () => {
      if (!id) return;
      try {
        if (!memoryMatch) setLoading(true);
        setError('');
        let data = null;
        try {
          data = await api.getStandardById(id);
        } catch (apiErr) {
          console.warn('API getStandardById fallback:', apiErr.message);
        }

        if (data) {
          setStandard(data);
        } else if (!memoryMatch) {
          setError(`Standard '${decodeURIComponent(id)}' could not be found in active registry.`);
        }
      } catch (err) {
        if (!memoryMatch) setError(err.message || 'Failed to load standard details');
      } finally {
        setLoading(false);
      }
    };

    fetchStandard();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-gov-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading Standard Specifications...</p>
      </div>
    );
  }

  if (error || !standard) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-4 max-w-md mx-auto my-12">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
        <h3 className="text-base font-bold text-slate-900">Standard Not Found</h3>
        <p className="text-xs text-slate-500">{error || 'Could not locate standard.'}</p>
        <Button size="sm" onClick={() => navigate('/explorer')}>
          Back to Standards Explorer
        </Button>
      </div>
    );
  }

  const isSaved = savedStandardNumbers.has(standard.standardNumber);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="primary">{standard.category}</Badge>
              <Badge variant={standard.status === 'Current' ? 'success' : 'warning'}>
                {standard.status}
              </Badge>
              {standard.certification?.isMandatory && (
                <Badge variant="gold">Mandatory QCO</Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
              {standard.standardNumber}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {standard.title}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant={isSaved ? 'secondary' : 'primary'}
              onClick={() => toggleSaveStandard(standard)}
              icon={isSaved ? BookmarkCheck : Bookmark}
            >
              {isSaved ? 'Saved in Repo' : 'Save Standard'}
            </Button>
            <a
              href="https://manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1"
            >
              BIS Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Scope */}
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Scope and Application
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {standard.scope}
          </p>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Publication Year</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.publicationYear}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Active Edition</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.edition || 'Current'}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Industry Sector</span>
            <span className="font-bold text-slate-900 mt-0.5 block truncate">{standard.industry}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Last Verified</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{standard.lastVerified || '2026-06-15'}</span>
          </div>
        </div>

        {/* Conformity Scheme */}
        {standard.certification && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
            <h4 className="font-bold text-gov-900 mb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Conformity & Regulatory Framework</span>
            </h4>
            <p className="text-slate-700">
              <strong>Scheme: </strong> {standard.certification.scheme}
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>Notifying Authority: </strong> {standard.certification.notifyingMinistry}
            </p>
            <p className="text-slate-700 mt-0.5">
              <strong>Order: </strong> {standard.certification.orderName}
            </p>
          </div>
        )}

        {/* Normative References */}
        {standard.normativeReferences && standard.normativeReferences.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Normative Cross-References
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {standard.normativeReferences.map((ref, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 font-medium text-slate-800">
                  {ref}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DisclaimerBanner />
    </div>
  );
};
