import app from '../server/server.js';
import { connectDB } from '../server/config/db.js';
import { seedStandardsIfEmpty } from '../server/controllers/standardController.js';

let isReady = false;

export default async function handler(req, res) {
  if (!isReady) {
    try {
      await connectDB();
      await seedStandardsIfEmpty();
      isReady = true;
    } catch (e) {
      console.warn('Vercel serverless init warning:', e.message);
    }
  }
  return app(req, res);
}
