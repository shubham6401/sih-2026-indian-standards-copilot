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

export const seedDemoDatabase = async (cleanWipe = true) => {
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

    if (cleanWipe) {
      console.log('[Seed] Cleaning slate: Deleting all existing users, accounts, and analyses...');
      const deletedUsers = await User.deleteMany({});
      const deletedAnalyses = await Analysis.deleteMany({});
      if (mongoose.models.TenderDocument) {
        await mongoose.models.TenderDocument.deleteMany({});
      }
      console.log(`  ✓ Cleared ${deletedUsers.deletedCount} old users and ${deletedAnalyses.deletedCount} old analyses.`);
    }

    console.log(`[Seed] Seeding ${DEMO_USERS.length} demo accounts (4 distinct accounts per role + universal aliases)...`);
    const userMap = new Map();

    for (const u of DEMO_USERS) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);

      const user = await User.create({
        name: u.name,
        email: u.email.toLowerCase(),
        password: hashedPassword,
        organization: u.organization,
        organizationName: u.organization,
        accountType: u.accountType,
        role: u.role,
        isDemo: true
      });

      userMap.set(u.email.toLowerCase(), user);
      console.log(`  ✓ Demo User Created: ${u.name} [${u.accountType} / ${u.role}] -> ${u.email}`);
    }

    console.log(`[Seed] Seeding ${DEMO_ANALYSES.length} role-specific procurement analyses (32 per role)...`);
    let poCount = 0;
    let deptCount = 0;
    let psuCount = 0;
    let adminCount = 0;
    let totalStandards = 0;

    for (const a of DEMO_ANALYSES) {
      const user = userMap.get(a.userEmail.toLowerCase());
      const userId = user ? user._id : null;
      const organization = user ? user.organization : '';

      const stdCount = (a.primaryStandards?.length || 0) + (a.relatedStandards?.length || 0);
      totalStandards += stdCount;

      if (a.demoKey.startsWith('po_') || a.userEmail.includes('procurement')) poCount++;
      else if (a.demoKey.startsWith('dept_') || a.userEmail.includes('department')) deptCount++;
      else if (a.demoKey.startsWith('psu_') || a.userEmail.includes('psu')) psuCount++;
      else if (a.demoKey.startsWith('admin_') || a.userEmail.includes('admin')) adminCount++;

      await Analysis.create({
        ...a,
        userId,
        organization,
        isDemo: true
      });
    }

    console.log('\n=============================================================');
    console.log('✅ ANVESHAK FULL ROLE-BASED DATASET SEEDED SUCCESSFULLY!');
    console.log('=============================================================');
    console.log(`• Total Demo Accounts:   ${DEMO_USERS.length} (4 distinct accounts per role + aliases)`);
    console.log(`• Total Reports/Analyses: ${DEMO_ANALYSES.length}`);
    console.log(`  - Procurement Officer:   ${poCount} comprehensive reports`);
    console.log(`  - Government Department: ${deptCount} comprehensive reports`);
    console.log(`  - PSU:                   ${psuCount} comprehensive reports`);
    console.log(`  - Organization/Admin:    ${adminCount} comprehensive reports`);
    console.log(`• Standards Referenced:    ${totalStandards} verified BIS specifications`);
    console.log('-------------------------------------------------------------');
    console.log('DEMO ACCOUNTS READY (Password for ALL: Demo@12345):');
    console.log('1. Procurement Officer:');
    console.log('   - procurement1@anveshak.demo (CPWD Central)');
    console.log('   - procurement2@anveshak.demo (State PWD)');
    console.log('   - procurement3@anveshak.demo (Northern Railways)');
    console.log('   - procurement4@anveshak.demo (Military Engineer Services)');
    console.log('   - demo.procurement@anveshak.demo (Universal Alias)');
    console.log('2. Government Department:');
    console.log('   - department1@anveshak.demo (MoHUA)');
    console.log('   - department2@anveshak.demo (MoHFW)');
    console.log('   - department3@anveshak.demo (School Education)');
    console.log('   - department4@anveshak.demo (Jal Jeevan Mission)');
    console.log('   - demo.department@anveshak.demo (Universal Alias)');
    console.log('3. PSU:');
    console.log('   - psu1@anveshak.demo (NTPC Energy)');
    console.log('   - psu2@anveshak.demo (GAIL / IOCL)');
    console.log('   - psu3@anveshak.demo (POWERGRID)');
    console.log('   - psu4@anveshak.demo (SAIL Steel)');
    console.log('   - demo.psu@anveshak.demo (Universal Alias)');
    console.log('4. Organization/Admin:');
    console.log('   - admin1@anveshak.demo (Anveshak Lead Admin)');
    console.log('   - admin2@anveshak.demo (BIS Liaison DG)');
    console.log('   - admin3@anveshak.demo (DPIIT QCO Chief)');
    console.log('   - admin4@anveshak.demo (GeM Auditor)');
    console.log('   - demo.admin@anveshak.demo (Universal Alias)');
    console.log('=============================================================\n');

    return {
      success: true,
      users: DEMO_USERS.length,
      analyses: DEMO_ANALYSES.length,
      poCount,
      deptCount,
      psuCount,
      adminCount,
      totalStandards
    };
  } catch (err) {
    console.error('[Seed Error] Failed to seed demo database:', err);
    throw err;
  }
};

// If run directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDemoDatabase(true)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
