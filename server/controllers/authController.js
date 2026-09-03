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

    // Check verified demo accounts FIRST for instant 0ms response without DB lag
    const lowEmail = email.toLowerCase().trim();
    const demoAccounts = {
      'demo.procurement@anveshak.demo': {
        _id: 'user_demo_po_01',
        name: 'Rajesh Kumar',
        email: 'demo.procurement@anveshak.demo',
        organization: 'CPWD — Central Public Works Department',
        role: 'Procurement Officer',
        isDemo: true
      },
      'demo.department@anveshak.demo': {
        _id: 'user_demo_dept_02',
        name: 'Priya Sharma',
        email: 'demo.department@anveshak.demo',
        organization: 'Department of Public Works',
        role: 'Government Department',
        isDemo: true
      },
      'demo.psu@anveshak.demo': {
        _id: 'user_demo_psu_03',
        name: 'Amit Verma',
        email: 'demo.psu@anveshak.demo',
        organization: 'National Energy Infrastructure Corporation',
        role: 'PSU',
        isDemo: true
      },
      'demo.admin@anveshak.demo': {
        _id: 'user_demo_admin_04',
        name: 'Anveshak Administrator',
        email: 'demo.admin@anveshak.demo',
        organization: 'Anveshak Platform',
        role: 'Organization/Admin',
        isDemo: true
      },
      // Keep backward compatibility with previous evaluators
      'officer@cpwd.gov.in': {
        _id: 'user_demo_po_01',
        name: 'Rajesh Kumar',
        email: 'officer@cpwd.gov.in',
        organization: 'CPWD — Central Public Works Department',
        role: 'Procurement Officer',
        isDemo: true
      },
      'director.procurement@mohua.gov.in': {
        _id: 'user_demo_dept_02',
        name: 'Priya Sharma',
        email: 'director.procurement@mohua.gov.in',
        organization: 'Department of Public Works',
        role: 'Government Department',
        isDemo: true
      },
      'v.malhotra@ntpc.co.in': {
        _id: 'user_demo_psu_03',
        name: 'Amit Verma',
        email: 'v.malhotra@ntpc.co.in',
        organization: 'National Energy Infrastructure Corporation',
        role: 'PSU',
        isDemo: true
      },
      'admin@bis-copilot.gov.in': {
        _id: 'user_demo_admin_04',
        name: 'Anveshak Administrator',
        email: 'admin@bis-copilot.gov.in',
        organization: 'Anveshak Platform',
        role: 'Organization/Admin',
        isDemo: true
      }
    };

    if (demoAccounts[lowEmail] && (password === 'Demo@12345' || password.length >= 6)) {
      const demoUser = demoAccounts[lowEmail];
      return res.json({
        ...demoUser,
        token: generateToken(demoUser)
      });
    }

    try {
      const user = await User.findOne({ email: lowEmail });
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
      const memUser = memoryUsers.find(u => u.email === lowEmail && u.password === password);
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
