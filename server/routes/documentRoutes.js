import express from 'express';
import { uploadPdf } from '../middleware/uploadMiddleware.js';
import { uploadAndAnalyzeDocument } from '../controllers/documentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/upload', optionalAuth, uploadPdf.single('document'), uploadAndAnalyzeDocument);

export default router;
