/**
 * Anveshak — SIH 2026 Hackathon Demo Dataset
 * Realistic, verifiable Indian Standards procurement intelligence data
 * Deterministic seed records for 4 distinct stakeholder roles.
 */

export const DEMO_PASSWORD = 'Demo@12345';

export const DEMO_USERS = [
  // Procurement Officers (5 Accounts across Central, State, Autonomous & Municipal)
  {
    demoKey: 'user_demo_po_01',
    name: 'Rajesh Kumar',
    email: 'procurement.demo1@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'CPWD — Central Public Works Department',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_02',
    name: 'Manoj Joshi',
    email: 'procurement.demo2@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Maharashtra Public Works Department',
    organizationType: 'State Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_03',
    name: 'Ramesh Chander',
    email: 'procurement.demo3@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'All India Institute of Medical Sciences (AIIMS) Engineering',
    organizationType: 'Autonomous Institution',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_04',
    name: 'Sunil Mehta',
    email: 'procurement.demo4@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Ministry of Housing & Urban Affairs (MoHUA)',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_po_05',
    name: 'Deepak Verma',
    email: 'procurement.demo5@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'New Delhi Municipal Council (NDMC)',
    organizationType: 'State Government',
    role: 'Procurement Officer',
    isDemo: true
  },

  // Government Departments (4 Accounts across Public Works, Power, Highway & Water)
  {
    demoKey: 'user_demo_dept_01',
    name: 'Priya Sharma',
    email: 'government.demo1@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Department of Public Works & Urban Development',
    organizationType: 'State Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_02',
    name: 'Sunita Rao',
    email: 'government.demo2@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Ministry of New and Renewable Energy (MNRE)',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_03',
    name: 'K. Ramanathan',
    email: 'government.demo3@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'National Highways Authority of India (NHAI)',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_04',
    name: 'Arun Saxena',
    email: 'government.demo4@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Department of Drinking Water and Sanitation',
    organizationType: 'Central Government',
    role: 'Government Department',
    isDemo: true
  },

  // PSUs (4 Accounts across Energy, Heavy Electricals, Petroleum & Mining)
  {
    demoKey: 'user_demo_psu_01',
    name: 'Amit Verma',
    email: 'psu.demo1@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'National Energy Infrastructure Corporation (NTPC-NEIC)',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_02',
    name: 'Dr. Sanjay Sen',
    email: 'psu.demo2@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Bharat Heavy Electricals & Power Gear Corporation',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_03',
    name: 'Vikram Malhotra',
    email: 'psu.demo3@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Indian Petroleum & Natural Gas Infrastructure Ltd',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_04',
    name: 'R. K. Nair',
    email: 'psu.demo4@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'National Mineral & Steel Development Corporation',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },

  // Administrators (2 Accounts)
  {
    demoKey: 'user_demo_admin_01',
    name: 'Anveshak Lead Administrator',
    email: 'admin.demo1@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Anveshak Platform Operations',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_02',
    name: 'BIS Compliance Auditor',
    email: 'admin.demo2@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Technical Standards Directorate',
    organizationType: 'Central Government',
    role: 'Organization/Admin',
    isDemo: true
  },

  // Backwards compatibility aliases
  {
    demoKey: 'user_demo_po_alias',
    name: 'Rajesh Kumar',
    email: 'demo.procurement@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'CPWD — Central Public Works Department',
    organizationType: 'Central Government',
    role: 'Procurement Officer',
    isDemo: true
  },
  {
    demoKey: 'user_demo_dept_alias',
    name: 'Priya Sharma',
    email: 'demo.department@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Department of Public Works',
    organizationType: 'State Government',
    role: 'Government Department',
    isDemo: true
  },
  {
    demoKey: 'user_demo_psu_alias',
    name: 'Amit Verma',
    email: 'demo.psu@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'National Energy Infrastructure Corporation',
    organizationType: 'PSU',
    role: 'PSU',
    isDemo: true
  },
  {
    demoKey: 'user_demo_admin_alias',
    name: 'Anveshak Administrator',
    email: 'demo.admin@anveshak.demo',
    password: DEMO_PASSWORD,
    organization: 'Anveshak Platform',
    organizationType: 'Autonomous Institution',
    role: 'Organization/Admin',
    isDemo: true
  }
];

// Helper to compute realistic historical dates
const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export const DEMO_ANALYSES = [
  // ==========================================
  // 1. RAJESH KUMAR (Procurement Officer) - 12 Analyses
  // ==========================================
  {
    demoKey: 'po_analysis_01',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: '100W Outdoor LED Street Light',
    productCategory: 'LED Lighting',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '2500 Units',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(1),
    rawInput: '100W outdoor LED street lights for municipal roads with IP66 waterproof housing, energy efficacy above 120 lm/W and surge protection up to 10kV.',
    explanation: 'Evaluated against Bureau of Indian Standards corpus. Primary luminaire specification matches IS 10322 (Part 5/Sec 3), electronic controlgear aligns with IS 15885, and photometric testing adheres to IS 16107.',
    primaryStandards: [
      {
        standardNumber: 'IS 10322 (Part 5/Sec 3): 2012',
        title: 'Luminaires - Particular Requirements - Section 3: Luminaires for Road and Street Lighting',
        relevanceScore: 95,
        edition: '3rd Revision',
        status: 'Current',
        category: 'LED Lighting',
        whyRecommended: 'Mandatory standard governing road, highway, and public municipal street luminaires.',
        keyRequirements: ['IP66 Ingress Protection', '10kV Surge Immunity', 'Photometric Distribution', 'Thermal Dissipation']
      },
      {
        standardNumber: 'IS 15885 (Part 2/Sec 13): 2012',
        title: 'Safety of Lamp Controlgear - Part 2: Particular Requirements - Section 13: Electronic Controlgear for LED Modules',
        relevanceScore: 91,
        edition: '1st Revision',
        status: 'Current',
        category: 'LED Lighting',
        whyRecommended: 'Mandatory driver safety compliance under MeitY Compulsory Registration Scheme (CRS).'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 16107 (Part 2/Sec 1): 2012',
        title: 'Luminaires Performance - Part 2: Section 1: LED Luminaires',
        relationshipType: 'Testing Standard',
        relevanceScore: 89
      },
      {
        standardNumber: 'IS/IEC 60529: 2001',
        title: 'Degrees of Protection Provided by Enclosures (IP Code)',
        relationshipType: 'Normative Reference',
        relevanceScore: 86
      }
    ],
    tenderGaps: [
      {
        category: 'Testing Clause',
        severity: 'HIGH',
        title: 'Missing Type Test Report Requirement',
        description: 'Tender specification lacks clause mandating accredited NABL laboratory photometric and ingress type test certificates.',
        remedy: 'Mandate test certificates in accordance with IS 16107 (Part 2/Sec 1).'
      }
    ],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 10322 (Part 5/Sec 3) & IS 15885 (Part 2/Sec 13)',
        authority: 'Ministry of Electronics & IT (MeitY) / BIS',
        mandateReason: 'Covered under Electronics and IT Goods Quality Control Order. Bidders must hold active R-Number registration.',
        verificationNote: 'Verify valid MeitY CRS R-Number on official BIS portal (crsbis.in).'
      },
      {
        type: 'BEE Star Labeling Energy Rating',
        status: 'Applicable',
        standardNumber: 'IS 16107',
        authority: 'Bureau of Energy Efficiency (BEE)',
        mandateReason: 'Mandatory star rating label under Energy Conservation Act norms.',
        verificationNote: 'Verify star label rating on BEE portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 94,
      statusLabel: 'Tender Ready (High Quality)',
      actionCount: 1,
      breakdown: { standardsCoverage: 96, testingCoverage: 88, safetyCoverage: 95, certificationCoverage: 94, versionCurrency: 98, technicalCompleteness: 93 }
    },
    improvedSpecification: '100W LED Street Lighting Luminaire manufactured in strict accordance with IS 10322 (Part 5/Sec 3): 2012. Controlgear shall be compliant with IS 15885 (Part 2/Sec 13): 2012 and carry valid BIS CRS Registration. Luminaire housing must achieve IP66 as per IS/IEC 60529 with minimum 10kV surge protection.'
  },
  {
    demoKey: 'po_analysis_02',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Ordinary Portland Cement (53 Grade)',
    productCategory: 'Cement & Building Materials',
    status: 'Completed',
    reportType: 'Indian Standards Recommendation Report',
    quantity: '500 Metric Tonnes',
    confidenceScore: 96,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(2),
    rawInput: 'Ordinary Portland Cement 53 Grade for RCC bridges and multi-storey government building construction with 28-day compressive strength not less than 53 MPa.',
    explanation: 'OPC 53 Grade is strictly governed by IS 269: 2015. Mandatory BIS ISI certification applies under the Cement (Quality Control) Order.',
    primaryStandards: [
      {
        standardNumber: 'IS 269: 2015',
        title: 'Ordinary Portland Cement - Specification (6th Revision)',
        relevanceScore: 98,
        edition: '6th Revision',
        status: 'Current',
        category: 'Building Materials',
        whyRecommended: 'Unified Indian Standard covering 33, 43, and 53 Grade Ordinary Portland Cement.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 4031 (Part 1-15)',
        title: 'Methods of Physical Tests for Hydraulic Cement',
        relationshipType: 'Testing Standard',
        relevanceScore: 91
      },
      {
        standardNumber: 'IS 4032: 1985',
        title: 'Method of Chemical Analysis of Hydraulic Cement',
        relationshipType: 'Testing Standard',
        relevanceScore: 89
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 269: 2015',
        authority: 'DPIIT / Ministry of Commerce & Industry',
        mandateReason: 'Cement (Quality Control) Order strictly prohibits non-ISI certified cement in public tenders.',
        verificationNote: 'Verify valid 7-digit CML Number on official e-BIS portal (manakonline.in).'
      }
    ],
    procurementReadiness: {
      totalScore: 96,
      statusLabel: 'Tender Ready (Compliant)',
      actionCount: 0,
      breakdown: { standardsCoverage: 98, testingCoverage: 94, safetyCoverage: 95, certificationCoverage: 98, versionCurrency: 98, technicalCompleteness: 95 }
    },
    improvedSpecification: 'Ordinary Portland Cement (53 Grade) strictly conforming to IS 269: 2015 with mandatory ISI Mark. Consignments must be delivered in fresh bags with manufacturer test certificate confirming physical tests as per IS 4031.'
  },
  {
    demoKey: 'po_analysis_03',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: '5 HP Solar Submersible Water Pump Set',
    productCategory: 'Water Pumps & Renewable Energy',
    status: 'Completed',
    reportType: 'Procurement Readiness Report',
    quantity: '120 Sets',
    confidenceScore: 95,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(4),
    rawInput: '5 HP (3.7 kW) Solar Submersible Water Pump Set with 100m head, stainless steel impeller, and MPPT solar pump inverter for irrigation.',
    explanation: 'Submersible pumpsets are covered under mandatory QCO per IS 8034: 2018 with solar testing per MNRE and IS 14286 norms.',
    primaryStandards: [
      {
        standardNumber: 'IS 8034: 2018',
        title: 'Submersible Pumpsets - Specification',
        relevanceScore: 95,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Pumps & Motors',
        whyRecommended: 'Primary Indian Standard specifying electrical, hydraulic, and mechanical safety for submersible pumps.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 14286: 2010',
        title: 'Crystalline Silicon Terrestrial Photovoltaic (PV) Modules - Design Qualification and Type Approval',
        relationshipType: 'Testing Standard',
        relevanceScore: 88
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 8034: 2018',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Mandatory Submersible Pumps (Quality Control) Order.',
        verificationNote: 'Verify 7-digit CML Number on e-BIS Manakonline.'
      }
    ],
    procurementReadiness: {
      totalScore: 95,
      statusLabel: 'Tender Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 92, safetyCoverage: 94, certificationCoverage: 96, versionCurrency: 98, technicalCompleteness: 94 }
    },
    improvedSpecification: '5 HP Solar Submersible Pumpset conforming to IS 8034: 2018 with active BIS License. PV modules must be MNRE approved and tested per IS 14286.'
  },
  {
    demoKey: 'po_analysis_04',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Industrial Safety Helmets (Non-Metallic)',
    productCategory: 'Personal Protective Equipment',
    status: 'Completed',
    reportType: 'Certification & QCO Review',
    quantity: '3000 Nos',
    confidenceScore: 93,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(5),
    rawInput: 'Industrial Safety Helmets for civil construction workers with shock absorption, penetration resistance, electrical insulation up to 440V, and adjustable nape strap.',
    explanation: 'Industrial helmets are governed by IS 2925: 1984. Covered under mandatory Protective Helmets Quality Control Order.',
    primaryStandards: [
      {
        standardNumber: 'IS 2925: 1984',
        title: 'Specification for Industrial Safety Helmets',
        relevanceScore: 96,
        edition: '2nd Revision',
        status: 'Current',
        category: 'PPE',
        whyRecommended: 'Primary Indian Standard specifying impact absorption and penetration resistance.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 2925: 1984',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Protective Helmets QCO prohibits non-BIS certified helmets on government sites.',
        verificationNote: 'Verify CML Number on manakonline.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 94,
      statusLabel: 'Tender Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 90, safetyCoverage: 96, certificationCoverage: 96, versionCurrency: 92, technicalCompleteness: 94 }
    },
    improvedSpecification: 'Non-metallic industrial safety helmets bearing the official BIS ISI Mark as per IS 2925: 1984 with chin strap and adjustable headband.'
  },
  {
    demoKey: 'po_analysis_05',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Stainless Steel Water Storage Tank (5000L)',
    productCategory: 'Public Utilities & Storage',
    status: 'Under Review',
    reportType: 'Technical Specification Review',
    quantity: '40 Units',
    confidenceScore: 88,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(7),
    rawInput: '5000 Litre Food Grade Stainless Steel SS304 overhead potable water storage tanks with welded seams and airtight manhole cover.',
    explanation: 'Storage tanks for potable water must use food-grade stainless steel per IS 6911 with fabrication guidelines matching IS 15189.',
    primaryStandards: [
      {
        standardNumber: 'IS 15189: 2002',
        title: 'Specification for Stainless Steel Tanks for Water Storage',
        relevanceScore: 91,
        edition: '1st Revision',
        status: 'Current',
        category: 'Public Utilities',
        whyRecommended: 'Covers design and hygienic fabrication of stainless steel storage tanks.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 6911: 2017',
        title: 'Stainless Steel Plate, Sheet and Strip - Specification',
        relationshipType: 'Material Standard',
        relevanceScore: 87
      }
    ],
    tenderGaps: [
      {
        category: 'Material Verification',
        severity: 'MEDIUM',
        title: 'Food-Grade Passivation Verification Required',
        description: 'Tender does not specify pickling and chemical passivation testing after welding.',
        remedy: 'Add post-weld chemical passivation inspection clause per ASTM A380/IS norms.'
      }
    ],
    certifications: [
      {
        type: 'Material Test Certificate (MTC)',
        status: 'Applicable',
        standardNumber: 'IS 6911: 2017 Grade X04Cr19Ni9',
        authority: 'BIS / DPIIT Steel QCO',
        mandateReason: 'Steel products are subject to Steel and Steel Products Quality Control Order.',
        verificationNote: 'Ensure Mill Test Certificate from primary BIS licensed stainless steel producer.'
      }
    ],
    procurementReadiness: {
      totalScore: 86,
      statusLabel: 'Under Review — Attention Required',
      actionCount: 1,
      breakdown: { standardsCoverage: 90, testingCoverage: 78, safetyCoverage: 88, certificationCoverage: 85, versionCurrency: 90, technicalCompleteness: 85 }
    },
    improvedSpecification: '5000L Stainless Steel Water Storage Tank fabricated from SS304 prime sheet conforming to IS 6911: 2017, designed in accordance with IS 15189: 2002.'
  },
  {
    demoKey: 'po_analysis_06',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Computer Workstation for Government Office',
    productCategory: 'IT Equipment & Electronics',
    status: 'Completed',
    reportType: 'Tender Standards Analysis',
    quantity: '450 Nos',
    confidenceScore: 91,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(9),
    rawInput: 'Desktop Workstations for government offices with Intel Core i7 14th Gen, 32GB DDR5 RAM, 1TB NVMe SSD, 24-inch FHD IPS monitor, and OEM OS.',
    explanation: 'Information technology equipment is governed under MeitY Compulsory Registration Scheme per IS 13252 (Part 1): 2010.',
    primaryStandards: [
      {
        standardNumber: 'IS 13252 (Part 1): 2010',
        title: 'Information Technology Equipment - Safety - Part 1: General Requirements',
        relevanceScore: 94,
        edition: '2nd Revision',
        status: 'Current',
        category: 'IT Electronics',
        whyRecommended: 'Mandatory BIS CRS registration standard for desktop computers and displays.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 14886: 2000',
        title: 'Electromagnetic Compatibility (EMC) for IT Equipment',
        relationshipType: 'EMC Testing',
        relevanceScore: 86
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 13252 (Part 1): 2010',
        authority: 'MeitY / Bureau of Indian Standards',
        mandateReason: 'Electronics and IT Goods QCO mandates active CRS registration.',
        verificationNote: 'Verify R-Number on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 93,
      statusLabel: 'Tender Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 94, testingCoverage: 90, safetyCoverage: 95, certificationCoverage: 96, versionCurrency: 92, technicalCompleteness: 91 }
    },
    improvedSpecification: 'Commercial Desktop Workstation compliant with IS 13252 (Part 1): 2010 under MeitY CRS. OEM must possess valid BEE Energy Star certification.'
  },
  {
    demoKey: 'po_analysis_07',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'High Mast Lighting System (30 Meter)',
    productCategory: 'Electrical Infrastructure',
    status: 'Needs Attention',
    reportType: 'Compliance Gap Analysis',
    quantity: '18 Systems',
    confidenceScore: 82,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(11),
    rawInput: '30 Meter polygonal high mast tower with motorized winch lantern carriage, 12x 400W LED floodlights, wind speed design up to 180 km/h.',
    explanation: 'High mast fabrication requires structural steel to IS 2062, hot dip galvanizing to IS 4759, and wind loading calculations per IS 875 (Part 3).',
    primaryStandards: [
      {
        standardNumber: 'IS 875 (Part 3): 2015',
        title: 'Design Loads (Other Than Earthquake) for Buildings and Structures - Part 3: Wind Loads',
        relevanceScore: 92,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Structural Civil',
        whyRecommended: 'Mandatory code for structural wind resistance verification.'
      },
      {
        standardNumber: 'IS 2062: 2011',
        title: 'Hot Rolled Medium and High Tensile Structural Steel',
        relevanceScore: 90,
        edition: '7th Revision',
        status: 'Current',
        category: 'Steel Materials',
        whyRecommended: 'Governs high mast polygonal shaft plates.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 4759: 1996',
        title: 'Hot-Dip Zinc Coatings on Structural Steel and Other Allied Products',
        relationshipType: 'Corrosion Protection',
        relevanceScore: 88
      }
    ],
    tenderGaps: [
      {
        category: 'Structural Calculation',
        severity: 'HIGH',
        title: 'Missing Dynamic Wind Gust Factor Calculation',
        description: 'Tender omitted reference to terrain category dynamic gust calculation under revised IS 875 (Part 3): 2015.',
        remedy: 'Require structural design vetting by IIT/NIT/authorized civil engineering institute.'
      }
    ],
    certifications: [
      {
        type: 'Steel Products Quality Control Order',
        status: 'Applicable',
        standardNumber: 'IS 2062: 2011 Grade E350',
        authority: 'Ministry of Steel',
        mandateReason: 'Structural steel must be from primary BIS licensed steel mill.',
        verificationNote: 'Verify manufacturer BIS license on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 78,
      statusLabel: 'Needs Attention (Critical Gaps)',
      actionCount: 2,
      breakdown: { standardsCoverage: 85, testingCoverage: 70, safetyCoverage: 75, certificationCoverage: 85, versionCurrency: 82, technicalCompleteness: 71 }
    },
    improvedSpecification: '30m Polygonal High Mast Lighting System fabricated from High Tensile Steel Grade E350 per IS 2062: 2011, hot-dip galvanized as per IS 4759. Structural design must be vetted per IS 875 (Part 3): 2015.'
  },
  {
    demoKey: 'po_analysis_08',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Fire Extinguishing Equipment (ABC Dry Powder 6kg)',
    productCategory: 'Fire Safety & Prevention',
    status: 'Completed',
    reportType: 'Tender Risk Assessment',
    quantity: '1200 Nos',
    confidenceScore: 97,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(13),
    rawInput: 'Portable ABC Dry Chemical Powder Fire Extinguisher 6kg capacity with pressure gauge, brass valve, and discharge hose for public office buildings.',
    explanation: 'Portable fire extinguishers are regulated under IS 15683: 2018. Mandatory BIS certification applies under Fire Fighting Equipment QCO.',
    primaryStandards: [
      {
        standardNumber: 'IS 15683: 2018',
        title: 'Portable Fire Extinguishers - Performance and Construction - Specification',
        relevanceScore: 98,
        edition: '1st Revision',
        status: 'Current',
        category: 'Fire Safety',
        whyRecommended: 'Primary Indian Standard harmonized with international safety codes.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 4308: 2019',
        title: 'Dry Chemical Powder for Fire Fighting - Specification',
        relationshipType: 'Extinguishing Media',
        relevanceScore: 93
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 15683: 2018',
        authority: 'Ministry of Commerce & Industry / BIS',
        mandateReason: 'Mandatory BIS license required for sale and procurement of portable fire extinguishers.',
        verificationNote: 'Check active CML license on e-BIS Manakonline.'
      }
    ],
    procurementReadiness: {
      totalScore: 98,
      statusLabel: 'Tender Ready (Optimal)',
      actionCount: 0,
      breakdown: { standardsCoverage: 98, testingCoverage: 96, safetyCoverage: 99, certificationCoverage: 98, versionCurrency: 99, technicalCompleteness: 98 }
    },
    improvedSpecification: 'Portable 6kg ABC Dry Powder Fire Extinguisher bearing official BIS ISI Mark per IS 15683: 2018. Dry chemical powder media must independently conform to IS 4308: 2019.'
  },
  {
    demoKey: 'po_analysis_09',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Electrical Distribution Panel (415V Low Voltage)',
    productCategory: 'Power Distribution',
    status: 'Compliance Risk',
    reportType: 'Standards Relationship Report',
    quantity: '25 Assemblies',
    confidenceScore: 76,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(16),
    rawInput: 'Low Voltage 415V 3-phase Main Distribution Panel 800A busbar capacity, indoor floor mounted with ACB and MCCB outgoing feeders.',
    explanation: 'Tender specification referenced obsolete standard IS 8623 instead of harmonized low-voltage switchgear standard IS/IEC 61439-1.',
    primaryStandards: [
      {
        standardNumber: 'IS/IEC 61439-1: 2011',
        title: 'Low-Voltage Switchgear and Controlgear Assemblies - Part 1: General Rules',
        relevanceScore: 94,
        edition: '1st Edition',
        status: 'Current',
        category: 'Electrical Switchgear',
        whyRecommended: 'Supersedes legacy IS 8623. Specifies mandatory type-tested assembly design verification rules.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS/IEC 60947-2: 2016',
        title: 'Low-Voltage Switchgear - Circuit-Breakers',
        relationshipType: 'Component Standard',
        relevanceScore: 91
      }
    ],
    tenderGaps: [
      {
        category: 'Obsolete Standard Citation',
        severity: 'HIGH',
        title: 'Superseded IS 8623 Cited in Tender',
        description: 'Tender cites superseded standard IS 8623 which was withdrawn and replaced by IS/IEC 61439 series.',
        remedy: 'Revise tender clause to mandate design verification per IS/IEC 61439-1/2.'
      }
    ],
    certifications: [
      {
        type: 'Type Test Certification (CPRI / ERDA)',
        status: 'Applicable',
        standardNumber: 'IS/IEC 61439-1/2: 2011',
        authority: 'Central Power Research Institute (CPRI)',
        mandateReason: 'Distribution panels must possess accredited type test certificates for temperature rise and short-circuit withstand.',
        verificationNote: 'Inspect authenticated test reports from accredited laboratory.'
      }
    ],
    procurementReadiness: {
      totalScore: 72,
      statusLabel: 'Compliance Risk — Obsolete Standards',
      actionCount: 2,
      breakdown: { standardsCoverage: 80, testingCoverage: 65, safetyCoverage: 75, certificationCoverage: 70, versionCurrency: 60, technicalCompleteness: 82 }
    },
    improvedSpecification: 'Low Voltage 415V Switchgear Assembly conforming strictly to IS/IEC 61439-1 & 2: 2011. Enclosure protection minimum IP54 per IS/IEC 60529 with short-circuit withstand rating certified by CPRI/ERDA.'
  },
  {
    demoKey: 'po_analysis_10',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Solar Street Lighting System (Integrated All-in-One)',
    productCategory: 'Renewable Energy',
    status: 'Needs Attention',
    reportType: 'Improved Procurement Specification',
    quantity: '800 Units',
    confidenceScore: 81,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(19),
    rawInput: 'All-in-One Solar LED Street Light 30W with integrated LiFePO4 battery, mono-crystalline solar panel, and dusk-to-dawn automatic sensor.',
    explanation: 'Requires combination of IS 16107 (LED), IS 16046 (Lithium Battery safety), and IS 16270 (solar lighting controllers).',
    primaryStandards: [
      {
        standardNumber: 'IS 16107 (Part 2/Sec 1): 2012',
        title: 'Luminaires Performance - LED Luminaires',
        relevanceScore: 90,
        edition: '1st Revision',
        status: 'Current',
        category: 'Solar Lighting',
        whyRecommended: 'Governs LED photometric performance and life expectancy.'
      },
      {
        standardNumber: 'IS 16046 (Part 2): 2018',
        title: 'Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes - Secondary Lithium Cells and Batteries',
        relevanceScore: 92,
        edition: '1st Edition',
        status: 'Current',
        category: 'Battery Storage',
        whyRecommended: 'Mandatory MeitY CRS standard for Lithium batteries.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 16270: 2014',
        title: 'Secondary Cells and Batteries for Solar Photovoltaic Application',
        relationshipType: 'Allied Standard',
        relevanceScore: 84
      }
    ],
    tenderGaps: [
      {
        category: 'Battery Safety Clause',
        severity: 'HIGH',
        title: 'Missing LiFePO4 Battery Thermal Runaway Test Clause',
        description: 'Tender does not cite mandatory BIS CRS registration for integrated Lithium battery packs.',
        remedy: 'Mandate valid R-Number under IS 16046 (Part 2): 2018.'
      }
    ],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 16046 (Part 2): 2018',
        authority: 'MeitY / BIS',
        mandateReason: 'Lithium battery packs are covered under mandatory CRS.',
        verificationNote: 'Verify active registration on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 79,
      statusLabel: 'Needs Attention (Battery Safety)',
      actionCount: 1,
      breakdown: { standardsCoverage: 84, testingCoverage: 72, safetyCoverage: 76, certificationCoverage: 80, versionCurrency: 85, technicalCompleteness: 78 }
    },
    improvedSpecification: 'Integrated All-in-One Solar LED Street Light comprising IS 16107 compliant luminaire and LiFePO4 battery pack certified under IS 16046 (Part 2): 2018 with valid MeitY CRS R-Number.'
  },
  {
    demoKey: 'po_analysis_11',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'Structural Steel Hollow Sections for Prefabricated Shelters',
    productCategory: 'Civil Infrastructure',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '250 Metric Tonnes',
    confidenceScore: 90,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(22),
    rawInput: 'Rectangular and Square Hollow Sections (RHS/SHS) of structural steel Grade YSt 310 for construction of rapid disaster shelters.',
    explanation: 'Governed by IS 4923: 2017 with mandatory BIS license under Steel Products Quality Control Order.',
    primaryStandards: [
      {
        standardNumber: 'IS 4923: 2017',
        title: 'Hollow Steel Sections for Structural Use - Specification (3rd Revision)',
        relevanceScore: 95,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Structural Steel',
        whyRecommended: 'Primary Indian Standard for cold formed welded steel hollow sections.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 1608 (Part 1): 2018',
        title: 'Metallic Materials - Tensile Testing',
        relationshipType: 'Testing Standard',
        relevanceScore: 88
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 4923: 2017',
        authority: 'Ministry of Steel',
        mandateReason: 'Steel QCO prohibits purchase of uncertified hollow sections.',
        verificationNote: 'Verify 7-digit CML Number on manakonline.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 92,
      statusLabel: 'Tender Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 95, testingCoverage: 88, safetyCoverage: 92, certificationCoverage: 95, versionCurrency: 94, technicalCompleteness: 90 }
    },
    improvedSpecification: 'Structural Hollow Steel Sections (RHS/SHS) conforming strictly to IS 4923: 2017 Grade YSt 310 bearing the official BIS ISI Mark.'
  },
  {
    demoKey: 'po_analysis_12',
    userEmail: 'demo.procurement@anveshak.demo',
    productName: 'CPVC Plumbing Pipes & Fittings (Class 1)',
    productCategory: 'Water Supply & Sanitation',
    status: 'Draft',
    reportType: 'Technical Specification Review',
    quantity: '15000 Metres',
    confidenceScore: 85,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(25),
    rawInput: 'Chlorinated Polyvinyl Chloride (CPVC) pipes Class 1 (SDR 11) for hot and cold potable domestic water distribution systems.',
    explanation: 'CPVC plumbing pipes are specified under IS 15778: 2007 with fittings per IS 10124.',
    primaryStandards: [
      {
        standardNumber: 'IS 15778: 2007',
        title: 'Chlorinated Polyvinyl Chloride (CPVC) Pipes for Potable Hot and Cold Water Distribution Supplies - Specification',
        relevanceScore: 93,
        edition: '1st Edition',
        status: 'Current',
        category: 'Pipes & Fittings',
        whyRecommended: 'Primary Indian Standard specifying potable water safety and temperature ratings.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 15778: 2007',
        authority: 'DPIIT / BIS',
        mandateReason: 'Mandatory QCO for CPVC plumbing piping systems.',
        verificationNote: 'Verify CML Number on e-BIS portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 85,
      statusLabel: 'Draft — Ready for Review',
      actionCount: 0,
      breakdown: { standardsCoverage: 90, testingCoverage: 80, safetyCoverage: 85, certificationCoverage: 88, versionCurrency: 85, technicalCompleteness: 82 }
    },
    improvedSpecification: 'CPVC Pipes for potable hot and cold water distribution conforming to IS 15778: 2007 with valid BIS ISI Certification mark.'
  },

  // ==========================================
  // 2. PRIYA SHARMA (Government Department) - 16 Analyses
  // ==========================================
  {
    demoKey: 'dept_analysis_01',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Dense Bituminous Macadam (Road Construction Grade VG-30)',
    productCategory: 'Highway & Transport Infrastructure',
    status: 'Completed',
    reportType: 'Department Procurement Compliance Dossier',
    quantity: '12000 Metric Tonnes',
    confidenceScore: 95,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(1),
    rawInput: 'Viscosity Grade VG-30 Paving Bitumen for Dense Bituminous Macadam (DBM) base course on state highway expansion.',
    explanation: 'Road paving bitumen is strictly regulated under IS 73: 2013 and IRC 111. BIS certification is mandatory.',
    primaryStandards: [
      {
        standardNumber: 'IS 73: 2013',
        title: 'Paving Bitumen - Specification (4th Revision)',
        relevanceScore: 97,
        edition: '4th Revision',
        status: 'Current',
        category: 'Road Materials',
        whyRecommended: 'Defines viscosity grade norms VG-10, VG-20, VG-30, VG-40 for Indian road paving.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 1201 to IS 1220: 1978',
        title: 'Methods for Testing Tar and Bituminous Materials',
        relationshipType: 'Testing Standard',
        relevanceScore: 92
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 73: 2013',
        authority: 'Ministry of Road Transport & Highways (MoRTH) / BIS',
        mandateReason: 'Paving Bitumen Quality Control Order prohibits non-ISI marked bitumen in state highway tenders.',
        verificationNote: 'Verify valid CML license number on manakonline.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 96,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 98, testingCoverage: 95, safetyCoverage: 94, certificationCoverage: 97, versionCurrency: 98, technicalCompleteness: 96 }
    },
    improvedSpecification: 'Paving Bitumen Grade VG-30 strictly complying with IS 73: 2013 bearing the official BIS ISI Mark. Batch test reports per IS 1201-1220 must accompany each tanker consignment.'
  },
  {
    demoKey: 'dept_analysis_02',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Bridge Expansion Joints (Modular Elastomeric Strip Seal)',
    productCategory: 'Highway & Bridge Engineering',
    status: 'Under Review',
    reportType: 'Tender Risk Assessment',
    quantity: '450 Metres',
    confidenceScore: 86,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(2),
    rawInput: 'Modular strip seal bridge expansion joints for 80mm movement capacity on elevated urban viaduct project.',
    explanation: 'Expansion joints must comply with MoRTH specifications, IRC:SP:69, and chloroprene elastomeric strip seal standard IS 3400.',
    primaryStandards: [
      {
        standardNumber: 'IRC:SP:69-2011',
        title: 'Guidelines for Design and Installation of Jointless Bridges and Expansion Joints',
        relevanceScore: 92,
        edition: 'Revision 2011',
        status: 'Current',
        category: 'Bridge Infrastructure',
        whyRecommended: 'Apex Indian Roads Congress guideline governing expansion joints.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 3400 (Part 1-24)',
        title: 'Methods of Test for Vulcanized Rubber',
        relationshipType: 'Testing Standard',
        relevanceScore: 88
      }
    ],
    tenderGaps: [
      {
        category: 'Fatigue Testing',
        severity: 'MEDIUM',
        title: 'Absence of Dynamic Fatigue Life Verification Clause',
        description: 'Tender does not require 2-million cycle dynamic fatigue testing proof for edge beams.',
        remedy: 'Incorporate IRC:SP:69 Section 5 fatigue test compliance.'
      }
    ],
    certifications: [
      {
        type: 'MoRTH Approved Source Certification',
        status: 'Applicable',
        standardNumber: 'IRC:SP:69 / MoRTH Sec 2600',
        authority: 'Ministry of Road Transport & Highways',
        mandateReason: 'Expansion joints must be procured from MoRTH-approved manufacturers.',
        verificationNote: 'Check active MoRTH approved vendor registry.'
      }
    ],
    procurementReadiness: {
      totalScore: 84,
      statusLabel: 'Under Review — Attention Required',
      actionCount: 1,
      breakdown: { standardsCoverage: 88, testingCoverage: 76, safetyCoverage: 85, certificationCoverage: 88, versionCurrency: 88, technicalCompleteness: 82 }
    },
    improvedSpecification: 'Strip Seal Expansion Joints with movement capacity up to 80mm conforming to IRC:SP:69 and MoRTH Section 2600. Edge beams hot rolled steel to IS 2062 Grade E250C.'
  },
  {
    demoKey: 'dept_analysis_03',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Municipal LED Street Lighting Master Package (City-Wide)',
    productCategory: 'Urban Development & Smart City',
    status: 'Completed',
    reportType: 'Department Procurement Compliance Dossier',
    quantity: '22000 Units',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(3),
    rawInput: 'City-wide turnkey deployment of 70W and 120W LED street lights with Centralized Monitoring System (CCMS) and 7-pin NEMA receptacle.',
    explanation: 'Comprehensive smart municipal lighting adhering to IS 10322, IS 15885, IS 16107 and IS/IEC 60529.',
    primaryStandards: [
      {
        standardNumber: 'IS 10322 (Part 5/Sec 3): 2012',
        title: 'Luminaires - Particular Requirements - Luminaires for Road and Street Lighting',
        relevanceScore: 96,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Lighting',
        whyRecommended: 'Mandatory standard for public municipal street illumination.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 16107 (Part 2/Sec 1): 2012',
        title: 'LED Luminaire Performance Requirements',
        relationshipType: 'Performance Testing',
        relevanceScore: 92
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'MeitY CRS Registration & BEE 5-Star',
        status: 'Applicable',
        standardNumber: 'IS 10322 & IS 16107',
        authority: 'MeitY / BEE',
        mandateReason: 'Mandatory BIS CRS registration and BEE energy star rating.',
        verificationNote: 'Verify R-Number on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 95,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 94, safetyCoverage: 95, certificationCoverage: 96, versionCurrency: 96, technicalCompleteness: 95 }
    },
    improvedSpecification: 'Turnkey Municipal LED Luminaires compliant with IS 10322 (Part 5/Sec 3) and IS 15885 with active MeitY CRS registration and BEE 5-Star energy efficacy.'
  },
  {
    demoKey: 'dept_analysis_04',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Public Building Electrical Distribution Network',
    productCategory: 'Public Infrastructure',
    status: 'Compliance Risk',
    reportType: 'Compliance Gap Analysis',
    quantity: '12 Complexes',
    confidenceScore: 78,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(5),
    rawInput: 'Internal electrical wiring, circuit breakers, and earthing installation for newly constructed district hospital complex.',
    explanation: 'Identified non-compliance with revised National Electrical Code SP 30 and IS 732 earthing safety guidelines.',
    primaryStandards: [
      {
        standardNumber: 'IS 732: 2019',
        title: 'Code of Practice for Electrical Wiring Installations',
        relevanceScore: 94,
        edition: '4th Revision',
        status: 'Current',
        category: 'Electrical Safety',
        whyRecommended: 'National code governing low-voltage building wiring practices.'
      },
      {
        standardNumber: 'IS 3043: 2018',
        title: 'Code of Practice for Earthing',
        relevanceScore: 92,
        edition: '2nd Revision',
        status: 'Current',
        category: 'Electrical Safety',
        whyRecommended: 'Mandatory earthing calculation standards for public buildings.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 694: 2010',
        title: 'Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables/Cords',
        relationshipType: 'Conductor Standard',
        relevanceScore: 90
      }
    ],
    tenderGaps: [
      {
        category: 'Safety Compliance',
        severity: 'HIGH',
        title: 'Missing Residual Current Device (RCD) Clause',
        description: 'Tender omitted mandatory 30mA RCD protection clause required by CEA Regulations and IS 732: 2019 for hospital wet areas.',
        remedy: 'Mandate IS 12640 compliant 30mA RCDs across all distribution boards.'
      }
    ],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 694: 2010',
        authority: 'DPIIT / BIS',
        mandateReason: 'Electrical wires must carry genuine BIS ISI mark under Wires and Cables QCO.',
        verificationNote: 'Verify CML Number on e-BIS portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 76,
      statusLabel: 'Compliance Risk — Safety Revision Required',
      actionCount: 2,
      breakdown: { standardsCoverage: 85, testingCoverage: 68, safetyCoverage: 65, certificationCoverage: 85, versionCurrency: 82, technicalCompleteness: 75 }
    },
    improvedSpecification: 'Electrical wiring conforming to IS 732: 2019 using FRLS copper wires certified to IS 694: 2010. Earthing installed strictly per IS 3043: 2018 with mandatory 30mA RCD protection.'
  },
  {
    demoKey: 'dept_analysis_05',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Ductile Iron Pipes for Urban Water Supply (K9 Class)',
    productCategory: 'Public Health Engineering',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '45000 Metres',
    confidenceScore: 96,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(7),
    rawInput: 'Ductile Iron (DI) K9 class socket and spigot pipes with internal cement mortar lining and external zinc coating for municipal water transmission.',
    explanation: 'Ductile iron pressure pipes are specified under IS 8329: 2000. Covered under mandatory Cast Iron Products QCO.',
    primaryStandards: [
      {
        standardNumber: 'IS 8329: 2000',
        title: 'Centrifugally Cast (Ductile) Iron Pressure Pipes for Water, Gas and Sewage - Specification (3rd Revision)',
        relevanceScore: 98,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Water Transmission',
        whyRecommended: 'Primary Indian Standard specifying dimensional, hydrostatic, and lining criteria.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 5382: 2018',
        title: 'Rubber Sealing Rings for Gas Mains, Water Mains and Sewers',
        relationshipType: 'Joint Gasket Standard',
        relevanceScore: 92
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 8329: 2000',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Ductile Iron Pipes QCO mandates active BIS license.',
        verificationNote: 'Check CML Number on e-BIS portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 97,
      statusLabel: 'Department Approved (Optimal)',
      actionCount: 0,
      breakdown: { standardsCoverage: 98, testingCoverage: 96, safetyCoverage: 97, certificationCoverage: 98, versionCurrency: 98, technicalCompleteness: 97 }
    },
    improvedSpecification: 'Centrifugally Cast (Ductile) Iron Pressure Pipes Class K9 conforming to IS 8329: 2000 bearing BIS ISI Mark with internal sulphate-resisting cement mortar lining.'
  },
  {
    demoKey: 'dept_analysis_06',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Modular Office Furniture for Secretariat Complex',
    productCategory: 'Administrative Services',
    status: 'Completed',
    reportType: 'Technical Specification Review',
    quantity: '1800 Workstations',
    confidenceScore: 89,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(9),
    rawInput: 'Ergonomic modular office workstations, executive desks, and mesh back swivel chairs for government secretariat renovation.',
    explanation: 'Office furniture standards mapped to IS 3462 (flexible PVC flooring), IS 17633 (office chairs), and IS 1829 (office tables).',
    primaryStandards: [
      {
        standardNumber: 'IS 17633: 2022',
        title: 'Office Furniture - Work Chairs - Requirements and Test Methods',
        relevanceScore: 94,
        edition: '1st Edition',
        status: 'Current',
        category: 'Furniture',
        whyRecommended: 'Latest national standard for ergonomic work chairs.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIFMA / GreenGuard / BIS Compliance',
        status: 'Applicable',
        standardNumber: 'IS 17633: 2022',
        authority: 'BIS Furniture Sectional Committee',
        mandateReason: 'Ensures durable and ergonomically safe seating for administrative staff.',
        verificationNote: 'Review NABL test certificates.'
      }
    ],
    procurementReadiness: {
      totalScore: 91,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 92, testingCoverage: 88, safetyCoverage: 94, certificationCoverage: 90, versionCurrency: 95, technicalCompleteness: 91 }
    },
    improvedSpecification: 'Ergonomic Office Work Chairs conforming to IS 17633: 2022 test methods with pneumatic seat height adjustment and breathable mesh back.'
  },
  {
    demoKey: 'dept_analysis_07',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Prefabricated Public Toilet Units (FRP Modular)',
    productCategory: 'Sanitation Infrastructure',
    status: 'Needs Attention',
    reportType: 'Compliance Gap Analysis',
    quantity: '75 Blocks',
    confidenceScore: 83,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(11),
    rawInput: 'Fiber Reinforced Plastic (FRP) modular prefabricated public toilet blocks with septic digestion tanks under Swachh Bharat Mission.',
    explanation: 'FRP structures require compliance with IS 6746 (unsaturated polyester resin) and CPHEEO sanitation manual guidelines.',
    primaryStandards: [
      {
        standardNumber: 'IS 6746: 1994',
        title: 'Unsaturated Polyester Resin Systems for Low Pressure Fibre Reinforced Plastics',
        relevanceScore: 89,
        edition: '1st Revision',
        status: 'Current',
        category: 'Polymers & FRP',
        whyRecommended: 'Governs raw resin material durability in outdoor sanitary environments.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [
      {
        category: 'Waterproofing & Odour',
        severity: 'MEDIUM',
        title: 'Missing Water Seal Depth Verification',
        description: 'Tender does not mandate minimum 50mm water seal P-trap per IS 2556 (Part 2).',
        remedy: 'Mandate vitreous china P-traps per IS 2556.'
      }
    ],
    certifications: [
      {
        type: 'BIS Sanitary Appliances Certification',
        status: 'Applicable',
        standardNumber: 'IS 2556 (Part 2): 2004',
        authority: 'BIS',
        mandateReason: 'Sanitaryware must conform to ISI marks.',
        verificationNote: 'Check active license on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 81,
      statusLabel: 'Needs Attention (Sanitation Specs)',
      actionCount: 1,
      breakdown: { standardsCoverage: 84, testingCoverage: 75, safetyCoverage: 80, certificationCoverage: 85, versionCurrency: 82, technicalCompleteness: 79 }
    },
    improvedSpecification: 'Prefabricated FRP Modular Toilet Units using resin per IS 6746 with vitreous china sanitary fixtures conforming to IS 2556.'
  },
  {
    demoKey: 'dept_analysis_08',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Precast Concrete Drainage Channels',
    productCategory: 'Municipal Civil Works',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '8500 Metres',
    confidenceScore: 92,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(13),
    rawInput: 'Precast RCC stormwater drainage U-channels with heavy duty ductile iron gratings for city roadside drainage.',
    explanation: 'Concrete design matches IS 456: 2000 with drainage grates adhering to IS 1726 (cast iron manhole covers and frames).',
    primaryStandards: [
      {
        standardNumber: 'IS 456: 2000',
        title: 'Plain and Reinforced Concrete - Code of Practice (4th Revision)',
        relevanceScore: 95,
        edition: '4th Revision',
        status: 'Current',
        category: 'Civil Works',
        whyRecommended: 'Foundational Indian code for all reinforced concrete design.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 1726: 1991',
        title: 'Specification for Cast Iron Manhole Covers and Frames',
        relationshipType: 'Gratings Standard',
        relevanceScore: 90
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'Factory Precast Quality Verification',
        status: 'Applicable',
        standardNumber: 'IS 456: 2000',
        authority: 'State PWD Quality Control Wing',
        mandateReason: 'Cube compressive strength test mandatory per 100m batch.',
        verificationNote: 'Review 28-day concrete cube compressive strength test reports.'
      }
    ],
    procurementReadiness: {
      totalScore: 93,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 95, testingCoverage: 91, safetyCoverage: 94, certificationCoverage: 92, versionCurrency: 96, technicalCompleteness: 92 }
    },
    improvedSpecification: 'Precast RCC Drainage U-Channels of M30 grade concrete per IS 456: 2000 with heavy-duty cast iron gratings conforming to IS 1726 Class HD-20.'
  },
  {
    demoKey: 'dept_analysis_09',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Retroreflective Highway Signboards & Road Safety Equipment',
    productCategory: 'Traffic Safety & Highways',
    status: 'Completed',
    reportType: 'Indian Standards Recommendation Report',
    quantity: '1500 Signboards',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(15),
    rawInput: 'High intensity micro-prismatic retroreflective sheeting (Class C / Type XI) on 2mm aluminum composite substrate for highway cautionary and informatory signs.',
    explanation: 'Road traffic sign design is codified under IRC 67: 2022 with retroreflective sheeting standards per ASTM D4956 / IRC 67.',
    primaryStandards: [
      {
        standardNumber: 'IRC 67: 2022',
        title: 'Code of Practice for Road Signs (4th Revision)',
        relevanceScore: 98,
        edition: '4th Revision',
        status: 'Current',
        category: 'Road Safety',
        whyRecommended: 'Authoritative national code for all highway and urban road signs.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'Sheeting Manufacturer 10-Year Warranty Certification',
        status: 'Applicable',
        standardNumber: 'IRC 67: 2022 / ASTM D4956 Type XI',
        authority: 'MoRTH / IRC',
        mandateReason: 'Guarantees coefficient of retroreflection across 10 years of outdoor UV exposure.',
        verificationNote: 'Ensure authentic warranty certificate from primary sheeting manufacturer.'
      }
    ],
    procurementReadiness: {
      totalScore: 95,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 97, testingCoverage: 93, safetyCoverage: 96, certificationCoverage: 95, versionCurrency: 98, technicalCompleteness: 94 }
    },
    improvedSpecification: 'Highway Signboards fabricated strictly per IRC 67: 2022 using Micro-Prismatic Retroreflective Sheeting Type XI on 2mm aluminum substrate.'
  },
  {
    demoKey: 'dept_analysis_10',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Adaptive Traffic Signal Control System',
    productCategory: 'Smart City Infrastructure',
    status: 'Under Review',
    reportType: 'Technical Specification Review',
    quantity: '32 Intersections',
    confidenceScore: 87,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(18),
    rawInput: 'Coordinated adaptive traffic light controllers with vehicle detection cameras, LED aspect signals, and pedestrian countdown timers.',
    explanation: 'Traffic signal controllers follow IRC 93 and optical LED aspect norms under IS 14486.',
    primaryStandards: [
      {
        standardNumber: 'IRC 93-1985',
        title: 'Guidelines on Design and Installation of Road Traffic Signals',
        relevanceScore: 92,
        edition: '1st Edition',
        status: 'Current',
        category: 'Traffic Control',
        whyRecommended: 'National guidelines for traffic signal phasing and layout.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [
      {
        category: 'Fail-Safe Interlock',
        severity: 'MEDIUM',
        title: 'Missing Conflict Monitor Yellow Flashing Failsafe',
        description: 'Tender did not mandate hardware conflict monitor unit (CMU) to prevent conflicting green signals.',
        remedy: 'Add mandatory CMU hardware failsafe clause.'
      }
    ],
    certifications: [
      {
        type: 'Enclosure Protection IP65 per IS/IEC 60529',
        status: 'Applicable',
        standardNumber: 'IS/IEC 60529',
        authority: 'BIS',
        mandateReason: 'Protects sensitive controller electronics against heavy monsoon ingress.',
        verificationNote: 'Review NABL test report.'
      }
    ],
    procurementReadiness: {
      totalScore: 85,
      statusLabel: 'Under Review',
      actionCount: 1,
      breakdown: { standardsCoverage: 88, testingCoverage: 80, safetyCoverage: 86, certificationCoverage: 84, versionCurrency: 86, technicalCompleteness: 83 }
    },
    improvedSpecification: 'Adaptive Traffic Signal System conforming to IRC 93 with IP65 outdoor controllers and hardware Conflict Monitor Unit failsafe.'
  },
  {
    demoKey: 'dept_analysis_11',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Sewage Treatment Plant Submersible Aerators (15 kW)',
    productCategory: 'Environmental Engineering',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '16 Units',
    confidenceScore: 91,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(20),
    rawInput: '15 kW Submersible self-aspirating aerators for municipal biological wastewater aeration basin with stainless steel SS316 wetted parts.',
    explanation: 'Sewage aeration equipment mapped to IS 8034 (submersible motors) and IS 5120 (rotodynamic pumps).',
    primaryStandards: [
      {
        standardNumber: 'IS 5120: 1977',
        title: 'Technical Requirements for Rotodynamic Special Purpose Pumps',
        relevanceScore: 92,
        edition: '1st Revision',
        status: 'Current',
        category: 'Environmental Engineering',
        whyRecommended: 'Specifies corrosion and cavitation resistance in wastewater handling.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'Motor Insulation Class H & IP68 Protection',
        status: 'Applicable',
        standardNumber: 'IS/IEC 60034-1 / IS/IEC 60529',
        authority: 'BIS',
        mandateReason: 'Continuous submersible operation requires certified IP68 sealing.',
        verificationNote: 'Review manufacturer type test reports.'
      }
    ],
    procurementReadiness: {
      totalScore: 92,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 94, testingCoverage: 88, safetyCoverage: 92, certificationCoverage: 92, versionCurrency: 92, technicalCompleteness: 92 }
    },
    improvedSpecification: '15 kW Submersible Aerators with SS316 wetted components and IP68 submersible motors conforming to IS/IEC 60034-1.'
  },
  {
    demoKey: 'dept_analysis_12',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Fire-Resistant Doors for Government Hospital (120 Min Rating)',
    productCategory: 'Public Works & Health Infrastructure',
    status: 'Compliance Risk',
    reportType: 'Tender Risk Assessment',
    quantity: '220 Doors',
    confidenceScore: 75,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(23),
    rawInput: 'Galvanized steel double leaf fire rated exit doors for 120-minute stability and integrity in hospital corridors.',
    explanation: 'Tender cited legacy draft specifications without mandating new fire door standard IS 3614: 2021.',
    primaryStandards: [
      {
        standardNumber: 'IS 3614: 2021',
        title: 'Fire Doors - Specification (2nd Revision)',
        relevanceScore: 96,
        edition: '2nd Revision',
        status: 'Current',
        category: 'Fire Safety',
        whyRecommended: 'Latest mandatory Indian Standard specifying 120-minute fire resistance and panic hardware.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 12458: 2019',
        title: 'Fire Resistance Tests of Door and Shutter Assemblies',
        relationshipType: 'Testing Standard',
        relevanceScore: 94
      }
    ],
    tenderGaps: [
      {
        category: 'Mandatory BIS ISI Clause',
        severity: 'HIGH',
        title: 'Missing IS 3614 BIS ISI Mark Requirement',
        description: 'Tender allowed uncertified local fabricator doors instead of mandatory BIS certified fire door assemblies.',
        remedy: 'Mandate factory assembled doors bearing the official BIS ISI Mark per IS 3614: 2021.'
      }
    ],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 3614: 2021',
        authority: 'BIS / Ministry of Commerce',
        mandateReason: 'Hospital fire exit safety demands third-party BIS certified assemblies.',
        verificationNote: 'Verify valid 7-digit CML Number on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 74,
      statusLabel: 'Compliance Risk — Safety Revision Required',
      actionCount: 2,
      breakdown: { standardsCoverage: 80, testingCoverage: 68, safetyCoverage: 65, certificationCoverage: 72, versionCurrency: 75, technicalCompleteness: 78 }
    },
    improvedSpecification: '120-Minute Fire Rated Steel Door Assemblies fully tested to IS 12458: 2019 and bearing BIS ISI Mark as per IS 3614: 2021.'
  },
  {
    demoKey: 'dept_analysis_13',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'TMT Reinforcement Steel Bars (Fe 500D) for Flyover Construction',
    productCategory: 'Structural Engineering',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '3500 Metric Tonnes',
    confidenceScore: 98,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(25),
    rawInput: 'Thermo-Mechanically Treated (TMT) high strength deformed steel bars Grade Fe 500D for seismic-resistant bridge piers.',
    explanation: 'Fe 500D TMT bars are governed by IS 1786: 2008. Covered under mandatory Steel QCO.',
    primaryStandards: [
      {
        standardNumber: 'IS 1786: 2008',
        title: 'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (4th Revision)',
        relevanceScore: 99,
        edition: '4th Revision',
        status: 'Current',
        category: 'Structural Steel',
        whyRecommended: 'Mandatory standard specifying enhanced ductility (D-grade) for seismic bridge design.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 1786: 2008',
        authority: 'Ministry of Steel',
        mandateReason: 'Steel QCO makes procurement of non-ISI marked TMT bars a statutory violation.',
        verificationNote: 'Verify primary producer CML license on e-BIS portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 98,
      statusLabel: 'Department Approved (Optimal)',
      actionCount: 0,
      breakdown: { standardsCoverage: 99, testingCoverage: 98, safetyCoverage: 99, certificationCoverage: 98, versionCurrency: 98, technicalCompleteness: 98 }
    },
    improvedSpecification: 'High Strength Deformed TMT Steel Bars Grade Fe 500D strictly conforming to IS 1786: 2008 bearing genuine BIS ISI Mark.'
  },
  {
    demoKey: 'dept_analysis_14',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Solar Rooftop PV System for Administrative Buildings (100 kWp)',
    productCategory: 'Clean Energy & Decarbonization',
    status: 'Completed',
    reportType: 'Department Procurement Compliance Dossier',
    quantity: '8 Systems',
    confidenceScore: 93,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(27),
    rawInput: '100 kWp grid-interactive rooftop solar PV plant with mono-PERC half-cut modules, string inverters, and net-metering synchronization.',
    explanation: 'Solar PV installation follows MNRE guidelines, IS 14286 (module safety), and IS 16221 (inverter safety).',
    primaryStandards: [
      {
        standardNumber: 'IS 14286: 2010',
        title: 'Crystalline Silicon Terrestrial Photovoltaic Modules',
        relevanceScore: 95,
        edition: '1st Edition',
        status: 'Current',
        category: 'Solar Energy',
        whyRecommended: 'Mandatory solar module qualification standard.'
      },
      {
        standardNumber: 'IS 16221 (Part 2): 2015',
        title: 'Safety of Power Converters for Use in Photovoltaic Power Systems',
        relevanceScore: 93,
        edition: '1st Edition',
        status: 'Current',
        category: 'Solar Energy',
        whyRecommended: 'Mandatory BIS CRS registration standard for solar inverters.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'MNRE Approved Models and Manufacturers (ALMM)',
        status: 'Applicable',
        standardNumber: 'IS 14286 / IS/IEC 61730',
        authority: 'Ministry of New & Renewable Energy (MNRE)',
        mandateReason: 'Government procurement mandates sourcing only from active ALMM List I.',
        verificationNote: 'Cross-check manufacturer model against official MNRE ALMM portal.'
      }
    ],
    procurementReadiness: {
      totalScore: 94,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 95, testingCoverage: 92, safetyCoverage: 94, certificationCoverage: 95, versionCurrency: 95, technicalCompleteness: 94 }
    },
    improvedSpecification: 'Grid-Connected Rooftop Solar PV Systems using ALMM-listed modules tested to IS 14286 and inverters certified under IS 16221 (Part 2).'
  },
  {
    demoKey: 'dept_analysis_15',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Submersible Borewell Pumpsets for Rural Water Supply',
    productCategory: 'Rural Water Mission',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '600 Units',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(29),
    rawInput: 'Submersible motor and pump sets for 150mm deep tube wells in rural drinking water schemes with minimum 5-Star BEE energy rating.',
    explanation: 'Governed by IS 8034: 2018 with mandatory QCO and BEE Star rating under Jal Jeevan Mission.',
    primaryStandards: [
      {
        standardNumber: 'IS 8034: 2018',
        title: 'Submersible Pumpsets - Specification (3rd Revision)',
        relevanceScore: 96,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Water Pumps',
        whyRecommended: 'Mandatory pump specification for public water utilities.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 8034: 2018',
        authority: 'DPIIT / BIS',
        mandateReason: 'Mandatory under Submersible Pumps QCO.',
        verificationNote: 'Verify CML Number on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 95,
      statusLabel: 'Department Approved',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 93, safetyCoverage: 95, certificationCoverage: 96, versionCurrency: 96, technicalCompleteness: 95 }
    },
    improvedSpecification: 'Submersible Pumpsets conforming to IS 8034: 2018 with active BIS ISI Mark and minimum BEE 5-Star Energy Efficiency Rating.'
  },
  {
    demoKey: 'dept_analysis_16',
    userEmail: 'demo.department@anveshak.demo',
    productName: 'Ready Mixed Concrete (M30 Grade) for District Collectorate',
    productCategory: 'Civil Engineering Materials',
    status: 'Draft',
    reportType: 'Technical Specification Review',
    quantity: '8000 Cubic Metres',
    confidenceScore: 86,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(31),
    rawInput: 'Ready Mixed Concrete grade M30 with maximum aggregate size 20mm, fly ash blended cement, and slump retention up to 2 hours.',
    explanation: 'RMC batching and transit criteria follow IS 4926: 2003 with structural concrete design to IS 456.',
    primaryStandards: [
      {
        standardNumber: 'IS 4926: 2003',
        title: 'Ready Mixed Concrete - Code of Practice (2nd Revision)',
        relevanceScore: 94,
        edition: '2nd Revision',
        status: 'Current',
        category: 'Concrete',
        whyRecommended: 'Governs batching plant automation, testing, and delivery tolerances.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'QCI / BIS RMC Plant Certification',
        status: 'Applicable',
        standardNumber: 'IS 4926: 2003',
        authority: 'Quality Council of India (QCI) / BIS',
        mandateReason: 'Ensures automated computerized batching accuracy.',
        verificationNote: 'Inspect active QCI RMC plant certification.'
      }
    ],
    procurementReadiness: {
      totalScore: 86,
      statusLabel: 'Draft — In Preparation',
      actionCount: 0,
      breakdown: { standardsCoverage: 90, testingCoverage: 82, safetyCoverage: 88, certificationCoverage: 85, versionCurrency: 86, technicalCompleteness: 85 }
    },
    improvedSpecification: 'Ready Mixed Concrete M30 Grade conforming to IS 4926: 2003 sourced from QCI/BIS certified batching plants.'
  },

  // ==========================================
  // 3. AMIT VERMA (PSU - National Energy) - 14 Analyses
  // ==========================================
  {
    demoKey: 'psu_analysis_01',
    userEmail: 'demo.psu@anveshak.demo',
    productName: '33kV/11kV 5 MVA Power Transformer with OLTC',
    productCategory: 'Power Transmission & Substation',
    status: 'Completed',
    reportType: 'PSU Technical Compliance Review',
    quantity: '6 Units',
    confidenceScore: 96,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(1),
    rawInput: '33kV/11kV 5 MVA 3-phase oil immersed copper wound power transformer with On-Load Tap Changer (OLTC), RTCC panel, and nitrogen fire protection.',
    explanation: 'Power transformers are strictly governed under IS 2026: 2011 with mandatory BIS license under the Transformers (Quality Control) Order.',
    primaryStandards: [
      {
        standardNumber: 'IS 2026 (Part 1 to 5): 2011',
        title: 'Power Transformers - Specification (General, Temperature Rise, Insulation, Tappings, Ability to Withstand Short Circuit)',
        relevanceScore: 98,
        edition: '3rd Revision',
        status: 'Current',
        category: 'High Voltage Equipment',
        whyRecommended: 'Mandatory Indian Standard defining short-circuit withstand, losses, and insulation tests.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 335: 2018',
        title: 'New Insulating Oils - Specification',
        relationshipType: 'Insulation Media Standard',
        relevanceScore: 94
      },
      {
        standardNumber: 'IS 3639: 1966',
        title: 'Specification for Fittings and Accessories for Power Transformers',
        relationshipType: 'Accessories Standard',
        relevanceScore: 90
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 2026',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Transformers QCO prohibits procurement of non-ISI certified power transformers.',
        verificationNote: 'Verify valid 7-digit CML Number on e-BIS portal.'
      },
      {
        type: 'CPRI Dynamic Short-Circuit Test Certificate',
        status: 'Applicable',
        standardNumber: 'IS 2026 (Part 5)',
        authority: 'Central Power Research Institute (CPRI)',
        mandateReason: 'Mandatory proof of ability to withstand through short-circuit faults.',
        verificationNote: 'Verify CPRI test certificate validity.'
      }
    ],
    procurementReadiness: {
      totalScore: 97,
      statusLabel: 'PSU Audit Ready (Certified Compliant)',
      actionCount: 0,
      breakdown: { standardsCoverage: 99, testingCoverage: 96, safetyCoverage: 98, certificationCoverage: 97, versionCurrency: 98, technicalCompleteness: 97 }
    },
    improvedSpecification: '33/11kV 5 MVA Power Transformer conforming strictly to IS 2026 (Parts 1-5): 2011 with On-Load Tap Changer. Transformer oil must comply with IS 335: 2018. Must hold active BIS License and CPRI short-circuit test certificate.'
  },
  {
    demoKey: 'psu_analysis_02',
    userEmail: 'demo.psu@anveshak.demo',
    productName: '11kV Cross-Linked Polyethylene (XLPE) Insulated HT Power Cable',
    productCategory: 'Heavy Electrical Cables',
    status: 'Completed',
    reportType: 'Technical Specification Review',
    quantity: '28000 Metres',
    confidenceScore: 95,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(2),
    rawInput: '11kV (E) 3-core 300 sq.mm stranded compacted aluminum conductor, XLPE insulated, screened, galvanized flat steel strip armored HT cable.',
    explanation: 'High voltage XLPE power cables are governed under IS 7098 (Part 2): 2011. Covered under mandatory Electrical Cables QCO.',
    primaryStandards: [
      {
        standardNumber: 'IS 7098 (Part 2): 2011',
        title: 'Cross-Linked Polyethylene Insulated Thermoplastic Sheathed Cables - Specification - Part 2: For Working Voltages from 3.3 kV up to and Including 33 kV',
        relevanceScore: 98,
        edition: '2nd Revision',
        status: 'Current',
        category: 'High Voltage Cables',
        whyRecommended: 'Primary Indian Standard specifying insulation thickness, partial discharge limits, and armoring.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 10810 (Part 1-64)',
        title: 'Methods of Test for Cables',
        relationshipType: 'Testing Standard',
        relevanceScore: 92
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 7098 (Part 2): 2011',
        authority: 'DPIIT / BIS',
        mandateReason: 'Electrical Wires and Cables QCO mandates active BIS ISI License.',
        verificationNote: 'Verify CML Number on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 96,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 98, testingCoverage: 94, safetyCoverage: 97, certificationCoverage: 96, versionCurrency: 98, technicalCompleteness: 95 }
    },
    improvedSpecification: '11kV 3C x 300 sq.mm Aluminum XLPE HT Cable conforming to IS 7098 (Part 2): 2011 bearing official BIS ISI Mark. Partial discharge test must confirm < 5pC per IS 10810.'
  },
  {
    demoKey: 'psu_analysis_03',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Grid-Connected Solar Inverter (1 MW Central Inverter)',
    productCategory: 'Renewable Power Generation',
    status: 'Under Review',
    reportType: 'Tender Risk Assessment',
    quantity: '8 Units',
    confidenceScore: 89,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(4),
    rawInput: '1000 kW utility scale central solar inverter for grid export at 415V with active power factor correction, anti-islanding protection, and SCADA interface.',
    explanation: 'Solar power converters are governed by IS 16221 (safety) and IS 16169 (anti-islanding test). Mandatory MeitY CRS applies.',
    primaryStandards: [
      {
        standardNumber: 'IS 16221 (Part 2): 2015',
        title: 'Safety of Power Converters for Use in Photovoltaic Power Systems - Part 2: Particular Requirements for Inverters',
        relevanceScore: 95,
        edition: '1st Edition',
        status: 'Current',
        category: 'Solar Power Inverters',
        whyRecommended: 'Mandatory standard governing grid safety and electrical isolation.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 16169: 2014',
        title: 'Test Procedure of Islanding Prevention Measures for Utility-Interconnected Photovoltaic Inverters',
        relationshipType: 'Grid Safety Testing',
        relevanceScore: 92
      }
    ],
    tenderGaps: [
      {
        category: 'Grid Code Compliance',
        severity: 'MEDIUM',
        title: 'Central Electricity Authority (CEA) Technical Standards Clause',
        description: 'Tender requires explicit Low Voltage Ride Through (LVRT) compliance per CEA Technical Standards for Grid Connectivity.',
        remedy: 'Incorporate CEA LVRT/HVRT test protocol requirements.'
      }
    ],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 16221 (Part 2): 2015',
        authority: 'MeitY / BIS',
        mandateReason: 'Covered under Solar Photovoltaics, Systems, Devices and Components QCO.',
        verificationNote: 'Verify R-Number on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 88,
      statusLabel: 'Under Review — Attention Required',
      actionCount: 1,
      breakdown: { standardsCoverage: 92, testingCoverage: 84, safetyCoverage: 89, certificationCoverage: 90, versionCurrency: 90, technicalCompleteness: 85 }
    },
    improvedSpecification: '1 MW Central Solar Inverter certified to IS 16221 (Part 2): 2015 with valid MeitY CRS Registration. Anti-islanding tested per IS 16169 with full CEA grid connectivity compliance.'
  },
  {
    demoKey: 'psu_analysis_04',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Flameproof Electrical Switchgear for Coal Handling Plant',
    productCategory: 'Hazardous Area Electricals',
    status: 'Compliance Risk',
    reportType: 'Compliance Gap Analysis',
    quantity: '18 Panels',
    confidenceScore: 77,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(6),
    rawInput: 'Flameproof Ex-d explosion proof electrical control stations for Zone 22 combustible coal dust atmosphere in thermal power station.',
    explanation: 'Explosive atmosphere equipment must comply with IS/IEC 60079 series and hold DGMS / PESO statutory licenses.',
    primaryStandards: [
      {
        standardNumber: 'IS/IEC 60079-0: 2017',
        title: 'Explosive Atmospheres - Part 0: Equipment - General Requirements',
        relevanceScore: 96,
        edition: '2nd Revision',
        status: 'Current',
        category: 'Hazardous Area Safety',
        whyRecommended: 'Foundational national standard for all explosion protected equipment.'
      },
      {
        standardNumber: 'IS/IEC 60079-1: 2014',
        title: 'Explosive Atmospheres - Part 1: Equipment Protection by Flameproof Enclosures "d"',
        relevanceScore: 94,
        edition: '2nd Revision',
        status: 'Current',
        category: 'Hazardous Area Safety',
        whyRecommended: 'Specifies flameproof enclosure integrity and gap tolerances.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [
      {
        category: 'Statutory License Clause',
        severity: 'HIGH',
        title: 'Missing PESO / CIMFR Statutory Approval Clause',
        description: 'Tender omitted mandatory Petroleum and Explosives Safety Organization (PESO) approval requirement.',
        remedy: 'Mandate active PESO approval certificate and CIMFR flameproof test report.'
      }
    ],
    certifications: [
      {
        type: 'PESO Statutory Approval & BIS ISI License',
        status: 'Applicable',
        standardNumber: 'IS/IEC 60079-0 & 1',
        authority: 'PESO / CIMFR / BIS',
        mandateReason: 'Statutory mandate under Indian Mines Regulations and Explosives Act.',
        verificationNote: 'Verify PESO license number and CIMFR test certificate.'
      }
    ],
    procurementReadiness: {
      totalScore: 75,
      statusLabel: 'Compliance Risk — Statutory PESO Revision Required',
      actionCount: 2,
      breakdown: { standardsCoverage: 82, testingCoverage: 68, safetyCoverage: 65, certificationCoverage: 75, versionCurrency: 82, technicalCompleteness: 78 }
    },
    improvedSpecification: 'Flameproof Electrical Switchgear conforming to IS/IEC 60079-0 & 1: 2014 bearing valid BIS ISI Mark and backed by active PESO approval.'
  },
  {
    demoKey: 'psu_analysis_05',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Industrial Water Demineralization (DM) Plant Equipment',
    productCategory: 'Thermal Power Utilities',
    status: 'Completed',
    reportType: 'PSU Technical Compliance Review',
    quantity: '2 Streams (150 m3/hr)',
    confidenceScore: 92,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(8),
    rawInput: 'High pressure dual media filters, strong acid cation, and strong base anion ion exchange vessels for boiler feed water treatment.',
    explanation: 'Pressure vessels designed per IS 2825 with rubber lining per IS 4682 and structural steel to IS 2062.',
    primaryStandards: [
      {
        standardNumber: 'IS 2825: 1969',
        title: 'Code for Unfired Pressure Vessels',
        relevanceScore: 94,
        edition: '1st Edition',
        status: 'Current',
        category: 'Pressure Vessels',
        whyRecommended: 'Authoritative Indian code for chemical process pressure vessels.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 4682 (Part 1): 1994',
        title: 'Code of Practice for Lining of Vessels and Equipment for Chemical Processes - Rubber Lining',
        relationshipType: 'Anti-Corrosion Standard',
        relevanceScore: 90
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'IBR / Third Party Inspection (TUV / Lloyd’s)',
        status: 'Applicable',
        standardNumber: 'IS 2825',
        authority: 'Directorate of Boilers / Certified Inspectorate',
        mandateReason: 'Ensures structural integrity under hydraulic pressure testing.',
        verificationNote: 'Verify hydraulic test endorsement.'
      }
    ],
    procurementReadiness: {
      totalScore: 93,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 95, testingCoverage: 90, safetyCoverage: 94, certificationCoverage: 92, versionCurrency: 92, technicalCompleteness: 94 }
    },
    improvedSpecification: 'Demineralization Ion Exchange Pressure Vessels fabricated per IS 2825 Class II with rubber lining conforming to IS 4682 (Part 1).'
  },
  {
    demoKey: 'psu_analysis_06',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Heavy Duty Slurry Pumps for Ash Handling (250 kW)',
    productCategory: 'Ash Management',
    status: 'Needs Attention',
    reportType: 'Technical Specification Review',
    quantity: '12 Units',
    confidenceScore: 83,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(10),
    rawInput: 'High head centrifugal slurry pumps with 27% high chrome iron casing and impeller for pumping bottom ash slurry with 40% solids concentration.',
    explanation: 'Slurry pumps follow IS 5120 and high chromium wear-resistant white iron standard IS 4771.',
    primaryStandards: [
      {
        standardNumber: 'IS 4771: 1985',
        title: 'Abrasion-Resistant Iron Castings - Specification',
        relevanceScore: 93,
        edition: '1st Revision',
        status: 'Current',
        category: 'Metallurgy',
        whyRecommended: 'Specifies 27% Chromium alloy white cast iron for high erosion resistance.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 5120: 1977',
        title: 'Rotodynamic Pumps Technical Requirements',
        relationshipType: 'Pump Performance',
        relevanceScore: 88
      }
    ],
    tenderGaps: [
      {
        category: 'Erosion Testing',
        severity: 'MEDIUM',
        title: 'Missing Slurry Abrasion Wear Test Report Requirement',
        description: 'Tender did not specify slurry pot tester abrasion erosion rate benchmarking.',
        remedy: 'Mandate hardness minimum 600 BHN and ASTM G65 abrasion testing.'
      }
    ],
    certifications: [
      {
        type: 'Material Hardness & Ultrasonic Test Verification',
        status: 'Applicable',
        standardNumber: 'IS 4771 Grade 3',
        authority: 'BIS / NABL Laboratory',
        mandateReason: 'Guarantees casing lifespan against high-velocity ash impingement.',
        verificationNote: 'Review NABL spectro chemical and Brinell hardness test reports.'
      }
    ],
    procurementReadiness: {
      totalScore: 82,
      statusLabel: 'Needs Attention',
      actionCount: 1,
      breakdown: { standardsCoverage: 86, testingCoverage: 76, safetyCoverage: 84, certificationCoverage: 82, versionCurrency: 84, technicalCompleteness: 80 }
    },
    improvedSpecification: 'Centrifugal Heavy Duty Slurry Pumps with wet-end components cast from 27% Chromium White Iron conforming to IS 4771 Grade 3 with minimum 600 BHN hardness.'
  },
  {
    demoKey: 'psu_analysis_07',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Motor Control Center (MCC) Panels with Intelligent Relays',
    productCategory: 'Plant Electrical Automation',
    status: 'Completed',
    reportType: 'PSU Technical Compliance Review',
    quantity: '14 Board Assemblies',
    confidenceScore: 94,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(12),
    rawInput: '415V Form 4b fully drawout Motor Control Center with microprocessor-based motor protection relays and dual redundant Modbus TCP communication.',
    explanation: 'Low voltage switchgear assemblies are codified under IS/IEC 61439-2: 2011.',
    primaryStandards: [
      {
        standardNumber: 'IS/IEC 61439-2: 2011',
        title: 'Low-Voltage Switchgear and Controlgear Assemblies - Part 2: Power Switchgear and Controlgear Assemblies',
        relevanceScore: 97,
        edition: '1st Edition',
        status: 'Current',
        category: 'Electrical Switchgear',
        whyRecommended: 'Mandatory standard governing Form 4b segregation and internal arc containment.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 3231 (Part 1-3)',
        title: 'Electrical Relays for Power System Protection',
        relationshipType: 'Relay Standard',
        relevanceScore: 91
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'CPRI Internal Arc & Short Circuit Test Certificate (50kA/1s)',
        status: 'Applicable',
        standardNumber: 'IS/IEC 61439-2',
        authority: 'Central Power Research Institute (CPRI)',
        mandateReason: 'Safety requirement to protect plant personnel against internal electrical arcs.',
        verificationNote: 'Verify valid CPRI type test certificates.'
      }
    ],
    procurementReadiness: {
      totalScore: 95,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 94, safetyCoverage: 96, certificationCoverage: 95, versionCurrency: 96, technicalCompleteness: 95 }
    },
    improvedSpecification: '415V Fully Drawout Motor Control Center Form 4b per IS/IEC 61439-2: 2011 with 50kA for 1 second short circuit withstand certified by CPRI.'
  },
  {
    demoKey: 'psu_analysis_08',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'High Strength Structural Steel Plates (Grade E350)',
    productCategory: 'Turbine & Boiler Structures',
    status: 'Completed',
    reportType: 'Procurement Standards Compliance Report',
    quantity: '1800 Metric Tonnes',
    confidenceScore: 97,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(15),
    rawInput: 'High tensile hot-rolled structural steel plates Grade E350 Quality BR for boiler support structure columns and heavy crane girders.',
    explanation: 'Structural steel is governed by IS 2062: 2011. Covered under mandatory Steel Products Quality Control Order.',
    primaryStandards: [
      {
        standardNumber: 'IS 2062: 2011',
        title: 'Hot Rolled Medium and High Tensile Structural Steel - Specification (7th Revision)',
        relevanceScore: 99,
        edition: '7th Revision',
        status: 'Current',
        category: 'Structural Steel',
        whyRecommended: 'Mandatory standard specifying minimum 350 MPa yield strength and Charpy V-notch impact toughness.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 1852: 1985',
        title: 'Rolling and Cutting Tolerances for Hot Rolled Steel Products',
        relationshipType: 'Dimensional Tolerances',
        relevanceScore: 92
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 2062: 2011 Grade E350BR',
        authority: 'Ministry of Steel',
        mandateReason: 'Steel QCO strictly mandates BIS certified structural steel from primary mills.',
        verificationNote: 'Verify primary steel mill CML License on e-BIS.'
      }
    ],
    procurementReadiness: {
      totalScore: 97,
      statusLabel: 'PSU Audit Ready (Optimal)',
      actionCount: 0,
      breakdown: { standardsCoverage: 99, testingCoverage: 96, safetyCoverage: 98, certificationCoverage: 98, versionCurrency: 98, technicalCompleteness: 96 }
    },
    improvedSpecification: 'Hot Rolled High Tensile Structural Steel Plates Grade E350BR conforming to IS 2062: 2011 with active BIS ISI Mark and Charpy V-notch impact test at 0°C.'
  },
  {
    demoKey: 'psu_analysis_09',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Addressable Fire Detection & Alarm System for Power Substation',
    productCategory: 'Power Plant Safety',
    status: 'Completed',
    reportType: 'Tender Risk Assessment',
    quantity: '4 Central Panels',
    confidenceScore: 93,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(18),
    rawInput: 'Microprocessor based analogue addressable fire alarm control panel with multi-sensor optical heat detectors, manual call points, and optical smoke beam detectors.',
    explanation: 'Governed by IS 2189: 2008 (selection, installation and maintenance) and IS 2175 (heat sensitive fire detectors).',
    primaryStandards: [
      {
        standardNumber: 'IS 2189: 2008',
        title: 'Code of Practice for Selection, Installation and Maintenance of Automatic Fire Detection and Alarm System (4th Revision)',
        relevanceScore: 96,
        edition: '4th Revision',
        status: 'Current',
        category: 'Fire Protection',
        whyRecommended: 'Comprehensive national code for fire alarm installation and battery standby.'
      }
    ],
    relatedStandards: [
      {
        standardNumber: 'IS 2175: 1988',
        title: 'Specification for Heat Sensitive Fire Detectors for Use in Automatic Fire Alarm Systems',
        relationshipType: 'Detector Standard',
        relevanceScore: 91
      }
    ],
    tenderGaps: [],
    certifications: [
      {
        type: 'BIS ISI / UL / LPCB Certified Hardware',
        status: 'Applicable',
        standardNumber: 'IS 2189 / IS 2175',
        authority: 'BIS / Central Electricity Authority',
        mandateReason: 'Essential for power plant asset safety and statutory insurance compliance.',
        verificationNote: 'Verify third party fire testing laboratory listing.'
      }
    ],
    procurementReadiness: {
      totalScore: 94,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 96, testingCoverage: 92, safetyCoverage: 96, certificationCoverage: 94, versionCurrency: 95, technicalCompleteness: 93 }
    },
    improvedSpecification: 'Analogue Addressable Fire Alarm System engineered and installed in strict compliance with IS 2189: 2008 with detectors conforming to IS 2175.'
  },
  {
    demoKey: 'psu_analysis_10',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'High Bay Industrial LED Luminaires for Turbine Hall',
    productCategory: 'Industrial Illumination',
    status: 'Completed',
    reportType: 'PSU Technical Compliance Review',
    quantity: '850 Fixtures',
    confidenceScore: 91,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(21),
    rawInput: '150W industrial high bay LED luminaires for 12-meter high turbine hall with die-cast aluminum housing, 60-degree beam angle, and DALI dimming.',
    explanation: 'High bay luminaires must conform to IS 10322 (Part 5/Sec 1), IS 15885, and IS 16107.',
    primaryStandards: [
      {
        standardNumber: 'IS 10322 (Part 5/Sec 1): 2012',
        title: 'Luminaires - Particular Requirements - General Purpose Luminaires',
        relevanceScore: 95,
        edition: '3rd Revision',
        status: 'Current',
        category: 'Industrial Lighting',
        whyRecommended: 'Mandatory standard for industrial plant luminaires.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'MeitY CRS Registration & IP66 Ingress',
        status: 'Applicable',
        standardNumber: 'IS 10322 & IS 15885',
        authority: 'MeitY / BIS',
        mandateReason: 'Mandatory MeitY CRS registration.',
        verificationNote: 'Verify R-Number on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 93,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 94, testingCoverage: 90, safetyCoverage: 95, certificationCoverage: 94, versionCurrency: 94, technicalCompleteness: 92 }
    },
    improvedSpecification: '150W Industrial High Bay LED Luminaires conforming to IS 10322 (Part 5/Sec 1) with IP66 protection and valid MeitY CRS Registration.'
  },
  {
    demoKey: 'psu_analysis_11',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'SF6 Gas Insulated Switchgear (GIS) 132kV System',
    productCategory: 'High Voltage Transmission',
    status: 'Under Review',
    reportType: 'Technical Specification Review',
    quantity: '6 Bay System',
    confidenceScore: 88,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(23),
    rawInput: '132kV SF6 Gas Insulated Switchgear (GIS) indoor substation with circuit breaker, disconnector, earthing switches, and gas density monitors.',
    explanation: 'Governed by IS/IEC 62271-203 with SF6 gas purity norms per IS 13072.',
    primaryStandards: [
      {
        standardNumber: 'IS/IEC 62271-203: 2011',
        title: 'High-Voltage Switchgear and Controlgear - Part 203: Gas-Insulated Metal-Enclosed Switchgear for Rated Voltages Above 52 kV',
        relevanceScore: 96,
        edition: '1st Edition',
        status: 'Current',
        category: 'EHV Switchgear',
        whyRecommended: 'Authoritative national standard for high voltage GIS systems.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [
      {
        category: 'SF6 Leakage Rate',
        severity: 'MEDIUM',
        title: 'Missing Annual Gas Leakage Rate Threshold Clause',
        description: 'Tender omitted maximum 0.5% per annum SF6 gas leakage threshold required by CIGRE/IEC norms.',
        remedy: 'Specify maximum 0.5% annual gas leakage rate with factory helium leak testing.'
      }
    ],
    certifications: [
      {
        type: 'CPRI / KEMA Full Type Test Portfolio',
        status: 'Applicable',
        standardNumber: 'IS/IEC 62271-203',
        authority: 'CPRI / International Accredited Lab',
        mandateReason: 'High voltage substations require exhaustive short-circuit and impulse withstand testing.',
        verificationNote: 'Review authenticated type test portfolio.'
      }
    ],
    procurementReadiness: {
      totalScore: 87,
      statusLabel: 'Under Review',
      actionCount: 1,
      breakdown: { standardsCoverage: 91, testingCoverage: 83, safetyCoverage: 88, certificationCoverage: 89, versionCurrency: 89, technicalCompleteness: 85 }
    },
    improvedSpecification: '132kV Gas Insulated Switchgear (GIS) engineered per IS/IEC 62271-203 with annual gas leakage rate < 0.5% and type tested at CPRI/KEMA.'
  },
  {
    demoKey: 'psu_analysis_12',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Cathodic Protection System for Underground Fuel Pipelines',
    productCategory: 'Corrosion Prevention',
    status: 'Compliance Risk',
    reportType: 'Tender Risk Assessment',
    quantity: '42 Kilometres',
    confidenceScore: 74,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(26),
    rawInput: 'Impressed Current Cathodic Protection (ICCP) system with Mixed Metal Oxide (MMO) tubular titanium anodes for underground naphtha fuel lines.',
    explanation: 'Pipeline cathodic protection is governed by IS 8062 and PNGRB Technical and Safety Standards Regulations.',
    primaryStandards: [
      {
        standardNumber: 'IS 8062 (Part 1-3): 2006',
        title: 'Code of Practice for Cathodic Protection of Steel Structures',
        relevanceScore: 94,
        edition: '1st Revision',
        status: 'Current',
        category: 'Pipeline Safety',
        whyRecommended: 'Mandatory Indian Standard governing pipe-to-soil potential criteria (-850mV to -1200mV).'
      }
    ],
    relatedStandards: [],
    tenderGaps: [
      {
        category: 'Regulatory PNGRB Norms',
        severity: 'HIGH',
        title: 'Missing PNGRB Technical Standards Verification Clause',
        description: 'Tender lacks mandatory reference to PNGRB (Technical Standards and Specifications including Safety Standards for City Gas Distribution Networks) Regulations.',
        remedy: 'Mandate compliance with PNGRB TSSR and NACE SP0169.'
      }
    ],
    certifications: [
      {
        type: 'NACE / AMPP Level 3 Specialist Certification',
        status: 'Applicable',
        standardNumber: 'IS 8062 / PNGRB TSSR',
        authority: 'PNGRB / NACE',
        mandateReason: 'Statutory safety mandate for hazardous hydrocarbon pipelines.',
        verificationNote: 'Verify specialist credentials.'
      }
    ],
    procurementReadiness: {
      totalScore: 73,
      statusLabel: 'Compliance Risk — PNGRB Revision Required',
      actionCount: 2,
      breakdown: { standardsCoverage: 80, testingCoverage: 66, safetyCoverage: 65, certificationCoverage: 72, versionCurrency: 78, technicalCompleteness: 75 }
    },
    improvedSpecification: 'Impressed Current Cathodic Protection (ICCP) system for underground pipelines engineered per IS 8062: 2006 and PNGRB safety regulations.'
  },
  {
    demoKey: 'psu_analysis_13',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Diesel Generator Set (1500 kVA Silent Acoustic)',
    productCategory: 'Emergency Standby Power',
    status: 'Completed',
    reportType: 'PSU Technical Compliance Review',
    quantity: '4 Sets',
    confidenceScore: 95,
    confidenceLabel: 'Highly Relevant',
    inputType: 'specification',
    createdAt: daysAgo(28),
    rawInput: '1500 kVA 415V continuous rating diesel generator set with electronic governor, turbocharger, acoustic enclosure, and CPCB-IV+ emission compliance.',
    explanation: 'DG sets must conform to IS 10000 (engines), IS 13364 (alternators), and statutory CPCB Stage IV+ emission standards.',
    primaryStandards: [
      {
        standardNumber: 'IS 13364 (Part 1-2): 1992',
        title: 'Specification for A.C. Generators Driven by Reciprocating Internal Combustion Engines',
        relevanceScore: 95,
        edition: '1st Edition',
        status: 'Current',
        category: 'Power Generation',
        whyRecommended: 'Primary Indian Standard specifying alternator regulation and temperature limits.'
      },
      {
        standardNumber: 'IS 10000 (Part 1-12): 1980',
        title: 'Methods of Tests for Internal Combustion Engines',
        relevanceScore: 92,
        edition: '1st Edition',
        status: 'Current',
        category: 'Engines',
        whyRecommended: 'Specifies engine output and fuel consumption verification.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'CPCB-IV+ Emission & Type Approval Certificate',
        status: 'Applicable',
        standardNumber: 'Environment (Protection) Rules / CPCB',
        authority: 'Central Pollution Control Board (CPCB) / ARAI',
        mandateReason: 'Mandatory statutory environmental compliance for diesel gensets in India.',
        verificationNote: 'Verify valid COP and type approval certificate from ARAI/ICAT.'
      }
    ],
    procurementReadiness: {
      totalScore: 96,
      statusLabel: 'PSU Audit Ready',
      actionCount: 0,
      breakdown: { standardsCoverage: 97, testingCoverage: 94, safetyCoverage: 96, certificationCoverage: 98, versionCurrency: 96, technicalCompleteness: 95 }
    },
    improvedSpecification: '1500 kVA Standby Diesel Generator Set conforming to IS 13364 and IS 10000 equipped with certified CPCB-IV+ compliant emission and acoustic package.'
  },
  {
    demoKey: 'psu_analysis_14',
    userEmail: 'demo.psu@anveshak.demo',
    productName: 'Industrial Uninterruptible Power Supply (100 kVA 3-Phase UPS)',
    productCategory: 'Instrumentation & SCADA Power',
    status: 'Draft',
    reportType: 'Technical Specification Review',
    quantity: '6 Systems',
    confidenceScore: 85,
    confidenceLabel: 'Relevant',
    inputType: 'specification',
    createdAt: daysAgo(31),
    rawInput: '100 kVA true online double conversion UPS system with galvanic isolation transformer, static bypass, and battery bank for thermal plant control room.',
    explanation: 'UPS systems are governed under IS 16242 (Part 1): 2014 with mandatory MeitY CRS registration.',
    primaryStandards: [
      {
        standardNumber: 'IS 16242 (Part 1): 2014',
        title: 'Uninterruptible Power Systems (UPS) - Part 1: General and Safety Requirements for UPS',
        relevanceScore: 95,
        edition: '1st Edition',
        status: 'Current',
        category: 'Power Electronics',
        whyRecommended: 'Mandatory standard governing electrical safety and short circuit protection.'
      }
    ],
    relatedStandards: [],
    tenderGaps: [],
    certifications: [
      {
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 16242 (Part 1): 2014',
        authority: 'MeitY / BIS',
        mandateReason: 'Covered under Electronics and IT Goods Quality Control Order.',
        verificationNote: 'Verify R-Number on crsbis.in.'
      }
    ],
    procurementReadiness: {
      totalScore: 87,
      statusLabel: 'Draft — Ready for Review',
      actionCount: 0,
      breakdown: { standardsCoverage: 91, testingCoverage: 83, safetyCoverage: 89, certificationCoverage: 88, versionCurrency: 87, technicalCompleteness: 85 }
    },
    improvedSpecification: '100 kVA True Online Double Conversion Industrial UPS System complying with IS 16242 (Part 1): 2014 and bearing valid MeitY CRS Registration.'
  }
];
