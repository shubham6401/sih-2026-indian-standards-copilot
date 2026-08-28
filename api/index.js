import app from '../server/server.js';
import { connectDB } from '../server/config/db.js';
import { seedStandardsIfEmpty } from '../server/controllers/standardController.js';

let isInitialized = false;

export default async function handler(req, res) {
  if (!isInitialized) {
    try {
      await connectDB();
      await seedStandardsIfEmpty();
    } catch (err) {
      console.warn('[Vercel Serverless] DB init warning:', err.message);
    }
    isInitialized = true;
  }
  return app(req, res);
}
