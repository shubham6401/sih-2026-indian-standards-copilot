import express from 'express';
import {
  createAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis
} from '../controllers/analysisController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, createAnalysis);
router.get('/', optionalAuth, getAnalyses);
router.get('/:id', optionalAuth, getAnalysisById);
router.delete('/:id', optionalAuth, deleteAnalysis);

export default router;
