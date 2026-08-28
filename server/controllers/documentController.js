import { parsePdfBuffer } from '../services/documentParser.js';
import { findRelevantStandards, detectLanguage } from '../services/aiService.js';
import { Analysis } from '../models/Analysis.js';
import { TenderDocument } from '../models/TenderDocument.js';

const memoryDocuments = [];
const memoryAnalyses = [];

export const uploadAndAnalyzeDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded. Please upload a tender document in PDF format.' });
    }

    const { customApiKey = '', tenderTitle = '' } = req.body;
    const originalName = req.file.originalname;
    const fileSize = req.file.size;

    // Step 1: Parse PDF
    const parsed = await parsePdfBuffer(req.file.buffer);
    const extractedText = parsed.text;

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(400).json({
        message: 'Could not extract sufficient text from the uploaded PDF. Please ensure the PDF is text-searchable (not a scanned image).'
      });
    }

    // Step 2: Auto-detect product name or title from document text
    let inferredProductName = tenderTitle.trim();
    if (!inferredProductName) {
      const lower = extractedText.toLowerCase();
      if (lower.includes('street light') || lower.includes('led luminaire')) inferredProductName = 'LED Street Lighting Equipment';
      else if (lower.includes('cement') || lower.includes('concrete')) inferredProductName = 'Structural Cement & Concrete';
      else if (lower.includes('pipe') || lower.includes('hdpe')) inferredProductName = 'Water Supply HDPE Piping Network';
      else if (lower.includes('solar') || lower.includes('photovoltaic')) inferredProductName = 'Solar PV Power Modules';
      else if (lower.includes('cable') || lower.includes('wire')) inferredProductName = 'LT / HT Power Distribution Cables';
      else if (lower.includes('helmet') || lower.includes('ppe') || lower.includes('footwear')) inferredProductName = 'Industrial PPE & Safety Gear';
      else inferredProductName = originalName.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ');
    }

    // Step 3: Run AI Standards Recommendation Engine
    const detectedLang = detectLanguage(extractedText);
    const aiResult = await findRelevantStandards(extractedText, '', customApiKey);

    if (!aiResult.success) {
      return res.status(200).json({
        success: false,
        message: aiResult.message || 'No applicable Indian Standards found for this tender document.',
        extractedTextSnippet: extractedText.substring(0, 500)
      });
    }

    // Step 4: Save Analysis Record
    const analysisData = {
      userId: req.user?._id || null,
      inputType: 'tender_pdf',
      productName: inferredProductName,
      productCategory: aiResult.primaryStandards[0]?.category || 'General Procurement',
      quantity: 'As per Tender BOQ',
      rawInput: extractedText.substring(0, 4000), // store representative excerpt
      language: 'en',
      detectedLanguage: detectedLang,
      extractedRequirements: aiResult.extractedRequirements,
      primaryStandards: aiResult.primaryStandards,
      relatedStandards: aiResult.relatedStandards,
      testingStandards: aiResult.testingStandards,
      safetyStandards: aiResult.safetyStandards,
      certifications: aiResult.certifications,
      aiExplanation: aiResult.aiExplanation,
      confidenceScore: aiResult.overallConfidence,
      confidenceLabel: aiResult.overallConfidenceLabel,
      documentMetadata: {
        filename: originalName,
        fileSize,
        totalPages: parsed.numPages,
        extractedClausesCount: parsed.structuredRequirements.length
      },
      createdAt: new Date()
    };

    let savedAnalysis = null;
    try {
      savedAnalysis = await Analysis.create(analysisData);
    } catch (e) {
      savedAnalysis = { _id: 'analysis_doc_' + Date.now(), ...analysisData };
      memoryAnalyses.unshift(savedAnalysis);
    }

    return res.status(201).json({
      success: true,
      analysis: savedAnalysis,
      document: {
        filename: originalName,
        size: fileSize,
        pages: parsed.numPages,
        structuredClauses: parsed.structuredRequirements.slice(0, 15)
      }
    });
  } catch (error) {
    console.error('Document Upload & Analysis Error:', error);
    return res.status(500).json({ message: 'Tender document analysis failed: ' + error.message });
  }
};
