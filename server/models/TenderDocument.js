import mongoose from 'mongoose';

const tenderDocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    index: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    default: 'application/pdf',
  },
  size: {
    type: Number,
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
  structuredRequirements: [{
    section: String,
    clause: String,
    extractedRequirement: String
  }],
  status: {
    type: String,
    enum: ['uploaded', 'parsed', 'analyzed', 'failed'],
    default: 'uploaded',
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analysis',
    default: null,
  }
}, { timestamps: true });

export const TenderDocument = mongoose.models.TenderDocument || mongoose.model('TenderDocument', tenderDocumentSchema);
