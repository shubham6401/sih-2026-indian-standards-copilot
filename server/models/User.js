import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  organizationName: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  accountType: {
    type: String,
    enum: [
      'procurement_officer',
      'government_department',
      'psu',
      'organization_admin',
      'Procurement Officer',
      'Government Department',
      'PSU',
      'Organization/Admin'
    ],
    default: 'procurement_officer',
  },
  role: {
    type: String,
    enum: [
      'Procurement Officer',
      'Government Department',
      'PSU',
      'Organization/Admin',
      'procurement_officer',
      'government_department',
      'psu',
      'organization_admin'
    ],
    default: 'Procurement Officer',
  },
  organizationType: {
    type: String,
    enum: ['Central Government', 'State Government', 'PSU', 'Autonomous Institution', 'Private Institution', 'Other'],
    default: 'Central Government',
  },
  isDemo: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('validate', function (next) {
  if (this.organizationName && !this.organization) {
    this.organization = this.organizationName;
  }
  if (this.organization && !this.organizationName) {
    this.organizationName = this.organization;
  }

  const typeToRole = {
    'procurement_officer': 'Procurement Officer',
    'government_department': 'Government Department',
    'psu': 'PSU',
    'organization_admin': 'Organization/Admin'
  };
  const roleToType = {
    'Procurement Officer': 'procurement_officer',
    'Government Department': 'government_department',
    'PSU': 'psu',
    'Organization/Admin': 'organization_admin'
  };

  if (this.accountType && typeToRole[this.accountType] && !this.role) {
    this.role = typeToRole[this.accountType];
  } else if (this.role && roleToType[this.role] && !this.accountType) {
    this.accountType = roleToType[this.role];
  } else if (this.accountType && typeToRole[this.accountType]) {
    this.role = typeToRole[this.accountType];
  }

  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
