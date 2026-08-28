import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'indian_standards_procurement_jwt_secret_key_2026';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Fallback demo user if in memory
        req.user = { _id: decoded.id, name: decoded.name || 'Procurement Officer', email: decoded.email, role: decoded.role || 'Procurement Officer' };
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  // Optional authentication: allow proceeding if not strictly mandatory or return 401
  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

export const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { _id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
    } catch (e) {
      // Ignore invalid token in optional auth
    }
  }
  next();
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role, organization: user.organization },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};
