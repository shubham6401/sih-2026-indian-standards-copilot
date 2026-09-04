// EXACTLY 4 DEMO ACCOUNTS — ONE FOR EACH ROLE (SIH 2026 EVALUATION)
export const DEMO_USERS = [
  // 1. Procurement Officer
  {
    demoKey: 'user_demo_po',
    name: 'Sh. Rajesh Kumar',
    email: 'procurement@anveshak.demo',
    password: 'Demo@12345',
    organization: 'CPWD — Central Procurement Division',
    organizationType: 'Central Government',
    accountType: 'procurement_officer',
    role: 'Procurement Officer',
    isDemo: true
  },

  // 2. Government Department
  {
    demoKey: 'user_demo_dept',
    name: 'Dr. Priya Sharma',
    email: 'department@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    accountType: 'government_department',
    role: 'Government Department',
    isDemo: true
  },

  // 3. Public Sector Undertaking (PSU)
  {
    demoKey: 'user_demo_psu',
    name: 'Sh. Amit Verma',
    email: 'psu@anveshak.demo',
    password: 'Demo@12345',
    organization: 'NTPC Energy & Thermal Generation Corporation',
    organizationType: 'PSU',
    accountType: 'psu',
    role: 'PSU',
    isDemo: true
  },

  // 4. Organization / Admin
  {
    demoKey: 'user_demo_admin',
    name: 'Anveshak Lead Administrator',
    email: 'admin@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Bureau of Indian Standards (BIS) Directorate',
    organizationType: 'Central Government',
    accountType: 'organization_admin',
    role: 'Organization/Admin',
    isDemo: true
  },

  // Convenient legacy aliases so previously entered emails still work
  {
    demoKey: 'user_demo_po_alias',
    name: 'Sh. Rajesh Kumar',
    email: 'procurement1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'CPWD — Central Procurement Division',
    organizationType: 'Central Government',
    accountType: 'procurement_officer',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_alias',
    name: 'Dr. Priya Sharma',
    email: 'department1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    accountType: 'government_department',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_alias2',
    name: 'Dr. Priya Sharma',
    email: 'dept1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    accountType: 'government_department',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_alias',
    name: 'Sh. Amit Verma',
    email: 'psu1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'NTPC Energy & Thermal Generation Corporation',
    organizationType: 'PSU',
    accountType: 'psu',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_alias',
    name: 'Anveshak Lead Administrator',
    email: 'admin1@anveshak.demo',
    password: 'Demo@12345',
    organization: 'Bureau of Indian Standards (BIS) Directorate',
    organizationType: 'Central Government',
    accountType: 'organization_admin',
    role: 'Organization/Admin',
    isDemo: true
  }
];

export const DEMO_PASSWORD = 'Demo@12345';
