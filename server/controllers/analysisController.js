import { Analysis } from '../models/Analysis.js';
import { findRelevantStandards } from '../services/aiService.js';

const memoryAnalyses = [
  {
    _id: 'demo_analysis_led_01',
    productName: '100W Outdoor LED Street Light',
    productCategory: 'LED Lighting',
    rawInput: '100W outdoor LED street lights for municipal roads with IP66 waterproof housing, energy efficacy above 120 lm/W and surge protection up to 10kV.',
    inputType: 'specification',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    explanation: 'The specification was analyzed against the Indian Standards Knowledge Base. Primary standards IS 10322 (luminaire safety) and IS 15885 (LED driver controlgear) were mapped with high confidence based on municipal road lighting parameters.',
    structuredRequirements: {
      product: 'LED Street Light',
      category: 'Outdoor Lighting',
      application: 'Municipal Roads',
      powerRating: '100W',
      environment: 'Outdoor Heavy Ingress',
      protection: 'IP66 Waterproof & Dustproof',
      safety: 'Class I Electrical & 10kV Surge Protection',
      performance: 'Luminous Efficacy >= 120 lm/W'
    },
    primaryStandards: [
      {
        standardNumber: 'IS 10322 (Part 5/Sec 3): 2012',
        title: 'Luminaires - Particular Requirements - Section 3: Luminaires for Road and Street Lighting',
        relevanceScore: 95,
        edition: '3rd Revision',
        year: 2012,
        status: 'Current',
        category: 'LED Lighting',
        scope: 'Specifies requirements for road, street, and public thoroughfare lighting luminaires using electrical light sources on supply voltages not exceeding 1000V.',
        whyRecommended: 'Explicitly governs outdoor luminaires deployed on public highways and municipal roads.',
        keyRequirements: ['IP66 ingress protection', '10kV surge immunity', 'Optical efficiency', 'Thermal dissipation']
      },
      {
        standardNumber: 'IS 15885 (Part 2/Sec 13): 2012',
        title: 'Safety of Lamp Controlgear - Part 2: Particular Requirements - Section 13: d.c. or a.c. Supplied Electronic Controlgear for LED Modules',
        relevanceScore: 91,
        edition: '1st Revision',
        year: 2012,
        status: 'Current',
        category: 'LED Lighting',
        scope: 'Particular safety requirements for electronic controlgear (LED drivers) for use on d.c. supplies up to 250V and a.c. supplies up to 1000V at 50Hz/60Hz.',
        whyRecommended: 'Mandatory driver safety compliance under MeitY Compulsory Registration Scheme (CRS).'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 16107 (Part 2/Sec 1): 2012',
        title: 'Luminaires Performance - Part 2: Particular Requirements - Section 1: LED Luminaires',
        relationshipType: 'Testing Standard',
        relevanceScore: 88,
        importance: 'Mandatory Photometric & Energy Performance'
      },
      {
        standardNumber: 'IS/IEC 60529: 2001',
        title: 'Degrees of Protection Provided by Enclosures (IP Code)',
        relationshipType: 'Normative Reference',
        relevanceScore: 86,
        importance: 'Ingress Protection Verification (IP66)'
      }
    ],
    tenderGaps: [
      {
        category: 'Testing & Verification Gap',
        severity: 'HIGH',
        title: 'Absence of Laboratory Type Test Standard (IS 16107)',
        description: 'The requirement specifies 120 lm/W efficacy but omits testing clauses for lumen maintenance and photometric distribution as per IS 16107.',
        remedy: 'Mandate NABL-accredited test reports verifying IS 16107 (Part 2/Sec 1) compliance prior to batch dispatch.'
      }
    ],
    procurementReadiness: {
      totalScore: 82,
      statusLabel: 'Readiness Evaluated — Minor Gaps',
      actionCount: 1,
      breakdown: {
        standardsCoverage: 95,
        testingCoverage: 75,
        safetyCoverage: 90,
        certificationCompleteness: 85,
        versionCurrency: 100,
        technicalCompleteness: 80
      }
    },
    improvedSpecification: {
      title: 'Technical Procurement Schedule — 100W Outdoor LED Luminaire',
      productDescription: '100W Outdoor High-Efficacy LED Luminaire for Municipal & Highway Lighting',
      technicalRequirements: 'Operating Voltage: 120V - 277V AC, 50Hz. Total Power: 100W ± 5%. Ingress: IP66 minimum.',
      testingRequirements: 'Type tests in accordance with IS 10322 (Part 5/Sec 3) and IS 16107 (Part 2/Sec 1).',
      applicableStandardsList: 'IS 10322 (Part 5/Sec 3): 2012, IS 15885 (Part 2/Sec 13): 2012, IS 16107 (Part 2/Sec 1): 2012'
    },
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: 'demo_analysis_cement_02',
    productName: 'Ordinary Portland Cement (53 Grade)',
    productCategory: 'Cement & Building Materials',
    rawInput: '53 Grade Ordinary Portland Cement for high-load bridge pier construction requiring 53 MPa 28-day compressive strength.',
    inputType: 'specification',
    confidenceScore: 92,
    confidenceLabel: 'Highly Relevant',
    explanation: 'Mapped to unified standard IS 269:2015 which unifies 33G, 43G, and 53G Ordinary Portland Cement. Flags mandatory DPIIT Cement Quality Control Order.',
    structuredRequirements: {
      product: 'Ordinary Portland Cement',
      category: 'Structural Construction Material',
      grade: '53 Grade',
      application: 'High-Load Bridge Construction'
    },
    primaryStandards: [
      {
        standardNumber: 'IS 269: 2015',
        title: 'Ordinary Portland Cement - Specification (33 Grade, 43 Grade and 53 Grade)',
        relevanceScore: 95,
        edition: '6th Revision',
        year: 2015,
        status: 'Current',
        category: 'Cement & Concrete',
        whyRecommended: 'Primary Indian Standard for all structural 53 Grade Ordinary Portland Cement.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 4031 (Parts 1 to 15)',
        title: 'Methods of Physical Tests for Hydraulic Cement',
        relationshipType: 'Testing Standard',
        relevanceScore: 90,
        importance: 'Mandatory Compressive & Setting Time Tests'
      }
    ],
    tenderGaps: [],
    procurementReadiness: {
      totalScore: 90,
      statusLabel: 'Tender Ready',
      actionCount: 0,
      breakdown: {
        standardsCoverage: 95,
        testingCoverage: 90,
        safetyCoverage: 90,
        certificationCompleteness: 95,
        versionCurrency: 100,
        technicalCompleteness: 88
      }
    },
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

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
      certificationRequirements: aiResult.certificationRequirements || [],
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
    const userId = req.user?._id;
    let list = [];

    try {
      const query = userId ? { $or: [{ userId }, { userId: null }] } : {};
      list = await Analysis.find(query).sort({ createdAt: -1 }).limit(50);
    } catch (dbErr) {
      list = memoryAnalyses;
    }

    if (!list || list.length === 0) {
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
