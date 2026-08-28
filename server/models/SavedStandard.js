import mongoose from 'mongoose';

const savedStandardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    index: true,
  },
  standardNumber: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  status: {
    type: String,
    default: 'Current',
  },
  edition: {
    type: String,
    default: 'Current',
  },
  notes: {
    type: String,
    default: '',
  },
  tags: [{
    type: String
  }],
  standardDetails: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

export const SavedStandard = mongoose.models.SavedStandard || mongoose.model('SavedStandard', savedStandardSchema);
