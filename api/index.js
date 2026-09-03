import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from '../server/config/db.js';
import { seedStandardsIfEmpty } from '../server/controllers/standardController.js';

import authRoutes from '../server/routes/authRoutes.js';
import analysisRoutes from '../server/routes/analysisRoutes.js';
import documentRoutes from '../server/routes/documentRoutes.js';
import standardRoutes from '../server/routes/standardRoutes.js';
import savedRoutes from '../server/routes/savedRoutes.js';
import reportRoutes from '../server/routes/reportRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AI Indian Standards Recommendation Engine API (Vercel Serverless)',
    database: getDBStatus(),
    responsibleAIDisclaimer: 'Decision-support only. Always verify active BIS standards and QCO mandates before issuing tenders.'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/standards', standardRoutes);
app.use('/api/saved-standards', savedRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('[Vercel API Error]:', err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

let dbInitialized = false;

export default async function handler(req, res) {
  if (!dbInitialized) {
    try {
      await connectDB();
      await seedStandardsIfEmpty();
    } catch (e) {
      console.warn('DB connect notice:', e.message);
    }
    dbInitialized = true;
  }
  return app(req, res);
}
