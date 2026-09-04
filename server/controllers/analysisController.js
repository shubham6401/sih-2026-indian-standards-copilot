import mongoose from 'mongoose';
import { Analysis } from '../models/Analysis.js';
import { findRelevantStandards } from '../services/aiService.js';
import { DEMO_ANALYSES } from '../seed/demoData.js';
import { normalizeRoleKey } from '../middleware/authMiddleware.js';

export const memoryAnalyses = [...DEMO_ANALYSES];

export const createAnalysis = async (req, res) => {
  try {
    const {
      productName,
      productCategory = 'General',
      rawInput,
      quantity = '',
      additionalRequirements = '',
      language = 'en',
      customApiKey = '',
      inputType = 'specification',
      confirmedRequirements = null
    } = req.body;

    if (!rawInput && !productName) {
      return res.status(400).json({ message: 'Please provide a product name or technical specification.' });
    }

    const fullSpec = `${productName ? productName + '. ' : ''}${rawInput || ''} ${additionalRequirements || ''}`.trim();

    // Run AI / RAG Copilot Recommendation Engine
    const aiResult = await findRelevantStandards(fullSpec, productCategory, customApiKey, productName);

    // If ambiguous (Scenario 3 / Missing info), return clarification dialog immediately
    if (aiResult.requiresClarification) {
      return res.status(200).json({
        requiresClarification: true,
        clarificationMessage: aiResult.clarificationMessage,
        clarificationQuestions: aiResult.clarificationQuestions,
        detectedEntity: aiResult.detectedEntity
      });
    }

    const analysisData = {
      userId: req.user?._id || null,
      userEmail: req.user?.email || '',
      organization: req.user?.organizationName || req.user?.organization || '',
      accountType: req.user?.accountType || 'procurement_officer',
      isDemo: Boolean(req.user?.isDemo),
      productName: productName || aiResult.structuredRequirements?.product || 'Procurement Item',
      productCategory: productCategory !== 'General' ? productCategory : (aiResult.structuredRequirements?.category || 'General'),
      rawInput: rawInput || fullSpec,
      quantity,
      additionalRequirements,
      language,
      inputType,
      confidenceScore: aiResult.confidenceScore || 85,
      confidenceLabel: aiResult.confidenceLabel || 'Relevant',
      explanation: aiResult.explanation || 'Analyzed against Bureau of Indian Standards corpus.',
      requirementEvidence: aiResult.requirementEvidence || [],
      structuredRequirements: confirmedRequirements || aiResult.structuredRequirements || {},
      primaryStandards: aiResult.primaryStandards || [],
      relatedStandards: aiResult.relatedStandards || [],
      alternativeStandards: aiResult.alternativeStandards || [],
      tenderGaps: aiResult.tenderGaps || [],
      outdatedReferences: aiResult.outdatedReferences || [],
      certifications: aiResult.certifications || aiResult.certificationRequirements || [],
      certificationRequirements: aiResult.certifications || aiResult.certificationRequirements || [],
      procurementReadiness: aiResult.procurementReadiness || { totalScore: 80, statusLabel: 'Readiness Evaluated', actionCount: 1 },
      improvedSpecification: aiResult.improvedSpecification || null,
      createdAt: new Date().toISOString()
    };

    let savedAnalysis = null;
    try {
      savedAnalysis = await Analysis.create(analysisData);
    } catch (dbErr) {
      // In-memory fallback
      const memoryId = 'analysis_' + Date.now();
      savedAnalysis = { _id: memoryId, ...analysisData };
    }

    // Always store in memory array as well
    memoryAnalyses.unshift(savedAnalysis);

    return res.status(201).json({
      success: true,
      message: 'Analysis completed successfully',
      analysis: savedAnalysis
    });
  } catch (error) {
    console.error('Error creating analysis:', error);
    return res.status(500).json({ message: 'Error processing recommendation: ' + error.message });
  }
};

export const getAnalyses = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.json([]);
    }

    const roleKey = normalizeRoleKey(user.accountType || user.role);
    const userId = user._id ? String(user._id) : null;
    const userOrg = (user.organizationName || user.organization || '').trim();
    const isDemo = Boolean(user.isDemo);

    let list = [];

    if (mongoose.connection?.readyState === 1) {
      try {
        let query = {};

        if (isDemo) {
          // Demo users see their designated seeded records + any analyses created during demo
          if (roleKey === 'admin') {
            query = {
              $or: [
                { isDemo: true },
                { userId: user._id }
              ]
            };
          } else if (roleKey === 'government_department') {
            query = {
              $or: [
                { demoKey: { $regex: '^dept_', $options: 'i' } },
                { userId: user._id }
              ]
            };
          } else if (roleKey === 'psu') {
            query = {
              $or: [
                { demoKey: { $regex: '^psu_', $options: 'i' } },
                { userId: user._id }
              ]
            };
          } else {
            // procurement_officer
            query = {
              $or: [
                { demoKey: { $regex: '^po_', $options: 'i' } },
                { userId: user._id }
              ]
            };
          }
        } else {
          // REAL REGISTERED USER: STRICT ISOLATION (No demo data, no cross-user data)
          if (roleKey === 'procurement_officer') {
            // Procurement Officer: only their own created analyses
            query = {
              userId: user._id,
              isDemo: { $ne: true }
            };
          } else if (roleKey === 'government_department' || roleKey === 'psu' || roleKey === 'admin') {
            // Organization/Department/PSU: records created by this user OR within their organization
            const orgFilters = [{ userId: user._id }];
            if (userOrg) {
              orgFilters.push({ organization: userOrg });
            }
            query = {
              $or: orgFilters,
              isDemo: { $ne: true }
            };
          }
        }

        list = await Analysis.find(query).sort({ createdAt: -1 }).limit(200);
      } catch (dbErr) {
        list = [];
      }
    }

    // Memory fallback if DB returned empty or DB is offline
    if (!list || list.length === 0) {
      if (isDemo) {
        if (roleKey === 'admin') {
          list = memoryAnalyses;
        } else if (roleKey === 'government_department') {
          list = memoryAnalyses.filter(a => a.demoKey?.startsWith('dept_') || String(a.userId) === userId);
        } else if (roleKey === 'psu') {
          list = memoryAnalyses.filter(a => a.demoKey?.startsWith('psu_') || String(a.userId) === userId);
        } else {
          list = memoryAnalyses.filter(a => a.demoKey?.startsWith('po_') || String(a.userId) === userId);
        }
      } else {
        // Real user in-memory fallback
        list = memoryAnalyses.filter(a => {
          if (a.isDemo) return false;
          if (String(a.userId) === userId) return true;
          if (roleKey !== 'procurement_officer' && userOrg && a.organization === userOrg) return true;
          return false;
        });
      }
    }

    return res.json(list || []);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving analysis history: ' + error.message });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    let analysis = null;

    if (mongoose.connection?.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          analysis = await Analysis.findById(id);
        }
      } catch (dbErr) {}

      if (!analysis) {
        try {
          analysis = await Analysis.findOne({
            $or: [{ _id: id }, { demoKey: id }]
          });
        } catch (e) {}
      }
    }

    if (!analysis) {
      analysis = memoryAnalyses.find(a => String(a._id) === String(id) || a.demoKey === id);
    }

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis report not found.' });
    }

    // Check authorization for non-demo records
    if (!analysis.isDemo && !analysis.demoKey) {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required to view this report.' });
      }

      const userId = String(req.user._id);
      const isOwner = analysis.userId && String(analysis.userId) === userId;
      const userOrg = (req.user.organizationName || req.user.organization || '').trim();
      const userRoleKey = normalizeRoleKey(req.user.role || req.user.accountType);
      const isOrgMember = userOrg && analysis.organization === userOrg && userRoleKey !== 'procurement_officer';

      if (!isOwner && !isOrgMember && userRoleKey !== 'admin') {
        return res.status(403).json({ message: 'Access denied: You do not have permission to view this analysis.' });
      }
    }

    return res.json(analysis);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving analysis: ' + error.message });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    let existing = null;
    if (mongoose.connection?.readyState === 1) {
      try {
        existing = await Analysis.findById(id);
      } catch (e) {}
    }
    if (!existing) {
      existing = memoryAnalyses.find(a => String(a._id) === String(id));
    }

    if (existing && !existing.isDemo) {
      const isOwner = existing.userId && String(existing.userId) === String(user._id);
      const userRoleKey = normalizeRoleKey(user.role || user.accountType);
      const userOrg = (user.organizationName || user.organization || '').trim();
      const isOrgAdmin = userRoleKey === 'admin' || (existing.organization === userOrg && userRoleKey !== 'procurement_officer');

      if (!isOwner && !isOrgAdmin) {
        return res.status(403).json({ message: 'Access denied: You cannot delete this analysis.' });
      }
    }

    try {
      await Analysis.findByIdAndDelete(id);
    } catch (dbErr) {}

    const idx = memoryAnalyses.findIndex(a => String(a._id) === String(id));
    if (idx !== -1) {
      memoryAnalyses.splice(idx, 1);
    }

    return res.json({ message: 'Analysis record deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting analysis: ' + error.message });
  }
};
