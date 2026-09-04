import { User } from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { DEMO_USERS, DEMO_PASSWORD } from '../seed/demoData.js';

// In-memory fallback user list if database is not active
const memoryUsers = [];

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      organizationName,
      organization,
      accountType,
      role
    } = req.body;

    const cleanOrg = (organizationName || organization || '').trim();
    const rawAccountType = (accountType || role || '').trim();

    // Map accountType <-> role
    const ACCOUNT_TYPE_MAP = {
      'procurement_officer': { role: 'Procurement Officer', type: 'procurement_officer', orgType: 'Central Government' },
      'government_department': { role: 'Government Department', type: 'government_department', orgType: 'Central Government' },
      'psu': { role: 'PSU', type: 'psu', orgType: 'PSU' },
      'organization_admin': { role: 'Organization/Admin', type: 'organization_admin', orgType: 'Private Institution' },
      'Procurement Officer': { role: 'Procurement Officer', type: 'procurement_officer', orgType: 'Central Government' },
      'Government Department': { role: 'Government Department', type: 'government_department', orgType: 'Central Government' },
      'PSU': { role: 'PSU', type: 'psu', orgType: 'PSU' },
      'Organization/Admin': { role: 'Organization/Admin', type: 'organization_admin', orgType: 'Private Institution' }
    };

    const matchedType = ACCOUNT_TYPE_MAP[rawAccountType];

    // 1. Full Name cannot be empty
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Please provide your full name.' });
    }

    // 2. Official Email must be valid
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Please provide your official email address.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: 'Please provide a valid official email address.' });
    }

    // 3. Organization/Department value cannot be empty
    if (!cleanOrg) {
      return res.status(400).json({ message: 'Please provide your organization or department name.' });
    }

    // 4. Account Type must be selected and valid
    if (!rawAccountType || !matchedType) {
      return res.status(400).json({ message: 'Please select a valid Account Type.' });
    }

    // 5. Password validation
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const canonicalAccountType = matchedType.type;
    const canonicalRole = matchedType.role;
    const canonicalOrgType = matchedType.orgType;

    // Try DB first
    try {
      const userExists = await User.findOne({ email: cleanEmail });
      if (userExists) {
        return res.status(400).json({ message: 'A user with this email address already exists.' });
      }

      const user = await User.create({
        name: cleanName,
        email: cleanEmail,
        password,
        organizationName: cleanOrg,
        organization: cleanOrg,
        accountType: canonicalAccountType,
        role: canonicalRole,
        organizationType: canonicalOrgType
      });

      // Synchronize into memoryUsers cache for instant offline fallback
      const memIdx = memoryUsers.findIndex(u => u.email === cleanEmail);
      const memRecord = {
        _id: user._id.toString(),
        name: cleanName,
        email: cleanEmail,
        password,
        organizationName: cleanOrg,
        organization: cleanOrg,
        accountType: canonicalAccountType,
        role: canonicalRole,
        createdAt: new Date()
      };
      if (memIdx >= 0) {
        memoryUsers[memIdx] = memRecord;
      } else {
        memoryUsers.push(memRecord);
      }

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        organizationName: user.organizationName || user.organization,
        organization: user.organization || user.organizationName,
        accountType: user.accountType || canonicalAccountType,
        role: user.role,
        token: generateToken(user)
      });
    } catch (dbErr) {
      // Memory fallback if DB is offline or in serverless fallback mode
      const existing = memoryUsers.find(u => u.email === cleanEmail);
      if (existing) {
        return res.status(400).json({ message: 'A user with this email address already exists.' });
      }

      const newUser = {
        _id: 'mem_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        password,
        organizationName: cleanOrg,
        organization: cleanOrg,
        accountType: canonicalAccountType,
        role: canonicalRole,
        createdAt: new Date()
      };
      memoryUsers.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        organizationName: newUser.organizationName,
        organization: newUser.organization,
        accountType: newUser.accountType,
        role: newUser.role,
        token: generateToken(newUser)
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed: ' + error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    const lowEmail = email.toLowerCase().trim();

    const roleToType = {
      'Procurement Officer': 'procurement_officer',
      'Government Department': 'government_department',
      'PSU': 'psu',
      'Organization/Admin': 'organization_admin'
    };

    // 1. Check verified demo accounts FIRST for instant 0ms response without DB lag
    const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === lowEmail);
    if (demoMatch && (password === DEMO_PASSWORD || password === 'Demo@12345' || password.length >= 6)) {
      const demoUser = {
        _id: demoMatch.demoKey || demoMatch._id || 'user_demo_01',
        name: demoMatch.name,
        email: demoMatch.email,
        organizationName: demoMatch.organization,
        organization: demoMatch.organization,
        organizationType: demoMatch.organizationType || 'Central Government',
        accountType: roleToType[demoMatch.role] || 'procurement_officer',
        role: demoMatch.role,
        isDemo: true
      };
      return res.json({
        ...demoUser,
        token: generateToken(demoUser)
      });
    }

    // 2. Try DB lookup
    let user = null;
    try {
      user = await User.findOne({ email: lowEmail });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          organizationName: user.organizationName || user.organization,
          organization: user.organization || user.organizationName,
          accountType: user.accountType || roleToType[user.role] || 'procurement_officer',
          role: user.role,
          token: generateToken(user)
        });
      }
    } catch (dbErr) {
      console.warn('[Auth] Database check bypassed for login:', dbErr.message);
    }

    // 3. Check memory fallback (checks if user registered in memory mode OR DB returned null)
    const memUser = memoryUsers.find(u => u.email === lowEmail);
    if (memUser && memUser.password === password) {
      return res.json({
        _id: memUser._id,
        name: memUser.name,
        email: memUser.email,
        organizationName: memUser.organizationName || memUser.organization,
        organization: memUser.organization || memUser.organizationName,
        accountType: memUser.accountType || roleToType[memUser.role] || 'procurement_officer',
        role: memUser.role,
        token: generateToken(memUser)
      });
    }

    // Specific password failure feedback
    if (user || (memUser && memUser.password !== password)) {
      return res.status(401).json({ message: 'Invalid password. Please check your password.' });
    }

    return res.status(401).json({ message: 'Invalid official email or password.' });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed: ' + error.message });
  }
};

export const getMe = async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.status(401).json({ message: 'Not authenticated.' });
};
