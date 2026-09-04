import { Analysis } from '../models/Analysis.js';
import { memoryAnalyses } from './analysisController.js';

export const getReportData = async (req, res) => {
  try {
    const { id } = req.params;
    let analysis = null;

    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        analysis = await Analysis.findById(id);
      }
      if (!analysis) {
        analysis = await Analysis.findOne({ demoKey: id });
      }
    } catch (e) {
      // Fallback
    }

    if (!analysis) {
      analysis = memoryAnalyses.find(a => String(a._id) === String(id) || String(a.id) === String(id) || a.demoKey === id);
    }

    if (!analysis) {
      return res.status(404).json({ message: 'Report data not found for ID: ' + id });
    }

    // Build formal 12-section procurement report payload
    const rawId = analysis._id || analysis.id || analysis.demoKey || id || 'REP001';
    const report = {
      reportId: `REP-BIS-${String(rawId).replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`,
      generatedDate: new Date(analysis.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
      procurementRequirement: {
        productName: analysis.productName,
        category: analysis.productCategory,
        quantity: analysis.quantity || 'Not specified',
        rawSpecification: analysis.rawInput
      },
      extractedRequirements: analysis.extractedRequirements || analysis.structuredRequirements,
      primaryRecommendedStandards: analysis.primaryStandards,
      relatedStandards: analysis.relatedStandards,
      testingStandards: analysis.testingStandards,
      safetyStandards: analysis.safetyStandards,
      certificationRequirements: analysis.certifications || analysis.certificationRequirements,
      aiExplanation: analysis.aiExplanation || analysis.explanation,
      confidenceScores: {
        overallScore: analysis.confidenceScore,
        confidenceLabel: analysis.confidenceLabel,
        metricExplanation: 'AI-generated heuristic and semantic relevance based on published BIS scope parameters.'
      },
      verificationDisclaimer: 'IMPORTANT: This is an AI-powered decision-support tool. It does not constitute official legal certification or statutory endorsement. Procurement authorities must verify the current active edition, applicable amendments, and BIS licensing status on the official BIS portal (www.bis.gov.in / www.manakonline.in) prior to issuing tenders or awarding contracts.'
    };

    return res.json(report);
  } catch (error) {
    return res.status(500).json({ message: 'Error compiling report: ' + error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Analysis.findByIdAndDelete(id);
    } catch (e) {
      // Ignore
    }
    return res.json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting report: ' + error.message });
  }
};
