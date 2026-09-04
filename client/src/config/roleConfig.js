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
  if (r.includes('admin') || r === 'organization_admin' || r === 'admin') return ROLE_KEYS.ADMIN;
  if (r.includes('department') || r === 'government_department') return ROLE_KEYS.GOVERNMENT_DEPARTMENT;
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
  // 1. Procurement Officer
  {
    role: 'Procurement Officer',
    roleKey: ROLE_KEYS.PROCUREMENT_OFFICER,
    name: 'Sh. Rajesh Kumar',
    organization: 'CPWD — Central Procurement Division',
    organizationType: 'Central Government',
    email: 'procurement@anveshak.demo',
    password: 'Demo@12345',
    description: 'Central civil, electrical, lighting & building works procurement and tender vetting (32 BIS Reports)',
    badgeVariant: 'primary'
  },

  // 2. Government Department
  {
    role: 'Government Department',
    roleKey: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    name: 'Dr. Priya Sharma',
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    email: 'department@anveshak.demo',
    password: 'Demo@12345',
    description: 'Departmental oversight, statutory Quality Control Orders (QCO), and public infrastructure (32 BIS Reports)',
    badgeVariant: 'secondary'
  },

  // 3. PSU Executive
  {
    role: 'PSU Executive',
    roleKey: ROLE_KEYS.PSU,
    name: 'Sh. Amit Verma',
    organization: 'NTPC Energy & Thermal Generation Corporation',
    organizationType: 'PSU',
    email: 'psu@anveshak.demo',
    password: 'Demo@12345',
    description: 'Heavy power engineering, supercritical boiler tubes, turbines, and high-voltage audits (32 BIS Reports)',
    badgeVariant: 'warning'
  },

  // 4. Platform Administrator
  {
    role: 'Platform Administrator',
    roleKey: ROLE_KEYS.ADMIN,
    name: 'Anveshak Lead Administrator',
    organization: 'Bureau of Indian Standards (BIS) Directorate',
    organizationType: 'Central Government',
    email: 'admin@anveshak.demo',
    password: 'Demo@12345',
    description: 'Platform user governance, standards registry cataloging, system telemetry, and audit trails (32 BIS Reports)',
    badgeVariant: 'mandate'
  }
];

