import express from 'express';
import {
  searchStandards,
  getStandardById,
  getCategoriesAndFilters,
  getKnowledgeBaseStats
} from '../controllers/standardController.js';

const router = express.Router();

router.get('/stats', getKnowledgeBaseStats);
router.get('/filters', getCategoriesAndFilters);
router.get('/categories', getCategoriesAndFilters);
router.get('/search', searchStandards);
router.get('/', searchStandards);
router.get('/:id', getStandardById);

export default router;
