import { Analysis } from '../models/Analysis.js';
import { findRelevantStandards } from '../services/aiService.js';

const memoryAnalyses = [];

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
    const aiResult = await findRelevantStandards(fullSpec, productCategory, customApiKey);

    // If ambiguous (Scenario 3 / Missing info), return clarification dialog immediately
    if (aiResult.requiresClarification) {
      return res.status(200).json({
        success: true,
        requiresClarification: true,
        detectedLanguage: aiResult.detectedLanguage,
        ambiguityDetails: aiResult.ambiguityDetails
      });
    }

    if (!aiResult.success) {
      return res.status(200).json({
        success: false,
        requiresClarification: false,
        message: aiResult.message || 'No matching Indian Standards identified.',
        extractedRequirements: []
      });
    }

    const analysisData = {
      userId: req.user?._id || null,
      inputType,
      productName: productName || (aiResult.primaryStandards[0]?.title.split('-')[0].trim()) || 'Procurement Item',
      productCategory: productCategory || aiResult.primaryStandards[0]?.category || 'General',
      quantity,
      rawInput: rawInput || fullSpec,
      additionalRequirements,
      language,
      detectedLanguage: aiResult.detectedLanguage,
      structuredRequirements: confirmedRequirements || aiResult.structuredRequirements || [],
      extractedRequirements: aiResult.extractedRequirements || [],
      primaryStandards: aiResult.primaryStandards || [],
      alternativeStandards: aiResult.alternativeStandards || [],
      relatedStandards: aiResult.relatedStandards || [],
      testingStandards: aiResult.testingStandards || [],
      safetyStandards: aiResult.safetyStandards || [],
      certifications: aiResult.certifications || [],
      outdatedReferences: aiResult.outdatedReferences || [],
      tenderGaps: aiResult.tenderGaps || [],
      procurementReadiness: aiResult.procurementReadiness || {},
      improvedSpecification: aiResult.improvedSpecification || '',
      aiExplanation: aiResult.aiExplanation,
      confidenceScore: aiResult.overallConfidence,
      confidenceLabel: aiResult.overallConfidenceLabel,
      createdAt: new Date()
    };

    let savedAnalysis = null;
    try {
      savedAnalysis = await Analysis.create(analysisData);
    } catch (dbErr) {
      savedAnalysis = {
        _id: 'analysis_' + Date.now(),
        ...analysisData
      };
      memoryAnalyses.unshift(savedAnalysis);
    }

    return res.status(201).json({
      success: true,
      requiresClarification: false,
      analysis: savedAnalysis
    });
  } catch (error) {
    console.error('Create Analysis Error:', error);
    return res.status(500).json({ message: 'Analysis failed: ' + error.message });
  }
};

export const getAnalyses = async (req, res) => {
  try {
    const userId = req.user?._id;
    let list = [];

    try {
      const query = userId ? { $or: [{ userId }, { userId: null }] } : {};
      list = await Analysis.find(query).sort({ createdAt: -1 }).limit(50);
    } catch (dbErr) {
      list = memoryAnalyses;
    }

    if (list.length === 0 && memoryAnalyses.length > 0) {
      list = memoryAnalyses;
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

    try {
      analysis = await Analysis.findById(id);
    } catch (dbErr) {
      // Fallback
    }

    if (!analysis) {
      analysis = memoryAnalyses.find(a => String(a._id) === String(id));
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
      const idx = memoryAnalyses.findIndex(a => String(a._id) === String(id));
      if (idx !== -1) memoryAnalyses.splice(idx, 1);
    }
    return res.json({ success: true, message: 'Analysis deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting analysis: ' + error.message });
  }
};
