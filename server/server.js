import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { seedStandardsIfEmpty } from './controllers/standardController.js';

import authRoutes from './routes/authRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import standardRoutes from './routes/standardRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health Check & DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AI Indian Standards Recommendation Engine API',
    database: getDBStatus(),
    responsibleAIDisclaimer: 'Decision-support only. Always verify active BIS standards and QCO mandates before issuing tenders.'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/standards', standardRoutes);
app.use('/api/saved-standards', savedRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    disclaimer: 'System encountered an unexpected exception.'
  });
});

// 404 Route handler
app.use('*', (req, res) => {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} not found.` });
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  await seedStandardsIfEmpty();

  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Indian Standards Recommendation Engine API running`);
    console.log(`📡 Port: http://localhost:${PORT}`);
    console.log(`🏛️ Bureau of Indian Standards Knowledge Base: Active`);
    console.log(`=======================================================`);
  });
};

if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  startServer();
}

export default app;
export { app, startServer };
