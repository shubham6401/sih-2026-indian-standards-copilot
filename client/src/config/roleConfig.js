import {
  LayoutDashboard,
  Sparkles,
  UploadCloud,
  History,
  Compass,
  BookmarkCheck,
  FileSpreadsheet,
  Settings,
  Workflow,
  HelpCircle,
  Users,
  Shield,
  Award,
  Database,
  Building2,
  Activity,
  FileText
} from 'lucide-react';

export const ROLE_KEYS = {
  PROCUREMENT_OFFICER: 'procurement_officer',
  GOVERNMENT_DEPARTMENT: 'government_department',
  PSU: 'psu',
  ADMIN: 'admin'
};

export const normalizeRole = (role = '') => {
  const r = String(role).trim().toLowerCase();
  if (r.includes('admin') || r.includes('organization/admin')) return ROLE_KEYS.ADMIN;
  if (r.includes('department') || r.includes('government department')) return ROLE_KEYS.GOVERNMENT_DEPARTMENT;
  if (r.includes('psu') || r.includes('public sector')) return ROLE_KEYS.PSU;
  return ROLE_KEYS.PROCUREMENT_OFFICER;
};

export const ROLE_CONFIG = {
  [ROLE_KEYS.PROCUREMENT_OFFICER]: {
    key: ROLE_KEYS.PROCUREMENT_OFFICER,
    displayName: 'Procurement Officer',
    badgeTitle: 'Procurement Officer',
    badgeVariant: 'primary',
    organizationExample: 'CPWD — Central Public Works Department',
    dashboardTitle: 'Procurement Intelligence Dashboard',
    dashboardSubtitle: 'Analyze procurement specifications, verify applicable Indian Standards, and eliminate compliance gaps.',
    primaryActions: [
      { label: 'New AI Analysis', path: '/analysis/new', icon: Sparkles, variant: 'primary' },
      { label: 'Upload Tender', path: '/tender/upload', icon: UploadCloud, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Total Analyses', icon: FileText, color: 'blue' },
      { key: 'completedAnalyses', label: 'Completed Analyses', icon: Award, color: 'emerald' },
      { key: 'pendingReview', label: 'Pending Review', icon: Activity, color: 'amber' },
      { key: 'savedStandards', label: 'Saved Standards', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        items: [
          { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Procurement Operations',
        items: [
          { label: 'New AI Analysis', path: '/analysis/new', icon: Sparkles, highlight: true },
          { label: 'Upload Tender', path: '/tender/upload', icon: UploadCloud },
          { label: 'My Analysis History', path: '/history', icon: History }
        ]
      },
      {
        title: 'Standards Intelligence',
        items: [
          { label: 'Standards Explorer', path: '/explorer', icon: Compass },
          { label: 'Saved Standards', path: '/saved', icon: BookmarkCheck },
          { label: 'Procurement Reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_own', 'reports:create', 'reports:view_own', 'standards:view']
  },

  [ROLE_KEYS.GOVERNMENT_DEPARTMENT]: {
    key: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    displayName: 'Government Department',
    badgeTitle: 'Department Director',
    badgeVariant: 'mandate',
    organizationExample: 'Department of Public Works',
    dashboardTitle: 'Department Procurement Intelligence',
    dashboardSubtitle: 'Department-wide procurement oversight, statutory Quality Control Order compliance, and tender analytics.',
    primaryActions: [
      { label: 'Analyze New Tender', path: '/tender/upload', icon: UploadCloud, variant: 'primary' },
      { label: 'Department Reports', path: '/reports', icon: FileSpreadsheet, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Department Analyses', icon: Building2, color: 'blue' },
      { key: 'activeMandates', label: 'Active QCO Mandates', icon: Shield, color: 'rose' },
      { key: 'completedAnalyses', label: 'Compliant Tenders', icon: Award, color: 'emerald' },
      { key: 'savedStandards', label: 'Department Bookmarks', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        items: [
          { label: 'Department Overview', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Department Procurement',
        items: [
          { label: 'Analyze Tender Specification', path: '/tender/upload', icon: UploadCloud, highlight: true },
          { label: 'New AI Analysis', path: '/analysis/new', icon: Sparkles },
          { label: 'Department Analyses', path: '/history', icon: History }
        ]
      },
      {
        title: 'Compliance & Standards',
        items: [
          { label: 'Standards Explorer', path: '/explorer', icon: Compass },
          { label: 'Department Reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_department', 'reports:view_department', 'standards:view']
  },

  [ROLE_KEYS.PSU]: {
    key: ROLE_KEYS.PSU,
    displayName: 'Public Sector Undertaking (PSU)',
    badgeTitle: 'PSU Compliance',
    badgeVariant: 'warning',
    organizationExample: 'National Energy Infrastructure Corporation',
    dashboardTitle: 'PSU Procurement Compliance Dashboard',
    dashboardSubtitle: 'High-value technical procurement compliance, specialized equipment verification, and tender risk audits.',
    primaryActions: [
      { label: 'New Procurement Review', path: '/analysis/new', icon: Sparkles, variant: 'primary' },
      { label: 'Upload Specification', path: '/tender/upload', icon: UploadCloud, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Active Reviews', icon: Activity, color: 'blue' },
      { key: 'completedAnalyses', label: 'Certified Compliant', icon: Award, color: 'emerald' },
      { key: 'pendingReview', label: 'High-Risk Reviews', icon: Shield, color: 'amber' },
      { key: 'savedStandards', label: 'Referenced Standards', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        items: [
          { label: 'PSU Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Technical Procurement',
        items: [
          { label: 'New Technical Analysis', path: '/analysis/new', icon: Sparkles, highlight: true },
          { label: 'Upload Tender Package', path: '/tender/upload', icon: UploadCloud },
          { label: 'Active PSU Reviews', path: '/history', icon: History }
        ]
      },
      {
        title: 'Standards & Audits',
        items: [
          { label: 'Standards Explorer', path: '/explorer', icon: Compass },
          { label: 'Saved Standards', path: '/saved', icon: BookmarkCheck },
          { label: 'PSU Audit Reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_organization', 'reports:view_organization', 'standards:view']
  },

  [ROLE_KEYS.ADMIN]: {
    key: ROLE_KEYS.ADMIN,
    displayName: 'Organization / Admin',
    badgeTitle: 'Platform Admin',
    badgeVariant: 'success',
    organizationExample: 'Bureau of Indian Standards (BIS) Directorate',
    dashboardTitle: 'Anveshak Administration',
    dashboardSubtitle: 'Platform management, user governance, standards knowledge base indexing, and system health telemetry.',
    primaryActions: [
      { label: 'User Directory', path: '/admin/users', icon: Users, variant: 'primary' },
      { label: 'Standards Knowledge Base', path: '/explorer', icon: Database, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalUsers', label: 'Platform Users', icon: Users, color: 'blue' },
      { key: 'totalAnalyses', label: 'Total Analyses', icon: FileText, color: 'emerald' },
      { key: 'standardsIndexed', label: 'Standards Indexed', icon: Database, color: 'purple' },
      { key: 'reportsGenerated', label: 'Reports Generated', icon: FileSpreadsheet, color: 'amber' }
    ],
    navSections: [
      {
        title: 'Main',
        items: [
          { label: 'Admin Overview', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Platform Governance',
        items: [
          { label: 'Standards Intelligence Registry', path: '/admin/standards', icon: Database, highlight: true },
          { label: 'User Directory', path: '/admin/users', icon: Users },
          { label: 'System Audit Trail', path: '/admin/audit-logs', icon: Activity },
          { label: 'Demo Data Governance', path: '/admin/demo-data', icon: Shield },
          { label: 'All Reports Archive', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Knowledge Base',
        items: [
          { label: 'Standards Knowledge Base', path: '/explorer', icon: Database },
          { label: 'Standards Explorer', path: '/explorer', icon: Compass }
        ]
      },
      {
        title: 'Platform Reference',
        items: [
          { label: 'System Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Platform Settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['admin:manage_users', 'admin:view_all_analytics', 'admin:manage_standards', 'reports:view_all']
  }
};

export const DEMO_PERSONAS = [
  // --- Role 1: Procurement Officer (4 Accounts) ---
  {
    role: 'Procurement Officer',
    roleKey: ROLE_KEYS.PROCUREMENT_OFFICER,
    name: 'Sh. Rajesh Kumar',
    organization: 'CPWD — Central Procurement Division',
    organizationType: 'Central Government',
    email: 'procurement1@anveshak.demo',
    password: 'Demo@12345',
    description: 'Central government civil & electrical works procurement and tender vetting',
    badgeVariant: 'primary'
  },
  {
    role: 'Procurement Officer',
    roleKey: ROLE_KEYS.PROCUREMENT_OFFICER,
    name: 'Smt. Sunita Rao',
    organization: 'Maharashtra State PWD Infrastructure',
    organizationType: 'State Government',
    email: 'procurement2@anveshak.demo',
    password: 'Demo@12345',
    description: 'State highways, bridge construction, and regional civil projects',
    badgeVariant: 'primary'
  },
  {
    role: 'Procurement Officer',
    roleKey: ROLE_KEYS.PROCUREMENT_OFFICER,
    name: 'Sh. Manoj Joshi',
    organization: 'Northern Railway Engineering & Stores',
    organizationType: 'Central Government',
    email: 'procurement3@anveshak.demo',
    password: 'Demo@12345',
    description: 'Railway track materials, electrical substations, and rolling stock stores',
    badgeVariant: 'primary'
  },
  {
    role: 'Procurement Officer',
    roleKey: ROLE_KEYS.PROCUREMENT_OFFICER,
    name: 'Col. Deepak Verma',
    organization: 'Military Engineer Services (MES)',
    organizationType: 'Central Government',
    email: 'procurement4@anveshak.demo',
    password: 'Demo@12345',
    description: 'Defense cantonments, airfields, and tactical infrastructure procurement',
    badgeVariant: 'primary'
  },

  // --- Role 2: Government Department (4 Accounts) ---
  {
    role: 'Government Department',
    roleKey: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    name: 'Dr. Priya Sharma',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    email: 'department1@anveshak.demo',
    password: 'Demo@12345',
    description: 'Smart City infrastructure, mass transit e-buses, and urban planning',
    badgeVariant: 'secondary'
  },
  {
    role: 'Government Department',
    roleKey: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    name: 'Sh. K. V. Raman',
    organization: 'Ministry of Health & Family Welfare (MoHFW)',
    organizationType: 'Central Government',
    email: 'department2@anveshak.demo',
    password: 'Demo@12345',
    description: 'National hospital medical gas pipelines, PSA oxygen, and cold-chain vaccine networks',
    badgeVariant: 'secondary'
  },
  {
    role: 'Government Department',
    roleKey: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    name: 'Smt. Ananya Sen',
    organization: 'Department of School Education & Literacy',
    organizationType: 'Central Government',
    email: 'department3@anveshak.demo',
    password: 'Demo@12345',
    description: 'Educational institutional infrastructure, classroom ergonomics, and child safety',
    badgeVariant: 'secondary'
  },
  {
    role: 'Government Department',
    roleKey: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    name: 'Sh. Harish Chandra',
    organization: 'Department of Drinking Water & Sanitation (Jal Jeevan)',
    organizationType: 'Central Government',
    email: 'department4@anveshak.demo',
    password: 'Demo@12345',
    description: 'Rural multi-village water supply schemes, HDPE distribution, and water testing labs',
    badgeVariant: 'secondary'
  },

  // --- Role 3: PSU (4 Accounts) ---
  {
    role: 'PSU Executive',
    roleKey: ROLE_KEYS.PSU,
    name: 'Sh. Amit Verma',
    organization: 'NTPC Energy & Thermal Generation Corporation',
    organizationType: 'PSU',
    email: 'psu1@anveshak.demo',
    password: 'Demo@12345',
    description: 'Supercritical boiler tubes, slurry pumps, and renewable battery energy storage (BESS)',
    badgeVariant: 'warning'
  },
  {
    role: 'PSU Executive',
    roleKey: ROLE_KEYS.PSU,
    name: 'Smt. Meenakshi Sundaram',
    organization: 'GAIL & IOCL Hydrocarbon Pipeline Division',
    organizationType: 'PSU',
    email: 'psu2@anveshak.demo',
    password: 'Demo@12345',
    description: 'Cross-country API 5L gas pipelines, Class 600 gate valves, and refinery pressure vessels',
    badgeVariant: 'warning'
  },
  {
    role: 'PSU Executive',
    roleKey: ROLE_KEYS.PSU,
    name: 'Sh. Rakesh Singhal',
    organization: 'Power Grid Corporation of India (POWERGRID)',
    organizationType: 'PSU',
    email: 'psu3@anveshak.demo',
    password: 'Demo@12345',
    description: '765kV EHV transmission towers, 400kV SF6 gas insulated switchgear (GIS), and polymer insulators',
    badgeVariant: 'warning'
  },
  {
    role: 'PSU Executive',
    roleKey: ROLE_KEYS.PSU,
    name: 'Sh. Vikramaditya Rathore',
    organization: 'Steel Authority of India Limited (SAIL)',
    organizationType: 'PSU',
    email: 'psu4@anveshak.demo',
    password: 'Demo@12345',
    description: 'Heavy steel mill EOT cranes, blast furnace refractories, and heavy plate manufacturing',
    badgeVariant: 'warning'
  },

  // --- Role 4: Platform Administrator (4 Accounts) ---
  {
    role: 'Platform Administrator',
    roleKey: ROLE_KEYS.ADMIN,
    name: 'Anveshak Lead Administrator',
    organization: 'Anveshak Platform Operations & Standards Governance',
    organizationType: 'Autonomous Institution',
    email: 'admin1@anveshak.demo',
    password: 'Demo@12345',
    description: 'Continuous standards ingestion, revision approvals, user governance & system audit',
    badgeVariant: 'mandate'
  },
  {
    role: 'Platform Administrator',
    roleKey: ROLE_KEYS.ADMIN,
    name: 'Director General (Standards)',
    organization: 'Bureau of Indian Standards Liaison Directorate',
    organizationType: 'Central Government',
    email: 'admin2@anveshak.demo',
    password: 'Demo@12345',
    description: 'National standards harmonization, gazette revision monitoring, and BIS certification audits',
    badgeVariant: 'mandate'
  },
  {
    role: 'Platform Administrator',
    roleKey: ROLE_KEYS.ADMIN,
    name: 'Chief Technical Examiner',
    organization: 'DPIIT & QCO Regulatory Enforcement Cell',
    organizationType: 'Central Government',
    email: 'admin3@anveshak.demo',
    password: 'Demo@12345',
    description: 'Quality Control Order surveillance, market testing enforcement, and compliance investigations',
    badgeVariant: 'mandate'
  },
  {
    role: 'Platform Administrator',
    roleKey: ROLE_KEYS.ADMIN,
    name: 'National Procurement Auditor',
    organization: 'GeM Public Procurement Harmonization Division',
    organizationType: 'Autonomous Institution',
    email: 'admin4@anveshak.demo',
    password: 'Demo@12345',
    description: 'Government e-Marketplace category alignment, technical parameter audits, and CVC vetting',
    badgeVariant: 'mandate'
  }
];
