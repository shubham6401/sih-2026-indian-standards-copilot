import { User } from '../models/User.js';
import { generateToken } from '../middleware/authMiddleware.js';

// In-memory fallback user list if database is not active
const memoryUsers = [];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, organization, role } = req.body;

    if (!name || !email || !password || !organization) {
      return res.status(400).json({ message: 'Please provide all required registration fields.' });
    }

    // Try DB first
    try {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: 'A user with this email address already exists.' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        organization,
        role: role || 'Procurement Officer'
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        organization: user.organization,
        role: user.role,
        token: generateToken(user)
      });
    } catch (dbErr) {
      // Memory fallback
      const existing = memoryUsers.find(u => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ message: 'A user with this email address already exists.' });
      }

      const newUser = {
        _id: 'mem_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password,
        organization,
        role: role || 'Procurement Officer',
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

    try {
      const user = await User.findOne({ email: email.toLowerCase() });
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
      // Memory fallback check
      const memUser = memoryUsers.find(u => u.email === email.toLowerCase() && u.password === password);
      if (memUser) {
        return res.json({
          _id: memUser._id,
          name: memUser.name,
          email: memUser.email,
          organization: memUser.organization,
          role: memUser.role,
          token: generateToken(memUser)
        });
      }
    }

    // Support instant demo logins for all 4 stakeholder roles
    const lowEmail = email.toLowerCase();
    const demoAccounts = {
      'officer@cpwd.gov.in': {
        _id: 'user_po_01',
        name: 'Sh. Rajesh Kumar',
        email: 'officer@cpwd.gov.in',
        organization: 'Central Public Works Department (CPWD)',
        role: 'Procurement Officer'
      },
      'demo@procure.gov.in': {
        _id: 'user_po_01',
        name: 'Sh. Rajesh Kumar',
        email: 'demo@procure.gov.in',
        organization: 'Central Public Works Department (CPWD)',
        role: 'Procurement Officer'
      },
      'director.procurement@mohua.gov.in': {
        _id: 'user_dept_02',
        name: 'Dr. Anita Sharma',
        email: 'director.procurement@mohua.gov.in',
        organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
        role: 'Government Department'
      },
      'v.malhotra@ntpc.co.in': {
        _id: 'user_psu_03',
        name: 'Er. Vikram Malhotra',
        email: 'v.malhotra@ntpc.co.in',
        organization: 'National Thermal Power Corporation (NTPC)',
        role: 'PSU'
      },
      'admin@bis-copilot.gov.in': {
        _id: 'user_admin_04',
        name: 'Smt. Preeti Verma',
        email: 'admin@bis-copilot.gov.in',
        organization: 'Bureau of Indian Standards (BIS) Directorate',
        role: 'Organization/Admin'
      }
    };

    if (demoAccounts[lowEmail] && (password.length >= 6 || password === 'demo123' || password === 'password123')) {
      const demoUser = demoAccounts[lowEmail];
      return res.json({
        ...demoUser,
        token: generateToken(demoUser)
      });
    }

    return res.status(401).json({ message: 'Invalid email or password.' });
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
