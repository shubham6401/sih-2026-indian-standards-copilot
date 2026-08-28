import mongoose from 'mongoose';

const amendmentSchema = new mongoose.Schema({
  amendmentNumber: String,
  date: String,
  description: String
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  isMandatory: Boolean,
  scheme: String,
  notifyingMinistry: String,
  orderName: String,
  status: String
}, { _id: false });

const standardSchema = new mongoose.Schema({
  standardNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  industry: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    default: 'Current',
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Current', 'Under Revision', 'Superseded', 'Withdrawn'],
    default: 'Current',
  },
  amendments: [amendmentSchema],
  supersedes: {
    type: String,
    default: 'None',
  },
  normativeReferences: [{
    type: String
  }],
  relatedStandards: [{
    type: String
  }],
  testingStandards: [{
    type: String
  }],
  safetyStandards: [{
    type: String
  }],
  installationStandards: [{
    type: String
  }],
  certification: certificationSchema,
  keywords: [{
    type: String,
    index: true
  }],
  source: {
    type: String,
    default: 'Bureau of Indian Standards (BIS)',
  },
  lastVerified: {
    type: String,
    default: '2026-06-15',
  }
}, { timestamps: true });

export const Standard = mongoose.models.Standard || mongoose.model('Standard', standardSchema);
