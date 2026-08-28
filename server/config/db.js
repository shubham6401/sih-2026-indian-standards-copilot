import mongoose from 'mongoose';

let isConnected = false;
let isInMemoryFallback = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/indian_standards_db';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fall back gracefully if local daemon is not running
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection could not be established (${error.message}).`);
    console.log(`[Database] Activating Resilient Embedded In-Memory Store for instant zero-dependency execution.`);
    isInMemoryFallback = true;
    return false;
  }
};

export const getDBStatus = () => ({
  isConnected,
  isInMemoryFallback,
  mode: isConnected ? 'MongoDB Live' : 'Resilient In-Memory Mode'
});
