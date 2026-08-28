import mongoose from 'mongoose';

const recommendedStandardSchema = new mongoose.Schema({
  standardNumber: String,
  title: String,
  category: String,
  edition: String,
  publicationYear: Number,
  status: String,
  relevanceScore: Number,
  confidenceLabel: String,
  whyRecommended: String,
  whyAlternative: String,
  scope: String,
  editionHistory: Array,
  amendments: Array,
  supersedes: String,
  certification: Object,
  testingStandards: [String],
  safetyStandards: [String],
  installationStandards: [String],
  normativeReferences: [String],
  relatedStandards: [String]
}, { _id: false });

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    index: true,
  },
  inputType: {
    type: String,
    enum: ['specification', 'tender_pdf', 'voice'],
    default: 'specification',
  },
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    default: 'General',
  },
  quantity: {
    type: String,
    default: '',
  },
  rawInput: {
    type: String,
    required: true,
  },
  additionalRequirements: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'en',
  },
  detectedLanguage: {
    type: String,
    default: 'English',
  },
  structuredRequirements: [{
    label: String,
    value: String,
    category: String,
  }],
  extractedRequirements: [{
    tag: String,
    category: String,
    importance: String,
    matchedClause: String,
  }],
  primaryStandards: [recommendedStandardSchema],
  alternativeStandards: [recommendedStandardSchema],
  relatedStandards: [{
    standardNumber: String,
    title: String,
    relationshipType: String,
    relevanceScore: Number,
    status: String,
    edition: String,
    whyRelated: String
  }],
  testingStandards: [recommendedStandardSchema],
  safetyStandards: [recommendedStandardSchema],
  certifications: [{
    type: { type: String },
    status: String,
    standardNumber: String,
    authority: String,
    mandateReason: String,
    verificationNote: String
  }],
  outdatedReferences: [{
    oldNumber: String,
    citedYear: String,
    currentNumber: String,
    currentYear: Number,
    reason: String,
    severity: String,
    action: String,
  }],
  tenderGaps: [{
    category: String,
    severity: String,
    title: String,
    description: String,
    remedy: String,
  }],
  procurementReadiness: {
    totalScore: Number,
    statusLabel: String,
    actionCount: Number,
    breakdown: {
      standardsCoverage: Number,
      testingCoverage: Number,
      safetyCoverage: Number,
      certificationCoverage: Number,
      versionCurrency: Number,
      technicalCompleteness: Number,
    }
  },
  improvedSpecification: {
    type: String,
    default: '',
  },
  aiExplanation: {
    summary: String,
    matchedKeyRequirements: [String],
    regulatoryConsiderations: String,
    riskCautionNote: String,
  },
  confidenceScore: {
    type: Number,
    default: 85,
  },
  confidenceLabel: {
    type: String,
    default: 'Highly Relevant',
  },
  documentMetadata: {
    filename: String,
    fileSize: Number,
    totalPages: Number,
    extractedClausesCount: Number
  }
}, { timestamps: true });

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
