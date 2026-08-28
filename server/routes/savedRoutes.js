import express from 'express';
import {
  saveStandard,
  getSavedStandards,
  removeSavedStandard
} from '../controllers/savedStandardsController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuth, saveStandard);
router.get('/', optionalAuth, getSavedStandards);
router.delete('/:id', optionalAuth, removeSavedStandard);

export default router;
