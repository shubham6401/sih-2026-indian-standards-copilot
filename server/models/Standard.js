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
    enum: ['Current', 'Under Revision', 'Superseded', 'Withdrawn', 'Pending Review'],
    default: 'Current',
  },
  registryStatus: {
    type: String,
    enum: ['Active', 'Under Revision', 'Pending Review', 'Superseded', 'Withdrawn'],
    default: 'Active',
  },
  version: {
    type: String,
    default: '2026.1',
  },
  previousVersion: {
    type: String,
    default: 'None',
  },
  newVersionDetected: {
    type: Boolean,
    default: false,
  },
  proposedRevision: {
    type: String,
    default: '',
  },
  qcoApplicable: {
    type: Boolean,
    default: false,
  },
  qcoNotificationNumber: {
    type: String,
    default: '',
  },
  notifyingMinistry: {
    type: String,
    default: 'Ministry of Commerce & Industry (DPIIT)',
  },
  certificationRequired: {
    type: Boolean,
    default: true,
  },
  certificationType: {
    type: String,
    default: 'BIS ISI Scheme-I (Mandatory)',
  },
  lastSyncDate: {
    type: Date,
    default: Date.now,
  },
  sourceUrl: {
    type: String,
    default: 'https://www.services.bis.gov.in',
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
