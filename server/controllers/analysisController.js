import mongoose from 'mongoose';
import { Analysis } from '../models/Analysis.js';
import { findRelevantStandards } from '../services/aiService.js';
import { DEMO_ANALYSES } from '../seed/demoData.js';

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
    const role = user?.role || 'Procurement Officer';
    const org = user?.organization || '';
    const userId = user?._id;

    let query = {};
    const normRole = (role || '').toLowerCase();

    if (normRole.includes('admin')) {
      // Platform Admin: platform-wide visibility across all 128 analyses
      query = {};
    } else if (normRole.includes('department') || normRole.includes('government')) {
      // Government Department: department-wide intelligence (32 reports)
      query = {
        $or: [
          { userId },
          { userEmail: { $regex: 'department|government', $options: 'i' } },
          { demoKey: { $regex: '^dept_', $options: 'i' } },
          { reportType: { $regex: 'Government Department', $options: 'i' } }
        ]
      };
    } else if (normRole.includes('psu')) {
      // PSU: PSU-wide technical procurement reviews (32 reports)
      query = {
        $or: [
          { userId },
          { userEmail: { $regex: 'psu', $options: 'i' } },
          { demoKey: { $regex: '^psu_', $options: 'i' } },
          { reportType: { $regex: 'PSU', $options: 'i' } }
        ]
      };
    } else {
      // Procurement Officer: officer-scoped records (32 reports)
      query = {
        $or: [
          { userId },
          { userEmail: { $regex: 'procurement', $options: 'i' } },
          { demoKey: { $regex: '^po_', $options: 'i' } },
          { reportType: { $regex: 'Procurement Officer', $options: 'i' } }
        ]
      };
    }

    let list = [];
    if (mongoose.connection?.readyState === 1) {
      try {
        list = await Analysis.find(query).sort({ createdAt: -1 }).limit(200);
      } catch (dbErr) {
        list = [];
      }
    }

    if (!list || list.length === 0) {
      if (normRole.includes('admin')) {
        list = memoryAnalyses;
      } else if (normRole.includes('department') || normRole.includes('government')) {
        list = memoryAnalyses.filter(a => a.demoKey?.startsWith('dept_') || a.userEmail?.includes('department'));
      } else if (normRole.includes('psu')) {
        list = memoryAnalyses.filter(a => a.demoKey?.startsWith('psu_') || a.userEmail?.includes('psu'));
      } else {
        list = memoryAnalyses.filter(a => a.demoKey?.startsWith('po_') || a.userEmail?.includes('procurement'));
      }
    }

    return res.json(list);
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
        analysis = await Analysis.findById(id);
      } catch (dbErr) {
        // Fallback
      }

      if (!analysis) {
        try {
          analysis = await Analysis.findOne({ demoKey: id });
        } catch (e) {}
      }
    }

    if (!analysis) {
      analysis = memoryAnalyses.find(a => String(a._id) === String(id) || a.demoKey === id);
    }

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis report not found.' });
    }

    return res.json(analysis);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving analysis: ' + error.message });
  }
};

export const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Analysis.findByIdAndDelete(id);
    } catch (dbErr) {
      // Ignore
    }

    const idx = memoryAnalyses.findIndex(a => String(a._id) === String(id));
    if (idx !== -1) {
      memoryAnalyses.splice(idx, 1);
    }

    return res.json({ message: 'Analysis record deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting analysis: ' + error.message });
  }
};
