import express from 'express';
import {
  getUsers,
  getPlatformStats,
  getSystemActivity,
  updateUserRole,
  getStandardsRegistry,
  syncStandards,
  approveStandardRevision,
  getAuditLogs,
  resetDemoData
} from '../controllers/adminController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// All /api/admin routes require authenticated user with admin role
router.use(protect);
router.use(authorizeRoles('admin', 'Organization/Admin'));

router.get('/users', getUsers);
router.get('/stats', getPlatformStats);
router.get('/activity', getSystemActivity);
router.patch('/users/:id/role', updateUserRole);

// Standards Intelligence Registry & Lifecycle Ingestion
router.get('/standards', getStandardsRegistry);
router.post('/standards/sync', syncStandards);
router.patch('/standards/:id/approve', approveStandardRevision);

// Enterprise Governance & Audit
router.get('/audit-logs', getAuditLogs);
router.post('/demo/reset', resetDemoData);

export default router;
