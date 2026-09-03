import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/User.js';
import { Analysis } from '../models/Analysis.js';
import { DEMO_USERS, DEMO_ANALYSES, DEMO_PASSWORD } from './demoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const seedDemoDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[Seed] MONGODB_URI not found in environment.');
    return { success: false, message: 'MONGODB_URI missing' };
  }

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[Seed] Connected to MongoDB for demo seeding: ${mongoose.connection.host}`);
    }

    console.log('[Seed] Seeding demo users...');
    const userMap = new Map(); // email -> user doc

    for (const u of DEMO_USERS) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);

      const user = await User.findOneAndUpdate(
        { email: u.email.toLowerCase() },
        {
          $set: {
            name: u.name,
            email: u.email.toLowerCase(),
            password: hashedPassword,
            organization: u.organization,
            role: u.role,
            isDemo: true
          }
        },
        { upsert: true, new: true }
      );

      userMap.set(u.email.toLowerCase(), user);
      console.log(`  ✓ Demo User Upserted: ${u.name} (${u.role}) -> ${u.email}`);
    }

    console.log('[Seed] Seeding 42 role-specific procurement analyses...');
    let poCount = 0;
    let deptCount = 0;
    let psuCount = 0;
    let totalStandards = 0;

    for (const a of DEMO_ANALYSES) {
      const user = userMap.get(a.userEmail.toLowerCase());
      const userId = user ? user._id : null;
      const organization = user ? user.organization : '';

      const stdCount = (a.primaryStandards?.length || 0) + (a.relatedStandards?.length || 0);
      totalStandards += stdCount;

      if (a.userEmail.includes('procurement')) poCount++;
      else if (a.userEmail.includes('department')) deptCount++;
      else if (a.userEmail.includes('psu')) psuCount++;

      await Analysis.findOneAndUpdate(
        { demoKey: a.demoKey },
        {
          $set: {
            ...a,
            userId,
            organization,
            isDemo: true
          }
        },
        { upsert: true, new: true }
      );
    }

    console.log('\n=============================================');
    console.log('✅ ANVESHAK DEMO SEED COMPLETED SUCCESSFULLY!');
    console.log('=============================================');
    console.log(`• Total Demo Users:    ${DEMO_USERS.length}`);
    console.log(`• Total Demo Analyses: ${DEMO_ANALYSES.length}`);
    console.log(`  - Procurement Officer:   ${poCount} analyses`);
    console.log(`  - Government Department: ${deptCount} analyses`);
    console.log(`  - PSU:                   ${psuCount} analyses`);
    console.log(`• Standards References:    ${totalStandards}`);
    console.log('---------------------------------------------');
    console.log('DEMO ACCOUNTS READY FOR HACKATHON EVALUATION:');
    console.log('1. Procurement Officer:   demo.procurement@anveshak.demo  /  Demo@12345');
    console.log('2. Government Department: demo.department@anveshak.demo   /  Demo@12345');
    console.log('3. PSU:                   demo.psu@anveshak.demo          /  Demo@12345');
    console.log('4. Admin:                 demo.admin@anveshak.demo        /  Demo@12345');
    console.log('=============================================\n');

    return {
      success: true,
      users: DEMO_USERS.length,
      analyses: DEMO_ANALYSES.length,
      poCount,
      deptCount,
      psuCount,
      totalStandards
    };
  } catch (err) {
    console.error('[Seed Error] Failed to seed demo database:', err);
    throw err;
  }
};

// If run directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDemoDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
