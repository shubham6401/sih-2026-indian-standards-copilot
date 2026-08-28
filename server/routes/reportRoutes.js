import express from 'express';
import { getReportData, deleteReport } from '../controllers/reportController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id', getReportData);
router.delete('/:id', optionalAuth, deleteReport);

export default router;
