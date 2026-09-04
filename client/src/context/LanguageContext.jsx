import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // App & Header
    appTitle: 'AI-Powered Indian Standards Recommendation Engine',
    heroTitle: 'AI-Powered Indian Standards Recommendation Engine',
    heroSubtitle: 'Identify the right Indian Standards for your procurement specifications with intelligent, explainable recommendations.',
    nationalCopilot: 'National Procurement Copilot',
    bisAligned: 'Bureau of Indian Standards (BIS) Aligned',
    knowledgeBase: 'Knowledge Base',
    bisPortal: 'BIS Portal',
    officialBisPortal: 'Official BIS Portal',
    navSearchPlaceholder: 'Search Indian Standards (IS 10322, Cement, Pumps)...',

    // Navigation & Common
    dashboard: 'Dashboard',
    newAnalysis: 'New Analysis',
    tenderUpload: 'Upload Tender',
    analysisHistory: 'Analysis History',
    standardsExplorer: 'Standards Explorer',
    savedStandards: 'Saved Standards',
    reports: 'Reports',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Sign Out',
    signIn: 'Sign In',
    register: 'Register',
    signInToAccount: 'Sign In to Account',
    registerNewProfile: 'Register New Profile',
    back: 'Back',
    home: 'Home',
    quickActions: 'Quick Actions',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    clear: 'Clear',
    filter: 'Filter',
    search: 'Search',
    all: 'All',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    confidence: 'Confidence',
    active: 'Active',
    verified: 'Verified',
    mandate: 'Mandatory',

    // Responsible AI & Notices
    responsibleAiNotice: 'AI recommendations do not replace official BIS verification. Verify applicability on bis.gov.in prior to issuing tenders.',
    decisionSupport: 'Decision Support',
    statutoryGuidance: 'Responsible AI & Statutory Guidance',
    nonBinding: 'Non-Binding',
    verifyOnBis: 'Verify on Official BIS Portal',

    // Role Config & Titles
    procurementOfficerRole: 'Procurement Officer',
    govtDeptRole: 'Government Department',
    psuRole: 'Public Sector Undertaking (PSU)',
    adminRole: 'Organization / Admin',

    procurementDashboardTitle: 'Procurement Intelligence Dashboard',
    procurementDashboardSubtitle: 'Analyze procurement specifications, verify applicable Indian Standards, and eliminate compliance gaps.',
    deptDashboardTitle: 'Department Procurement Intelligence',
    deptDashboardSubtitle: 'Department-wide procurement oversight, statutory Quality Control Order compliance, and tender analytics.',
    psuDashboardTitle: 'PSU Procurement Compliance Dashboard',
    psuDashboardSubtitle: 'High-value technical procurement compliance, specialized equipment verification, and tender risk audits.',
    adminDashboardTitle: 'Anveshak Administration',
    adminDashboardSubtitle: 'Platform management, user governance, standards knowledge base indexing, and system health telemetry.',

    // KPI Metrics
    totalAnalyses: 'Total Analyses',
    completedAnalyses: 'Completed Analyses',
    pendingReview: 'Pending Review',
    savedStandardsCount: 'Saved Standards',
    activeMandates: 'Active QCO Mandates',
    departmentAnalyses: 'Department Analyses',
    compliantTenders: 'Compliant Tenders',
    departmentBookmarks: 'Department Bookmarks',
    activeReviews: 'Active Reviews',
    certifiedCompliant: 'Certified Compliant',
    highRiskReviews: 'High-Risk Reviews',
    referencedStandards: 'Referenced Standards',
    platformUsers: 'Platform Users',
    standardsIndexed: 'Standards Indexed',
    reportsGenerated: 'Reports Generated',
    standardsFound: 'Standards Recommended',

    // Demo Persona Bar
    switchDemoPersona: 'Switch Demo Stakeholder Persona',
    switchDemoAccount: 'Switch Demo Account • 32 Pre-Seeded Reports Per Role',
    accountPerRole: '1 Account Per Role',
    personaBarDesc: 'Click any demo account below to switch directly and view role-isolated procurement reports (32 pre-seeded analyses each).',
    liveRoleIsolationActive: 'Live Role Isolation Active',
    activeAccount: 'Active Account',
    switching: 'Switching...',
    clickToSwitch: 'Click to switch',

    // Dashboard Sections
    recentAnalyses: 'Recent Procurement Analyses',
    recentAnalysesSubtitle: 'Your recent specification analyses and verified Indian Standards dossiers.',
    viewAllHistory: 'View All History',
    procurementItem: 'Procurement Item',
    inputCategory: 'Input Category',
    standardsFoundCol: 'Standards Found',
    confidenceCol: 'Confidence',
    dateCol: 'Date',
    actionsCol: 'Actions',
    viewReport: 'View Report',
    openingReport: 'Opening...',
    noAnalysesYet: 'No procurement analyses yet.',
    noAnalysesYetSub: 'Upload your first tender or enter a technical specification to build your recommendation dossier.',
    startAnalysisBtn: 'Start Analysis',
    complianceAttentionRequired: 'Compliance & Attention Required',
    activeAlerts: 'Active Alerts',
    deptOverviewTitle: 'Department Procurement Intelligence Overview',
    qcoComplianceStatus: 'QCO Compliance Status',
    certifiedMandatePct: '100% Certified Mandate',
    trackedTendersComply: 'All tracked tenders comply with Gazette QCOs.',
    deptAudits: 'Department Audits',
    dossiersCount: 'Dossiers',
    archivedCvc: 'Archived and exportable for CVC inspection.',
    deptDirectives: 'Department Directives',
    inspectDeptReports: 'Inspect Department Reports',
    deptActiveReviews: 'Department Active Procurement Reviews',
    psuHighValueTitle: 'High-Value Critical Equipment Reviews',
    psuComplianceFlags: 'Critical Compliance Flags',
    adminGovernanceTitle: 'Platform Governance & User Registry',
    adminTelemetryTitle: 'System Telemetry & Live Activity',

    // New Analysis & Tender Upload
    analyzeSpec: 'Analyze Specification',
    newAnalysisHeaderTitle: 'Analyze Procurement Specification',
    newAnalysisHeaderSubtitle: 'Enter technical requirements in English, Hindi (हिंदी), or Hinglish, or speak requirement via Voice Input.',
    uploadTenderHeaderTitle: 'Upload Tender Document',
    uploadTenderHeaderSubtitle: 'Upload PDF tender documents for automated extraction of technical clauses, items, and applicable Indian Standards.',
    describeProduct: 'Product Specification',
    describeProductSub: 'Describe the product or procurement requirement in natural language.',
    tenderDoc: 'Tender Document',
    tenderDocSub: 'Upload a PDF tender/specification document for automated requirement extraction.',
    productName: 'Product Name',
    category: 'Product Category',
    specification: 'Specification / Technical Requirement',
    specPlaceholder: 'Example: We need 100W outdoor LED street lights for municipal roads. The lights should be waterproof (IP66), energy efficient, electrically safe, with surge protection up to 10kV.',
    quantity: 'Quantity (Optional)',
    additionalReqs: 'Additional Requirements (Optional)',
    analyzeBtn: 'Analyze Specification',
    analyzeTenderBtn: 'Analyze Tender Specification',
    extractingStandards: 'Extracting structured requirements, checking revisions, and analyzing Indian Standards...',
    sampleTenders: 'Sample Tender Presets',
    dropPdfHere: 'Drag & drop your tender document here, or browse',
    supportsPdf: 'Supports PDF tender documents up to 25MB',
    browseFiles: 'Browse Files',

    // Reports Repository & Dossier
    procurementDocumentation: 'Procurement Documentation',
    complianceDossiers: 'Standards Compliance Dossiers',
    reportsRepoTitle: 'Procurement Reports Repository',
    reportsRepoSubtitle: 'Export, download, and manage formal compliance assessment dossiers ready for inclusion in official tender files.',
    generateNewReport: 'Generate New Report',
    searchReportsPlaceholder: 'Search reports by keyword, product, or standard...',
    viewFullDossier: 'View Full Dossier',
    downloadPdf: 'Download PDF Report',
    printReport: 'Print Report',
    deleteReport: 'Delete Report',
    confirmDeleteReport: 'Are you sure you want to permanently delete this procurement report?',
    actionCannotBeUndone: 'This action cannot be undone. All compliance gap assessments will be archived.',
    noReportsFound: 'No reports found matching criteria',
    tabOverview: 'Overview',
    tabStandards: 'Standards',
    tabRelationships: 'Relationships',
    tabGaps: 'Gap Analysis',
    tabCompliance: 'Compliance',
    tabSpecification: 'Improved Specification',
    tabReport: 'Report Dossier',
    primaryStandards: 'Primary Recommended Standards',
    relatedStandards: 'Related & Allied Standards',
    testingSafetyStandards: 'Testing & Safety Standards',
    certificationSection: 'Certification & Compliance Mandates',
    aiExplanation: 'Why These Standards? (AI Analysis)',
    matchedRequirements: 'Matched Requirements',
    confidenceScore: 'Confidence / Relevance Score',
    viewDetails: 'View Details',
    saveStandard: 'Save Standard',
    saved: 'Saved',

    // Standards Explorer & Modal
    standardsCorpus: 'Standards Corpus',
    bisRepoSubtitle: 'Bureau of Indian Standards Repository',
    explorerTitle: 'Indian Standards Explorer',
    explorerSubtitle: 'Browse, search, and verify national standard specifications (IS), mandatory Quality Control Orders (QCOs), testing protocols, and certification schemes.',
    searchStandardsPlaceholder: 'Search by IS number, title, keyword (e.g. IS 10322, LED street light, 53 grade cement, TMT, IP65, PPE)...',
    resetFilters: 'Reset Filters',
    categoryLabel: 'Category',
    allCategories: 'All Categories',
    industryLabel: 'Industry',
    allIndustries: 'All Industries',
    statusLabel: 'Status',
    allStatuses: 'All Statuses',
    yearLabel: 'Year of Publication',
    allYears: 'All Years',
    certLabel: 'Certification',
    allCertifications: 'All Mandates',
    showingStandards: 'Showing Indian Standards',
    noStandardsMatch: 'No Indian Standards match your current search filters.',
    tryRefiningFilters: 'Try clearing some filters or searching with a broader product keyword.',
    viewSpecsMandates: 'View Specifications & Mandates',
    standardSpecsModalTitle: 'Standard Specifications',
    scopeOfStandard: 'Scope of Standard',
    industrySector: 'Industry Sector',
    supersedes: 'Supersedes',
    lastVerifiedDate: 'Last Verified Date',
    conformityScheme: 'Conformity & Certification Scheme',
    normativeReferences: 'Normative References',
    mandatoryTestingStandards: 'Mandatory Testing Standards',
    notifiedAmendments: 'Notified Amendments & History',
    openDedicatedPage: 'Open Dedicated Page',
    officialVerificationNotice: 'Official Verification Notice: Always verify the current official edition, latest published amendments, and statutory applicability on the BIS portal (manakonline.in) before citing this standard in binding tender contracts.',

    // Voice Input
    voiceInput: 'Voice Input',
    stopRecording: 'Stop Recording',
    capturedVoice: 'Captured',
    clearVoicePreview: 'Clear preview',
    listeningIn: 'Listening in',
    speakClearly: 'Speak clearly',
    voiceNotSupported: 'Voice (Not supported in this browser)',
    micAccessDenied: 'Microphone access was denied. Please allow microphone permissions in your browser bar.',
    noSpeechDetected: 'No speech detected. Please speak closer to the microphone.',
    speechNetworkError: 'Speech recognition network error. Please retry.',

    // Auth & Forms
    signInHeader: 'Sign In to Procurement Engine',
    signInSubheader: 'Official Decision Support Portal for Indian Standards & BIS Compliance',
    registerHeader: 'Create Official Anveshak Account',
    registerSubheader: 'National Decision Support Platform for Indian Standards Procurement',
    accountTypeLabel: 'Account Type *',
    officialEmailLabel: 'Official Email Address',
    officialEmailLabelReq: 'Official Email Address *',
    passwordLabel: 'Password',
    passwordLabelReq: 'Password *',
    confirmPasswordLabel: 'Confirm Password *',
    fullNameLabel: 'Full Name *',
    orgDeptLabel: 'Organization / Department *',
    forgotPasswordLink: 'Forgot password?',
    signInButton: 'Sign In to Dashboard',
    createAccountButton: 'Create Official Account',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    registerHere: 'Register here',
    signInHere: 'Sign in here',
    demoAccountsTitle: 'Role-Based Demo Accounts (4 Roles)',
    passDemo: 'Pass: Demo@12345',
    useDemoAccountBtn: 'Use Demo Account',

    // Form Validations
    errNameRequired: 'Full Name is required.',
    errEmailRequired: 'Official email is required.',
    errValidEmailRequired: 'Please provide a valid official email address.',
    errPasswordRequired: 'Password is required.',
    errPasswordLength: 'Password must be at least 6 characters long.',
    errPasswordMismatch: 'Passwords do not match. Please verify.',
    errOrgRequired: 'Organization / Department is required.',
    errAccountTypeRequired: 'Please select an Account Type.',
    errInvalidCredentials: 'Invalid official email or password.',
    errDemoAuthFailed: 'Demo authentication failed.',
    errSpecOrNameRequired: 'Please provide a product name or technical specification requirement.',
    errAnalysisFailed: 'Analysis failed. Please check network or retry.',

    // Alerts & Notifications
    procurementAlerts: 'Procurement Alerts',
    alertsCountNew: 'New',
    allCaughtUp: 'All caught up',
    markAllRead: 'Mark all read',
    noAlerts: 'No active procurement alerts',
    dismissAlert: 'Dismiss alert',

    // Status Badges
    statusAll: 'ALL',
    statusCompleted: 'Completed',
    statusUnderReview: 'Under Review',
    statusNeedsAttention: 'Needs Attention',
    statusComplianceRisk: 'Compliance Risk',
    statusDraft: 'Draft'
  },

  hi: {
    // App & Header
    appTitle: 'एआई-संचालित भारतीय मानक अनुशंसा प्रणाली',
    heroTitle: 'एआई-संचालित भारतीय मानक अनुशंसा प्रणाली',
    heroSubtitle: 'सार्वजनिक खरीद विनिर्देशों के लिए सटीक, व्याख्यात्मक और प्रमाणिक भारतीय मानकों (BIS Standards) की पहचान करें।',
    nationalCopilot: 'राष्ट्रीय खरीद सहायक (Copilot)',
    bisAligned: 'भारतीय मानक ब्यूरो (BIS) के अनुरूप',
    knowledgeBase: 'ज्ञानकोश (Knowledge Base)',
    bisPortal: 'बीआईएस पोर्टल',
    officialBisPortal: 'आधिकारिक बीआईएस पोर्टल',
    navSearchPlaceholder: 'भारतीय मानक खोजें (IS 10322, सीमेंट, पंप)...',

    // Navigation & Common
    dashboard: 'डैशबोर्ड',
    newAnalysis: 'नया AI विश्लेषण',
    tenderUpload: 'निविदा अपलोड',
    analysisHistory: 'विश्लेषण इतिहास',
    standardsExplorer: 'मानक अन्वेषक',
    savedStandards: 'सहेजे गए मानक',
    reports: 'खरीद रिपोर्ट',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    signIn: 'साइन इन',
    register: 'पंजीकरण',
    signInToAccount: 'खाते में साइन इन करें',
    registerNewProfile: 'नया प्रोफ़ाइल पंजीकृत करें',
    back: 'वापस',
    home: 'मुख्य पृष्ठ',
    quickActions: 'त्वरित कार्रवाई',
    close: 'बंद करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    delete: 'हटाएं',
    clear: 'साफ़ करें',
    filter: 'फ़िल्टर',
    search: 'खोजें',
    all: 'सभी',
    actions: 'कार्रवाई',
    status: 'स्थिति',
    date: 'दिनांक',
    confidence: 'विश्वसनीयता',
    active: 'सक्रिय',
    verified: 'सत्यापित',
    mandate: 'अनिवार्य',

    // Responsible AI & Notices
    responsibleAiNotice: 'निर्णय-सहायता प्रणाली: एआई अनुशंसाएं आधिकारिक बीआईएस सत्यापन का विकल्प नहीं हैं। निविदा जारी करने से पहले bis.gov.in पर पुष्टि करें।',
    decisionSupport: 'निर्णय-सहायता',
    statutoryGuidance: 'उत्तरदायी एआई और वैधानिक मार्गदर्शन',
    nonBinding: 'गैर-बाध्यकारी',
    verifyOnBis: 'आधिकारिक बीआईएस पोर्टल पर पुष्टि करें',

    // Role Config & Titles
    procurementOfficerRole: 'खरीद अधिकारी',
    govtDeptRole: 'सरकारी विभाग',
    psuRole: 'सार्वजनिक क्षेत्र का उपक्रम (PSU)',
    adminRole: 'संगठन / व्यवस्थापक',

    procurementDashboardTitle: 'खरीद आसूचना डैशबोर्ड',
    procurementDashboardSubtitle: 'खरीद विनिर्देशों का विश्लेषण करें, लागू भारतीय मानकों की पुष्टि करें और अनुपालन कमियों को दूर करें।',
    deptDashboardTitle: 'विभागीय खरीद आसूचना',
    deptDashboardSubtitle: 'विभाग स्तरीय खरीद निगरानी, वैधानिक गुणवत्ता नियंत्रण आदेश (QCO) अनुपालन एवं निविदा विश्लेषण।',
    psuDashboardTitle: 'PSU खरीद अनुपालन डैशबोर्ड',
    psuDashboardSubtitle: 'उच्च मूल्य वाली तकनीकी खरीद अनुपालन, विशेष उपकरण सत्यापन एवं निविदा जोखिम ऑडिट।',
    adminDashboardTitle: 'अन्वेषक प्रशासन',
    adminDashboardSubtitle: 'प्लेटफ़ॉर्म प्रबंधन, उपयोगकर्ता प्रशासन, मानक ज्ञानकोश अनुक्रमण और सिस्टम स्वास्थ्य टेलीमेट्री।',

    // KPI Metrics
    totalAnalyses: 'कुल विश्लेषण',
    completedAnalyses: 'पूर्ण विश्लेषण',
    pendingReview: 'लंबित समीक्षा',
    savedStandardsCount: 'सहेजे गए मानक',
    activeMandates: 'सक्रिय गुणवत्ता आदेश (QCOs)',
    departmentAnalyses: 'विभागीय विश्लेषण',
    compliantTenders: 'अनुपालक निविदाएं',
    departmentBookmarks: 'विभागीय बुकमार्क',
    activeReviews: 'सक्रिय समीक्षाएं',
    certifiedCompliant: 'प्रमाणित अनुपालक',
    highRiskReviews: 'उच्च जोखिम समीक्षाएं',
    referencedStandards: 'संदर्भित मानक',
    platformUsers: 'प्लेटफ़ॉर्म उपयोगकर्ता',
    standardsIndexed: 'अनुक्रमित मानक',
    reportsGenerated: 'उत्पन्न रिपोर्टें',
    standardsFound: 'अनुशंसित मानक',

    // Demo Persona Bar
    switchDemoPersona: 'डेमो हितधारक प्रोफ़ाइल बदलें',
    switchDemoAccount: 'डेमो खाता बदलें • प्रति भूमिका 32 पूर्व-लोड रिपोर्ट',
    accountPerRole: 'प्रति भूमिका 1 खाता',
    personaBarDesc: 'भूमिका-पृथक खरीद रिपोर्ट (प्रत्येक में 32 पूर्व-लोड विश्लेषण) देखने के लिए नीचे किसी भी डेमो खाते पर क्लिक करें।',
    liveRoleIsolationActive: 'सक्रिय भूमिका पृथक्करण चालू',
    activeAccount: 'सक्रिय खाता',
    switching: 'बदल रहा है...',
    clickToSwitch: 'बदलने के लिए क्लिक करें',

    // Dashboard Sections
    recentAnalyses: 'हाल के खरीद विश्लेषण',
    recentAnalysesSubtitle: 'आपके हालिया विनिर्देश विश्लेषण और सत्यापित भारतीय मानक डोजियर।',
    viewAllHistory: 'संपूर्ण इतिहास देखें',
    procurementItem: 'खरीद मद (Item)',
    inputCategory: 'इनपुट श्रेणी',
    standardsFoundCol: 'प्राप्त मानक',
    confidenceCol: 'विश्वसनीयता',
    dateCol: 'दिनांक',
    actionsCol: 'कार्रवाई',
    viewReport: 'रिपोर्ट देखें',
    openingReport: 'खुल रहा है...',
    noAnalysesYet: 'अभी कोई खरीद विश्लेषण उपलब्ध नहीं है।',
    noAnalysesYetSub: 'अपनी पहली निविदा अपलोड करें या अपनी अनुशंसा डोजियर बनाने के लिए तकनीकी विनिर्देश दर्ज करें।',
    startAnalysisBtn: 'विश्लेषण शुरू करें',
    complianceAttentionRequired: 'अनुपालन एवं आवश्यक ध्यान',
    activeAlerts: 'सक्रिय अलर्ट',
    deptOverviewTitle: 'विभागीय खरीद आसूचना अवलोकन',
    qcoComplianceStatus: 'QCO अनुपालन स्थिति',
    certifiedMandatePct: '100% प्रमाणित अनिवार्यता',
    trackedTendersComply: 'सभी ट्रैक की गई निविदाएं राजपत्र QCO का पालन करती हैं।',
    deptAudits: 'विभागीय ऑडिट',
    dossiersCount: 'डोजियर',
    archivedCvc: 'सीवीसी निरीक्षण हेतु पुरालेख और निर्यात योग्य।',
    deptDirectives: 'विभागीय निर्देश',
    inspectDeptReports: 'विभागीय रिपोर्टों का निरीक्षण करें',
    deptActiveReviews: 'विभाग की सक्रिय खरीद समीक्षाएं',
    psuHighValueTitle: 'उच्च-मूल्य महत्वपूर्ण उपकरण समीक्षाएं',
    psuComplianceFlags: 'महत्वपूर्ण अनुपालन संकेतक',
    adminGovernanceTitle: 'प्लेटफ़ॉर्म प्रशासन और उपयोगकर्ता रजिस्ट्री',
    adminTelemetryTitle: 'सिस्टम टेलीमेट्री और लाइव गतिविधि',

    // New Analysis & Tender Upload
    analyzeSpec: 'विनिर्देश का विश्लेषण करें',
    newAnalysisHeaderTitle: 'खरीद विनिर्देश का विश्लेषण करें',
    newAnalysisHeaderSubtitle: 'अंग्रेजी, हिंदी या हिंग्लिश में तकनीकी आवश्यकताएं दर्ज करें, या ध्वनि इनपुट द्वारा बोलें।',
    uploadTenderHeaderTitle: 'निविदा दस्तावेज़ अपलोड करें',
    uploadTenderHeaderSubtitle: 'तकनीकी धाराओं, मदों और लागू भारतीय मानकों के स्वचालित निष्कर्षण के लिए पीडीएफ निविदा अपलोड करें।',
    describeProduct: 'उत्पाद विनिर्देश (Specification)',
    describeProductSub: 'सरल भाषा में उत्पाद या खरीद आवश्यकताओं का विवरण दर्ज करें।',
    tenderDoc: 'निविदा दस्तावेज़ (Tender PDF)',
    tenderDocSub: 'स्वचालित आवश्यकता निष्कर्षण के लिए निविदा पीडीएफ दस्तावेज़ अपलोड करें।',
    productName: 'उत्पाद का नाम',
    category: 'उत्पाद श्रेणी',
    specification: 'तकनीकी विनिर्देश / आवश्यकताएं',
    specPlaceholder: 'उदाहरण: हमें नगर निगम की सड़कों के लिए 100W आउटडोर एलईडी स्ट्रीट लाइट चाहिए। लाइट वाटरप्रूफ (IP66), ऊर्जा कुशल, विद्युत सुरक्षित और 10kV सर्ज सुरक्षा वाली होनी चाहिए।',
    quantity: 'मात्रा (वैकल्पिक)',
    additionalReqs: 'अतिरिक्त आवश्यकताएं (वैकल्पिक)',
    analyzeBtn: 'विनिर्देश का विश्लेषण करें',
    analyzeTenderBtn: 'निविदा विनिर्देश का विश्लेषण करें',
    extractingStandards: 'संरचित आवश्यकताओं का निष्कर्षण, संशोधन जांच और भारतीय मानकों का विश्लेषण किया जा रहा है...',
    sampleTenders: 'नमूना निविदा प्रीसेट',
    dropPdfHere: 'अपनी निविदा पीडीएफ यहां खींचें और छोड़ें, या फ़ाइलें चुनें',
    supportsPdf: '25MB तक के पीडीएफ निविदा दस्तावेज़ समर्थित हैं',
    browseFiles: 'फ़ाइलें ब्राउज़ करें',

    // Reports Repository & Dossier
    procurementDocumentation: 'खरीद दस्तावेज़ीकरण',
    complianceDossiers: 'मानक अनुपालन डोजियर',
    reportsRepoTitle: 'खरीद रिपोर्ट संग्रह',
    reportsRepoSubtitle: 'आधिकारिक निविदा फाइलों में शामिल करने के लिए औपचारिक अनुपालन मूल्यांकन डोजियर निर्यात, डाउनलोड और प्रबंधित करें।',
    generateNewReport: 'नई रिपोर्ट बनाएं',
    searchReportsPlaceholder: 'कीवर्ड, उत्पाद या मानक द्वारा रिपोर्ट खोजें...',
    viewFullDossier: 'पूर्ण डोजियर देखें',
    downloadPdf: 'पीडीएफ रिपोर्ट डाउनलोड करें',
    printReport: 'रिपोर्ट प्रिंट करें',
    deleteReport: 'रिपोर्ट हटाएं',
    confirmDeleteReport: 'क्या आप वाकई इस खरीद रिपोर्ट को स्थायी रूप से हटाना चाहते हैं?',
    actionCannotBeUndone: 'यह कार्रवाई पूर्ववत नहीं की जा सकती। सभी अनुपालन कमियों का मूल्यांकन संग्रहीत किया जाएगा।',
    noReportsFound: 'मापदंड से मेल खाने वाली कोई रिपोर्ट नहीं मिली',
    tabOverview: 'अवलोकन',
    tabStandards: 'मानक',
    tabRelationships: 'पारस्परिक संबंध',
    tabGaps: 'कमी विश्लेषण',
    tabCompliance: 'अनुपालन',
    tabSpecification: 'उन्नत विनिर्देश',
    tabReport: 'रिपोर्ट डोजियर',
    primaryStandards: 'प्राथमिक अनुशंसित मानक',
    relatedStandards: 'संबंधित और संबद्ध मानक',
    testingSafetyStandards: 'परीक्षण और सुरक्षा मानक',
    certificationSection: 'प्रमाणन और अनुपालन अनिवार्यता',
    aiExplanation: 'यही मानक क्यों? (एआई विश्लेषण)',
    matchedRequirements: 'मिलान की गई आवश्यकताएं',
    confidenceScore: 'विश्वसनीयता / प्रासंगिकता स्कोर',
    viewDetails: 'विवरण देखें',
    saveStandard: 'मानक सहेजें',
    saved: 'सहेजा गया',

    // Standards Explorer & Modal
    standardsCorpus: 'मानक संग्रह (Corpus)',
    bisRepoSubtitle: 'भारतीय मानक ब्यूरो संग्रह',
    explorerTitle: 'भारतीय मानक अन्वेषक',
    explorerSubtitle: 'राष्ट्रीय मानक विनिर्देशों (IS), अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO), परीक्षण प्रोटोकॉल और प्रमाणन योजनाओं को खोजें और सत्यापित करें।',
    searchStandardsPlaceholder: 'IS संख्या, शीर्षक, कीवर्ड (उदा. IS 10322, LED स्ट्रीट लाइट, सीमेंट, TMT, IP65, PPE) द्वारा खोजें...',
    resetFilters: 'फ़िल्टर रीसेट करें',
    categoryLabel: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    industryLabel: 'उद्योग',
    allIndustries: 'सभी उद्योग',
    statusLabel: 'स्थिति',
    allStatuses: 'सभी स्थितियां',
    yearLabel: 'प्रकाशन वर्ष',
    allYears: 'सभी वर्ष',
    certLabel: 'प्रमाणन',
    allCertifications: 'सभी अनिवार्यताएं',
    showingStandards: 'भारतीय मानक प्रदर्शित हैं',
    noStandardsMatch: 'आपके वर्तमान खोज फ़िल्टर से कोई भारतीय मानक मेल नहीं खाता।',
    tryRefiningFilters: 'कुछ फ़िल्टर साफ़ करने या व्यापक उत्पाद कीवर्ड के साथ खोजने का प्रयास करें।',
    viewSpecsMandates: 'विनिर्देश और अनिवार्यताएं देखें',
    standardSpecsModalTitle: 'मानक विनिर्देश',
    scopeOfStandard: 'मानक का कार्यक्षेत्र (Scope)',
    industrySector: 'उद्योग क्षेत्र',
    supersedes: 'अधिक्रमण करता है',
    lastVerifiedDate: 'अंतिम सत्यापन तिथि',
    conformityScheme: 'अनुरूपता एवं प्रमाणन योजना',
    normativeReferences: 'मानक संदर्भ (Normative References)',
    mandatoryTestingStandards: 'अनिवार्य परीक्षण मानक',
    notifiedAmendments: 'अधिसूचित संशोधन और इतिहास',
    openDedicatedPage: 'समर्पित पृष्ठ खोलें',
    officialVerificationNotice: 'आधिकारिक सत्यापन सूचना: बाध्यकारी निविदा अनुबंधों में इस मानक का हवाला देने से पहले हमेशा बीआईएस पोर्टल (manakonline.in) पर वर्तमान आधिकारिक संस्करण, नवीनतम प्रकाशित संशोधनों और वैधानिक प्रयोज्यता की पुष्टि करें।',

    // Voice Input
    voiceInput: 'ध्वनि इनपुट',
    stopRecording: 'रिकॉर्डिंग रोकें',
    capturedVoice: 'रिकॉर्ड किया गया',
    clearVoicePreview: 'पूर्वावलोकन हटाएं',
    listeningIn: 'सुन रहे हैं',
    speakClearly: 'स्पष्ट बोलें',
    voiceNotSupported: 'ध्वनि (इस ब्राउज़र में समर्थित नहीं है)',
    micAccessDenied: 'माइक्रोफ़ोन एक्सेस अस्वीकार कर दिया गया था। कृपया अपने ब्राउज़र में अनुमति दें।',
    noSpeechDetected: 'कोई आवाज़ नहीं मिली। कृपया माइक्रोफ़ोन के करीब बोलें।',
    speechNetworkError: 'भाषण पहचान नेटवर्क त्रुटि। कृपया पुन: प्रयास करें।',

    // Auth & Forms
    signInHeader: 'खरीद इंजन में साइन इन करें',
    signInSubheader: 'भारतीय मानकों एवं बीआईएस अनुपालन हेतु आधिकारिक निर्णय-सहायता पोर्टल',
    registerHeader: 'आधिकारिक अन्वेषक खाता बनाएं',
    registerSubheader: 'भारतीय मानक खरीद हेतु राष्ट्रीय निर्णय-सहायता प्लेटफ़ॉर्म',
    accountTypeLabel: 'खाता प्रकार *',
    officialEmailLabel: 'आधिकारिक ईमेल पता',
    officialEmailLabelReq: 'आधिकारिक ईमेल पता *',
    passwordLabel: 'पासवर्ड',
    passwordLabelReq: 'पासवर्ड *',
    confirmPasswordLabel: 'पासवर्ड की पुष्टि करें *',
    fullNameLabel: 'पूरा नाम *',
    orgDeptLabel: 'संगठन / विभाग *',
    forgotPasswordLink: 'पासवर्ड भूल गए?',
    signInButton: 'डैशबोर्ड में साइन इन करें',
    createAccountButton: 'आधिकारिक खाता बनाएं',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    registerHere: 'यहाँ पंजीकरण करें',
    signInHere: 'यहाँ साइन इन करें',
    demoAccountsTitle: 'भूमिका-आधारित डेमो खाते (4 भूमिकाएं)',
    passDemo: 'पासवर्ड: Demo@12345',
    useDemoAccountBtn: 'डेमो खाता उपयोग करें',

    // Form Validations
    errNameRequired: 'पूरा नाम आवश्यक है।',
    errEmailRequired: 'आधिकारिक ईमेल आवश्यक है।',
    errValidEmailRequired: 'कृपया एक मान्य आधिकारिक ईमेल पता प्रदान करें।',
    errPasswordRequired: 'पासवर्ड आवश्यक है।',
    errPasswordLength: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
    errPasswordMismatch: 'पासवर्ड मेल नहीं खाता। कृपया जांचें।',
    errOrgRequired: 'संगठन / विभाग आवश्यक है।',
    errAccountTypeRequired: 'कृपया एक खाता प्रकार चुनें।',
    errInvalidCredentials: 'आधिकारिक ईमेल या पासवर्ड गलत है।',
    errDemoAuthFailed: 'डेमो प्रमाणीकरण विफल रहा।',
    errSpecOrNameRequired: 'कृपया उत्पाद का नाम या तकनीकी विनिर्देश आवश्यकता प्रदान करें।',
    errAnalysisFailed: 'विश्लेषण विफल रहा। कृपया नेटवर्क जांचें या पुन: प्रयास करें।',

    // Alerts & Notifications
    procurementAlerts: 'खरीद अलर्ट',
    alertsCountNew: 'नए',
    allCaughtUp: 'सभी अलर्ट पढ़े जा चुके हैं',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noAlerts: 'कोई सक्रिय खरीद अलर्ट नहीं है',
    dismissAlert: 'अलर्ट हटाएं',

    // Status Badges
    statusAll: 'सभी',
    statusCompleted: 'पूर्ण',
    statusUnderReview: 'समीक्षाधीन',
    statusNeedsAttention: 'ध्यान आवश्यक',
    statusComplianceRisk: 'अनुपालन जोखिम',
    statusDraft: 'प्रारूप'
  }
};

// Direct English-to-Hindi mapping for exact labels rendered in UI components
const ENGLISH_TO_HINDI_MAP = {
  // Navigation & General
  'Dashboard': 'डैशबोर्ड',
  'New AI Analysis': 'नया AI विश्लेषण',
  'New Analysis': 'नया AI विश्लेषण',
  'Upload Tender': 'निविदा अपलोड',
  'Analysis History': 'विश्लेषण इतिहास',
  'Standards Explorer': 'मानक अन्वेषक',
  'Saved Standards': 'सहेजे गए मानक',
  'Reports': 'खरीद रिपोर्ट',
  'Procurement Reports': 'खरीद रिपोर्ट',
  'Copilot Architecture': 'कॉपायलट वास्तुकला',
  'Evaluator Defense & FAQ': 'मूल्यांकनकर्ता अक्सर पूछे जाने वाले प्रश्न',
  'Settings': 'सेटिंग्स',
  'Platform Settings': 'प्लेटफ़ॉर्म सेटिंग्स',
  'Sign Out': 'लॉग आउट',
  'Sign In': 'साइन इन',
  'Register': 'पंजीकरण',
  'Sign In to Account': 'खाते में साइन इन करें',
  'Register New Profile': 'नया प्रोफ़ाइल पंजीकृत करें',
  'Back': 'वापस',
  'Overview': 'अवलोकन',
  'Standards': 'मानक',
  'Relationships': 'पारस्परिक संबंध',
  'Gap Analysis': 'कमी विश्लेषण',
  'Compliance': 'अनुपालन',
  'Improved Specification': 'उन्नत विनिर्देश',
  'Report Dossier': 'रिपोर्ट डोजियर',
  'Download PDF': 'पीडीएफ डाउनलोड करें',
  'Print Report': 'रिपोर्ट प्रिंट करें',
  'Delete Report': 'रिपोर्ट हटाएं',
  'Close': 'बंद करें',
  'Cancel': 'रद्द करें',
  'Save Standard': 'मानक सहेजें',
  'Saved in Repo': 'संग्रह में सहेजा गया',
  'Saved': 'सहेजा गया',
  'View Details': 'विवरण देखें',
  'View Report': 'रिपोर्ट देखें',
  'View Full Dossier': 'पूर्ण डोजियर देखें',
  'Clear': 'साफ़ करें',
  'Reset Filters': 'फ़िल्टर रीसेट करें',

  // Roles & Badges
  'Procurement Officer': 'खरीद अधिकारी',
  'Government Department': 'सरकारी विभाग',
  'Public Sector Undertaking (PSU)': 'सार्वजनिक क्षेत्र का उपक्रम (PSU)',
  'PSU': 'PSU',
  'PSU Executive': 'PSU कार्यकारी',
  'Platform Administrator': 'प्लेटफ़ॉर्म प्रशासक',
  'Organization / Admin': 'संगठन / व्यवस्थापक',
  'Organization/Admin': 'संगठन / व्यवस्थापक',
  'Department Director': 'विभाग निदेशक',
  'PSU Compliance': 'PSU अनुपालन',
  'Platform Admin': 'प्लेटफ़ॉर्म व्यवस्थापक',

  // Sidebar Sections
  'Main': 'मुख्य',
  'Procurement Operations': 'खरीद संचालन',
  'Standards Intelligence': 'मानक आसूचना',
  'Reference & Settings': 'संदर्भ एवं सेटिंग्स',
  'Department Procurement': 'विभागीय खरीद',
  'Compliance & Standards': 'अनुपालन एवं मानक',
  'Technical Procurement': 'तकनीकी खरीद',
  'Standards & Audits': 'मानक एवं ऑडिट',
  'Platform Governance': 'प्लेटफ़ॉर्म प्रशासन',
  'Knowledge Base': 'ज्ञानकोश',
  'Platform Reference': 'प्लेटफ़ॉर्म संदर्भ',

  // Role Config Actions
  'Analyze New Tender': 'नई निविदा का विश्लेषण करें',
  'Department Reports': 'विभागीय रिपोर्ट',
  'New Procurement Review': 'नई खरीद समीक्षा',
  'Upload Specification': 'विनिर्देश अपलोड करें',
  'User Directory': 'उपयोगकर्ता निर्देशिका',
  'Standards Knowledge Base': 'मानक ज्ञानकोश',
  'My Analysis History': 'मेरा विश्लेषण इतिहास',
  'Department Analyses': 'विभागीय विश्लेषण',
  'Analyze Tender Specification': 'निविदा विनिर्देश का विश्लेषण करें',
  'New Technical Analysis': 'नया तकनीकी विश्लेषण',
  'Upload Tender Package': 'निविदा पैकेज अपलोड करें',
  'Active PSU Reviews': 'सक्रिय PSU समीक्षाएं',
  'PSU Audit Reports': 'PSU ऑडिट रिपोर्ट',
  'Standards Intelligence Registry': 'मानक आसूचना रजिस्ट्री',
  'System Audit Trail': 'सिस्टम ऑडिट ट्रेल',
  'Demo Data Governance': 'डेमो डेटा प्रशासन',
  'All Reports Archive': 'सभी रिपोर्ट पुरालेख',
  'System Architecture': 'सिस्टम वास्तुकला',

  // KPI Metrics
  'Total Analyses': 'कुल विश्लेषण',
  'Completed Analyses': 'पूर्ण विश्लेषण',
  'Pending Review': 'लंबित समीक्षा',
  'Department Analyses': 'विभागीय विश्लेषण',
  'Active QCO Mandates': 'सक्रिय QCO अनिवार्यताएं',
  'Compliant Tenders': 'अनुपालक निविदाएं',
  'Department Bookmarks': 'विभागीय बुकमार्क',
  'Active Reviews': 'सक्रिय समीक्षाएं',
  'Certified Compliant': 'प्रमाणित अनुपालक',
  'High-Risk Reviews': 'उच्च जोखिम समीक्षाएं',
  'Referenced Standards': 'संदर्भित मानक',
  'Platform Users': 'प्लेटफ़ॉर्म उपयोगकर्ता',
  'Reports Generated': 'उत्पन्न रिपोर्टें',

  // Table Headers & Labels
  'Procurement Item': 'खरीद मद (Item)',
  'Input Category': 'इनपुट श्रेणी',
  'Standards Found': 'प्राप्त मानक',
  'Confidence': 'विश्वसनीयता',
  'Date': 'दिनांक',
  'Actions': 'कार्रवाई',

  // Status Filter Pills
  'ALL': 'सभी',
  'Completed': 'पूर्ण',
  'Under Review': 'समीक्षाधीन',
  'Needs Attention': 'ध्यान आवश्यक',
  'Compliance Risk': 'अनुपालन जोखिम',
  'Draft': 'प्रारूप',
  'Active Account': 'सक्रिय खाता',
  'Switching...': 'बदल रहा है...',

  // Footer & Landing
  'Official Indian Standards Portals': 'आधिकारिक भारतीय मानक पोर्टल',
  'Procurement Sectors': 'खरीद क्षेत्र',
  'Responsible AI Statement': 'उत्तरदायी एआई विवरण',
  'Electrical & LED Lighting': 'विद्युत एवं एलईडी लाइटिंग',
  'Civil Engineering & Cement': 'सिविल इंजीनियरिंग एवं सीमेंट',
  'TMT Steel & Structural Steel': 'टीएमटी स्टील एवं संरचनात्मक इस्पात',
  'Personal Protective Equipment (PPE)': 'व्यक्तिगत सुरक्षा उपकरण (PPE)',
  'Solar Photovoltaics & Energy': 'सौर फोटोवोल्टिक्स एवं ऊर्जा',
  'Pressurized Water Pipelines': 'दबावयुक्त जल पाइपलाइन',
  'Bureau of Indian Standards (BIS)': 'भारतीय मानक ब्यूरो (BIS)',
  'e-BIS (Official BIS Portal)': 'ई-बीआईएस (आधिकारिक बीआईएस पोर्टल)',
  'Government e-Marketplace (GeM)': 'गवर्नमेंट ई-मार्केटप्लेस (GeM)',
  'DPIIT Quality Control Orders': 'DPIIT गुणवत्ता नियंत्रण आदेश (QCO)',
  'For Government & Enterprise Procurement.': 'सरकारी और उद्यम खरीद के लिए।',
  'Built for Public Procurement Officers': 'सार्वजनिक खरीद अधिकारियों के लिए निर्मित',
  'Make in India Compliant': 'मेक इन इंडिया अनुपालक',
  'How It Works': 'यह कैसे काम करता है',
  'Key Capabilities': 'प्रमुख क्षमताएं',
  'Covered Standards': 'शामिल मानक',
  'AI-Driven Procurement Decision Support • GeM & GFR 2017 Aligned': 'एआई-संचालित खरीद निर्णय समर्थन • GeM और GFR 2017 के अनुरूप',

  // Saved Standards & Library
  'Department Repository': 'विभागीय संग्रह',
  'Bookmarked BIS Baselines': 'चिह्नित बीआईएस आधार रेखाएं',
  'Saved Standards Library': 'सहेजे गए मानक पुस्तकालय',
  'Manage bookmarked Indian Standards, customized procurement notes, and standard specifications for upcoming tenders.': 'सहेजे गए भारतीय मानकों, अनुकूलित खरीद टिप्पणियों और आगामी निविदाओं के लिए मानक विनिर्देशों का प्रबंधन करें।',
  'Explore Standards DB': 'मानक डेटाबेस खोजें',
  'Filter saved standards by number, title, or procurement notes...': 'संख्या, शीर्षक या खरीद नोट द्वारा सहेजे गए मानकों को फ़िल्टर करें...',
  'No Saved Standards in Library': 'पुस्तकालय में कोई सहेजा गया मानक नहीं है',
  'You can bookmark applicable standards from any recommendation report or directly from the Standards Explorer.': 'आप किसी भी अनुशंसा रिपोर्ट से या सीधे मानक अन्वेषक से लागू मानकों को बुकमार्क कर सकते हैं।',
  'Browse Standards Explorer': 'मानक अन्वेषक ब्राउज़ करें',
  'Inspect Standard': 'मानक का निरीक्षण करें',
  'Procurement Indent Note:': 'खरीद मांग पत्र टिप्पणी:',
  'Remove from bookmarks': 'बुकमार्क से हटाएं',
  'Bookmarked:': 'सहेजा गया:',
  'Opening...': 'खुल रहा है...',

  // Additional Dashboard & Result Labels
  'Welcome back': 'वापस स्वागत है',
  'Welcome back,': 'स्वागत है,',
  'Procurement Intelligence Dashboard': 'खरीद आसूचना डैशबोर्ड',
  'Recent Procurement Analyses': 'हालिया खरीद विश्लेषण',
  'Standards Recommended': 'अनुशंसित मानक',
  'Standards Mapped': 'मानचित्रित मानक',
  'Highly Relevant': 'अत्यधिक प्रासंगिक',
  'Relevant': 'प्रासंगिक',
  'Moderate': 'मध्यम',
  'Low Relevance': 'कम प्रासंगिकता',
  'View All History': 'संपूर्ण इतिहास देखें',
  'New Analysis': 'नया AI विश्लेषण',
  'Inspect Department Reports': 'विभागीय रिपोर्ट का निरीक्षण करें',
  'All tracked tenders comply with Gazette QCOs.': 'सभी ट्रैक की गई निविदाएं राजपत्र QCOs का अनुपालन करती हैं।',
  'Archived and exportable for CVC inspection.': 'CVC निरीक्षण हेतु पुरालेखित एवं निर्यात योग्य।',
  'QCO Compliance Status': 'QCO अनुपालन स्थिति',
  '100% Certified Mandate': '100% प्रमाणित अनिवार्यता',
  'Dossiers': 'डोजियर',
  'Department Directives': 'विभागीय निर्देश',
  'Active Alerts': 'सक्रिय अलर्ट'
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('anveshak_language') || localStorage.getItem('is_app_lang');
      if (saved === 'hi' || saved === 'en') {
        return saved;
      }
    } catch {}
    return 'en';
  });

  // Sync HTML lang attribute immediately on state or mount
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {}
  }, [lang]);

  const setLang = useCallback((newLang) => {
    const validLang = newLang === 'hi' ? 'hi' : 'en';
    setLangState(validLang);
    try {
      localStorage.setItem('anveshak_language', validLang);
      localStorage.setItem('is_app_lang', validLang);
    } catch {}
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = validLang;
      }
    } catch {}
  }, []);

  const toggleLanguage = useCallback((selectedLang) => {
    if (selectedLang) {
      setLang(selectedLang);
    } else {
      setLang(lang === 'en' ? 'hi' : 'en');
    }
  }, [lang, setLang]);

  /**
   * Safe universal translation helper:
   * 1. Checks key in dictionary (e.g. t('dashboard') or t('kpi.totalAnalyses'))
   * 2. If lang === 'hi' and direct English string passed (e.g. t('Dashboard')), looks up ENGLISH_TO_HINDI_MAP
   * 3. Falls back safely to English translation, fallback string, or key. Never undefined.
   */
  const t = useCallback((keyOrString, fallback) => {
    if (!keyOrString) return fallback || '';

    // Direct key lookup in active language
    const directTranslation = translations[lang]?.[keyOrString];
    if (directTranslation !== undefined && directTranslation !== null) {
      return directTranslation;
    }

    // Direct string lookup for English string when Hindi is active
    if (lang === 'hi') {
      const mappedHindi = ENGLISH_TO_HINDI_MAP[keyOrString] || ENGLISH_TO_HINDI_MAP[String(keyOrString).trim()];
      if (mappedHindi) {
        return mappedHindi;
      }
    }

    // Safe fallback to English translation
    const englishFallback = translations.en?.[keyOrString];
    if (englishFallback !== undefined && englishFallback !== null) {
      return englishFallback;
    }

    // Provided fallback or original string
    return fallback !== undefined && fallback !== null ? fallback : keyOrString;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLanguage,
    t
  }), [lang, setLang, toggleLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback if used outside provider
    return {
      lang: 'en',
      setLang: () => {},
      toggleLanguage: () => {},
      t: (k, fb) => fb || k
    };
  }
  return context;
};
