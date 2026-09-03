import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. DEMO USERS: 4 ACCOUNTS FOR EACH ROLE + ALIASES
export const DEMO_USERS = [
  // --- ROLE 1: Procurement Officer (4 Accounts) ---
  {
    demoKey: 'user_demo_po_01',
    name: 'Sh. Rajesh Kumar',
    email: 'procurement1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'CPWD — Central Procurement Division',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_02',
    name: 'Smt. Sunita Rao',
    email: 'procurement2@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Maharashtra State PWD Infrastructure',
    organizationType: 'State Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_03',
    name: 'Sh. Manoj Joshi',
    email: 'procurement3@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Northern Railway Engineering & Stores',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_04',
    name: 'Col. Deepak Verma',
    email: 'procurement4@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Military Engineer Services (MES)',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_alias',
    name: 'Sh. Rajesh Kumar',
    email: 'demo.procurement@anveshak.demo',
    password: 'Demo@12345',
    organization: 'CPWD — Central Public Works Department',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_alias2',
    name: 'Sh. Rajesh Kumar',
    email: 'procurement.demo1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'CPWD — Central Public Works Department',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },

  // --- ROLE 2: Government Department (4 Accounts) ---
  {
    demoKey: 'user_demo_dept_01',
    name: 'Dr. Priya Sharma',
    email: 'department1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_02',
    name: 'Sh. K. V. Raman',
    email: 'department2@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Ministry of Health & Family Welfare (MoHFW)',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_03',
    name: 'Smt. Ananya Sen',
    email: 'department3@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Department of School Education & Literacy',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_04',
    name: 'Sh. Harish Chandra',
    email: 'department4@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Department of Drinking Water & Sanitation (Jal Jeevan)',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_alias',
    name: 'Dr. Priya Sharma',
    email: 'demo.department@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Department of Public Works & Urban Development',
    organizationType: 'State Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_alias2',
    name: 'Dr. Priya Sharma',
    email: 'government.demo1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Department of Public Works & Urban Development',
    organizationType: 'State Government',
    role: 'Government Department',
    isDemo: true
  },

  // --- ROLE 3: PSU (4 Accounts) ---
  {
    demoKey: 'user_demo_psu_01',
    name: 'Sh. Amit Verma',
    email: 'psu1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'NTPC Energy & Thermal Generation Corporation',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_02',
    name: 'Smt. Meenakshi Sundaram',
    email: 'psu2@anveshak.demo',
    password: 'Demo@12345',
    organization: 'GAIL & IOCL Hydrocarbon Pipeline Division',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_03',
    name: 'Sh. Rakesh Singhal',
    email: 'psu3@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Power Grid Corporation of India (POWERGRID)',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_04',
    name: 'Sh. Vikramaditya Rathore',
    email: 'psu4@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Steel Authority of India Limited (SAIL)',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_alias',
    name: 'Sh. Amit Verma',
    email: 'demo.psu@anveshak.demo',
    password: 'Demo@12345',
    organization: 'National Energy Infrastructure Corporation (NTPC-NEIC)',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_alias2',
    name: 'Sh. Amit Verma',
    email: 'psu.demo1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'National Energy Infrastructure Corporation (NTPC-NEIC)',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },

  // --- ROLE 4: Organization/Admin (4 Accounts) ---
  {
    demoKey: 'user_demo_admin_01',
    name: 'Anveshak Lead Administrator',
    email: 'admin1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Anveshak Platform Operations & Standards Governance',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_02',
    name: 'Director General (Standards)',
    email: 'admin2@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Bureau of Indian Standards Liaison Directorate',
    organizationType: 'Central Government',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_03',
    name: 'Chief Technical Examiner',
    email: 'admin3@anveshak.demo',
    password: 'Demo@12345',
    organization: 'DPIIT & QCO Regulatory Enforcement Cell',
    organizationType: 'Central Government',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_04',
    name: 'National Procurement Auditor',
    email: 'admin4@anveshak.demo',
    password: 'Demo@12345',
    organization: 'GeM Public Procurement Harmonization Division',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_alias',
    name: 'Anveshak Platform Admin',
    email: 'demo.admin@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Anveshak Platform Central Operations',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_alias2',
    name: 'Anveshak Platform Admin',
    email: 'admin.demo1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Anveshak Platform Central Operations',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  }
];

export const DEMO_PASSWORD = 'Demo@12345';
