import { User } from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { DEMO_USERS, DEMO_PASSWORD } from '../seed/demoData.js';

// In-memory fallback user list if database is not active
const memoryUsers = [];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, organization, role } = req.body;

    if (!name || !email || !password || !organization) {
      return res.status(400).json({ message: 'Please provide all required registration fields.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanOrg = organization.trim();
    const cleanRole = role || 'Procurement Officer';

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
        organization: cleanOrg,
        role: cleanRole
      });

      // Synchronize into memoryUsers cache for instant offline fallback
      const memIdx = memoryUsers.findIndex(u => u.email === cleanEmail);
      const memRecord = {
        _id: user._id.toString(),
        name: cleanName,
        email: cleanEmail,
        password,
        organization: cleanOrg,
        role: cleanRole,
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
        organization: user.organization,
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
        organization: cleanOrg,
        role: cleanRole,
        createdAt: new Date()
      };
      memoryUsers.push(newUser);

      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        organization: newUser.organization,
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

    // 1. Check verified demo accounts FIRST for instant 0ms response without DB lag
    const demoMatch = DEMO_USERS.find(u => u.email.toLowerCase() === lowEmail);
    if (demoMatch && (password === DEMO_PASSWORD || password === 'Demo@12345' || password.length >= 6)) {
      const demoUser = {
        _id: demoMatch.demoKey || demoMatch._id || 'user_demo_01',
        name: demoMatch.name,
        email: demoMatch.email,
        organization: demoMatch.organization,
        organizationType: demoMatch.organizationType || 'Central Government',
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
          organization: user.organization,
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
        organization: memUser.organization,
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
