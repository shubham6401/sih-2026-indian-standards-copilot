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
    roleKey: 'procurementOfficerRole',
    displayName: 'Procurement Officer',
    badgeTitle: 'Procurement Officer',
    badgeVariant: 'primary',
    organizationExample: 'CPWD — Central Public Works Department',
    dashboardTitle: 'Procurement Intelligence Dashboard',
    dashboardTitleKey: 'procurementDashboardTitle',
    dashboardSubtitle: 'Analyze procurement specifications, verify applicable Indian Standards, and eliminate compliance gaps.',
    dashboardSubtitleKey: 'procurementDashboardSubtitle',
    primaryActions: [
      { label: 'New AI Analysis', labelKey: 'newAnalysis', path: '/analysis/new', icon: FileText, variant: 'primary' },
      { label: 'Upload Tender', labelKey: 'tenderUpload', path: '/tender/upload', icon: UploadCloud, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Total Analyses', labelKey: 'totalAnalyses', icon: FileText, color: 'blue' },
      { key: 'completedAnalyses', label: 'Completed Analyses', labelKey: 'completedAnalyses', icon: Award, color: 'emerald' },
      { key: 'pendingReview', label: 'Pending Review', labelKey: 'pendingReview', icon: Activity, color: 'amber' },
      { key: 'savedStandards', label: 'Saved Standards', labelKey: 'savedStandardsCount', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        titleKey: 'Main',
        items: [
          { label: 'Dashboard', labelKey: 'dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Procurement Operations',
        titleKey: 'Procurement Operations',
        items: [
          { label: 'New AI Analysis', labelKey: 'newAnalysis', path: '/analysis/new', icon: FileText, highlight: true },
          { label: 'Upload Tender', labelKey: 'tenderUpload', path: '/tender/upload', icon: UploadCloud },
          { label: 'My Analysis History', labelKey: 'My Analysis History', path: '/history', icon: History }
        ]
      },
      {
        title: 'Standards Intelligence',
        titleKey: 'Standards Intelligence',
        items: [
          { label: 'Standards Explorer', labelKey: 'standardsExplorer', path: '/explorer', icon: Compass },
          { label: 'Saved Standards', labelKey: 'savedStandards', path: '/saved', icon: BookmarkCheck },
          { label: 'Procurement Reports', labelKey: 'reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        titleKey: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', labelKey: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', labelKey: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Settings', labelKey: 'settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_own', 'reports:create', 'reports:view_own', 'standards:view']
  },

  [ROLE_KEYS.GOVERNMENT_DEPARTMENT]: {
    key: ROLE_KEYS.GOVERNMENT_DEPARTMENT,
    roleKey: 'govtDeptRole',
    displayName: 'Government Department',
    badgeTitle: 'Department Director',
    badgeVariant: 'mandate',
    organizationExample: 'Department of Public Works',
    dashboardTitle: 'Department Procurement Intelligence',
    dashboardTitleKey: 'deptDashboardTitle',
    dashboardSubtitle: 'Department-wide procurement oversight, statutory Quality Control Order compliance, and tender analytics.',
    dashboardSubtitleKey: 'deptDashboardSubtitle',
    primaryActions: [
      { label: 'Analyze New Tender', labelKey: 'Analyze New Tender', path: '/tender/upload', icon: UploadCloud, variant: 'primary' },
      { label: 'Department Reports', labelKey: 'Department Reports', path: '/reports', icon: FileSpreadsheet, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Department Analyses', labelKey: 'departmentAnalyses', icon: Building2, color: 'blue' },
      { key: 'activeMandates', label: 'Active QCO Mandates', labelKey: 'activeMandates', icon: Shield, color: 'rose' },
      { key: 'completedAnalyses', label: 'Compliant Tenders', labelKey: 'compliantTenders', icon: Award, color: 'emerald' },
      { key: 'savedStandards', label: 'Department Bookmarks', labelKey: 'departmentBookmarks', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        titleKey: 'Main',
        items: [
          { label: 'Department Overview', labelKey: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Department Procurement',
        titleKey: 'Department Procurement',
        items: [
          { label: 'Analyze Tender Specification', labelKey: 'Analyze Tender Specification', path: '/tender/upload', icon: UploadCloud, highlight: true },
          { label: 'New AI Analysis', labelKey: 'newAnalysis', path: '/analysis/new', icon: FileText },
          { label: 'Department Analyses', labelKey: 'departmentAnalyses', path: '/history', icon: History }
        ]
      },
      {
        title: 'Compliance & Standards',
        titleKey: 'Compliance & Standards',
        items: [
          { label: 'Standards Explorer', labelKey: 'standardsExplorer', path: '/explorer', icon: Compass },
          { label: 'Department Reports', labelKey: 'Department Reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        titleKey: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', labelKey: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', labelKey: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Settings', labelKey: 'settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_department', 'reports:view_department', 'standards:view']
  },

  [ROLE_KEYS.PSU]: {
    key: ROLE_KEYS.PSU,
    roleKey: 'psuRole',
    displayName: 'Public Sector Undertaking (PSU)',
    badgeTitle: 'PSU Compliance',
    badgeVariant: 'warning',
    organizationExample: 'National Energy Infrastructure Corporation',
    dashboardTitle: 'PSU Procurement Compliance Dashboard',
    dashboardTitleKey: 'psuDashboardTitle',
    dashboardSubtitle: 'High-value technical procurement compliance, specialized equipment verification, and tender risk audits.',
    dashboardSubtitleKey: 'psuDashboardSubtitle',
    primaryActions: [
      { label: 'New Procurement Review', labelKey: 'New Procurement Review', path: '/analysis/new', icon: FileText, variant: 'primary' },
      { label: 'Upload Specification', labelKey: 'Upload Specification', path: '/tender/upload', icon: UploadCloud, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalAnalyses', label: 'Active Reviews', labelKey: 'activeReviews', icon: Activity, color: 'blue' },
      { key: 'completedAnalyses', label: 'Certified Compliant', labelKey: 'certifiedCompliant', icon: Award, color: 'emerald' },
      { key: 'pendingReview', label: 'High-Risk Reviews', labelKey: 'highRiskReviews', icon: Shield, color: 'amber' },
      { key: 'savedStandards', label: 'Referenced Standards', labelKey: 'referencedStandards', icon: BookmarkCheck, color: 'purple' }
    ],
    navSections: [
      {
        title: 'Main',
        titleKey: 'Main',
        items: [
          { label: 'PSU Dashboard', labelKey: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Technical Procurement',
        titleKey: 'Technical Procurement',
        items: [
          { label: 'New Technical Analysis', labelKey: 'New Technical Analysis', path: '/analysis/new', icon: FileText, highlight: true },
          { label: 'Upload Tender Package', labelKey: 'Upload Tender Package', path: '/tender/upload', icon: UploadCloud },
          { label: 'Active PSU Reviews', labelKey: 'Active PSU Reviews', path: '/history', icon: History }
        ]
      },
      {
        title: 'Standards & Audits',
        titleKey: 'Standards & Audits',
        items: [
          { label: 'Standards Explorer', labelKey: 'standardsExplorer', path: '/explorer', icon: Compass },
          { label: 'Saved Standards', labelKey: 'savedStandards', path: '/saved', icon: BookmarkCheck },
          { label: 'PSU Audit Reports', labelKey: 'PSU Audit Reports', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Reference & Settings',
        titleKey: 'Reference & Settings',
        items: [
          { label: 'Copilot Architecture', labelKey: 'Copilot Architecture', path: '/architecture', icon: Workflow },
          { label: 'Settings', labelKey: 'settings', path: '/settings', icon: Settings }
        ]
      }
    ],
    permissions: ['analysis:create', 'analysis:view_organization', 'reports:view_organization', 'standards:view']
  },

  [ROLE_KEYS.ADMIN]: {
    key: ROLE_KEYS.ADMIN,
    roleKey: 'adminRole',
    displayName: 'Organization / Admin',
    badgeTitle: 'Platform Admin',
    badgeVariant: 'success',
    organizationExample: 'Bureau of Indian Standards (BIS) Directorate',
    dashboardTitle: 'Anveshak Administration',
    dashboardTitleKey: 'adminDashboardTitle',
    dashboardSubtitle: 'Platform management, user governance, standards knowledge base indexing, and system health telemetry.',
    dashboardSubtitleKey: 'adminDashboardSubtitle',
    primaryActions: [
      { label: 'User Directory', labelKey: 'User Directory', path: '/admin/users', icon: Users, variant: 'primary' },
      { label: 'Standards Knowledge Base', labelKey: 'Standards Knowledge Base', path: '/explorer', icon: Database, variant: 'secondary' }
    ],
    metricCards: [
      { key: 'totalUsers', label: 'Platform Users', labelKey: 'platformUsers', icon: Users, color: 'blue' },
      { key: 'totalAnalyses', label: 'Total Analyses', labelKey: 'totalAnalyses', icon: FileText, color: 'emerald' },
      { key: 'standardsIndexed', label: 'Standards Indexed', labelKey: 'standardsIndexed', icon: Database, color: 'purple' },
      { key: 'reportsGenerated', label: 'Reports Generated', labelKey: 'reportsGenerated', icon: FileSpreadsheet, color: 'amber' }
    ],
    navSections: [
      {
        title: 'Main',
        titleKey: 'Main',
        items: [
          { label: 'Admin Overview', labelKey: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'Platform Governance',
        titleKey: 'Platform Governance',
        items: [
          { label: 'Standards Intelligence Registry', labelKey: 'Standards Intelligence Registry', path: '/admin/standards', icon: Database, highlight: true },
          { label: 'User Directory', labelKey: 'User Directory', path: '/admin/users', icon: Users },
          { label: 'System Audit Trail', labelKey: 'System Audit Trail', path: '/admin/audit-logs', icon: Activity },
          { label: 'Demo Data Governance', labelKey: 'Demo Data Governance', path: '/admin/demo-data', icon: Shield },
          { label: 'All Reports Archive', labelKey: 'All Reports Archive', path: '/reports', icon: FileSpreadsheet }
        ]
      },
      {
        title: 'Knowledge Base',
        titleKey: 'Knowledge Base',
        items: [
          { label: 'Standards Knowledge Base', labelKey: 'Standards Knowledge Base', path: '/explorer', icon: Database },
          { label: 'Standards Explorer', labelKey: 'standardsExplorer', path: '/explorer', icon: Compass }
        ]
      },
      {
        title: 'Platform Reference',
        titleKey: 'Platform Reference',
        items: [
          { label: 'System Architecture', labelKey: 'System Architecture', path: '/architecture', icon: Workflow },
          { label: 'Evaluator Defense & FAQ', labelKey: 'Evaluator Defense & FAQ', path: '/evaluator-faq', icon: HelpCircle },
          { label: 'Platform Settings', labelKey: 'settings', path: '/settings', icon: Settings }
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
