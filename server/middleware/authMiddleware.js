import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'indian_standards_procurement_jwt_secret_key_2026';

export const normalizeRoleKey = (role = '') => {
  const r = String(role).trim().toLowerCase();
  if (r.includes('admin') || r === 'organization_admin' || r === 'admin') return 'admin';
  if (r.includes('department') || r === 'government_department') return 'government_department';
  if (r.includes('psu') || r.includes('public sector')) return 'psu';
  return 'procurement_officer';
};

export const generateToken = (user) => {
  const roleToType = {
    'Procurement Officer': 'procurement_officer',
    'Government Department': 'government_department',
    'PSU': 'psu',
    'Organization/Admin': 'organization_admin'
  };
  const typeToRole = {
    'procurement_officer': 'Procurement Officer',
    'government_department': 'Government Department',
    'psu': 'PSU',
    'organization_admin': 'Organization/Admin'
  };

  const accountType = user.accountType || roleToType[user.role] || 'procurement_officer';
  const role = user.role || typeToRole[user.accountType] || 'Procurement Officer';

  return jwt.sign(
    {
      id: String(user._id),
      name: user.name,
      email: user.email,
      accountType,
      role,
      organization: user.organizationName || user.organization || '',
      isDemo: Boolean(user.isDemo)
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded) {
        let dbUser = null;
        try {
          if (User && decoded.id) {
            dbUser = await User.findById(decoded.id).select('-password');
          }
        } catch (err) {}

        if (dbUser) {
          req.user = dbUser;
          return next();
        }

        // Cryptographically verified token for demo account or memory store
        req.user = {
          _id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          organization: decoded.organization || '',
          organizationName: decoded.organization || '',
          accountType: decoded.accountType || 'procurement_officer',
          role: decoded.role || 'Procurement Officer',
          isDemo: Boolean(decoded.isDemo)
        };

        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

export const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        let dbUser = null;
        try {
          if (User && decoded.id) {
            dbUser = await User.findById(decoded.id).select('-password');
          }
        } catch (e) {}

        if (dbUser) {
          req.user = dbUser;
        } else {
          req.user = {
            _id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            organization: decoded.organization || '',
            organizationName: decoded.organization || '',
            accountType: decoded.accountType || 'procurement_officer',
            role: decoded.role || 'Procurement Officer',
            isDemo: Boolean(decoded.isDemo)
          };
        }
      }
    } catch (e) {
      // Ignore invalid token in optional auth
    }
  }
  next();
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const userRoleKey = normalizeRoleKey(req.user.role || req.user.accountType);
    const normalizedAllowed = allowedRoles.map(r => normalizeRoleKey(r));
    if (!normalizedAllowed.includes(userRoleKey)) {
      return res.status(403).json({
        message: `Forbidden: role '${req.user.role || req.user.accountType}' does not have authorization to access this resource`
      });
    }
    next();
  };
};
