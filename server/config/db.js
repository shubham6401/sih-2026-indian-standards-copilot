import mongoose from 'mongoose';

let isConnected = false;
let isInMemoryFallback = true;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // On serverless / Vercel without cloud MongoDB URI, use instant in-memory mode
  if (!uri || (process.env.VERCEL === '1' && uri.includes('127.0.0.1'))) {
    console.log('[Database] Operating in Zero-Dependency In-Memory Mode with authentic Indian Standards corpus.');
    isConnected = false;
    isInMemoryFallback = true;
    return false;
  }

  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1500,
    });
    isConnected = true;
    isInMemoryFallback = false;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection bypassed (${error.message}).`);
    isConnected = false;
    isInMemoryFallback = true;
    return false;
  }
};

export const getDBStatus = () => ({
  isConnected,
  isInMemoryFallback,
  mode: isConnected ? 'MongoDB Live' : 'Resilient In-Memory Mode'
});
