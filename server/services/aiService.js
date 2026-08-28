import axios from 'axios';
import { INDIAN_STANDARDS_DATABASE } from './standardsData.js';

// Bilingual Dictionary for Hindi and Hinglish keywords
const HINDI_KEYWORD_MAP = {
  'सड़क': 'street road highway municipal',
  'लाइट': 'led light luminaire lighting lamp',
  'वाटरप्रूफ': 'waterproof ip65 ip66 ingress protection',
  'सीमेंट': 'cement opc ppc concrete construction grade',
  'कंक्रीट': 'concrete rcc reinforced cement concrete',
  'सुरक्षा': 'safety protective ppe',
  'हेलमेट': 'helmet industrial helmet head protection',
  'जूते': 'footwear shoes safety boot steel toe',
  'सोलर': 'solar pv photovoltaic panel renewable',
  'पाइप': 'pipe hdpe upvc ductile iron water supply',
  'पंप': 'water pump centrifugal submersible monobloc',
  'तार': 'wire cable pvc conductor electrical',
  'केबल': 'cable xlpe armored power electrical',
  'बिजली': 'electrical voltage power current transformer',
  'ट्रांसफार्मर': 'transformer distribution substation bee loss',
  'स्टील': 'steel tmt rebar structural iron',
  'ऊर्जा': 'energy efficient bee star',
  'पानी': 'water supply potable drinking pipe',

  'sadak': 'street road municipal',
  'pani': 'water supply potable',
  'bijli': 'electrical power',
  'pump': 'water pump centrifugal submersible',
  'tar': 'wire cable conductor',
  'suraksha': 'safety protection',
  'chhat': 'rooftop solar',
  'roshni': 'lighting led luminaire',
  'paka': 'construction cement concrete',
  'majboot': 'strength tensile high grade',
  'chahiye': 'required need specification'
};

/**
 * Detect language of input string
 */
export const detectLanguage = (text = '') => {
  const hindiRegex = /[\u0900-\u097F]/;
  const hasDevanagari = hindiRegex.test(text);
  
  const hinglishWords = ['ke liye', 'chahiye', 'sadak', 'bijli', 'pani', 'aur', 'hona', 'kaam'];
  const hasHinglish = hinglishWords.some(w => text.toLowerCase().includes(w));

  if (hasDevanagari && text.match(/[a-zA-Z]/)) return 'Hindi + English (Mixed)';
  if (hasDevanagari) return 'Hindi (हिंदी)';
  if (hasHinglish) return 'Hinglish (Hindi in Roman script)';
  return 'English';
};

/**
 * Normalize Hindi/Hinglish text
 */
export const normalizeBilingualInput = (text = '') => {
  let enrichedText = text.toLowerCase();
  for (const [key, replacement] of Object.entries(HINDI_KEYWORD_MAP)) {
    if (enrichedText.includes(key.toLowerCase())) {
      enrichedText += ` ${replacement}`;
    }
  }
  return enrichedText;
};

/**
 * Ambiguity & Missing Information Detection
 */
export const checkAmbiguityAndMissingInfo = (text = '', category = '') => {
  const lower = text.toLowerCase().trim();

  // Water Pump Ambiguity check
  const isPumpQuery = lower.includes('pump') || lower.includes('पंप');
  const hasPumpSpecifics = 
    lower.includes('submersible') ||
    lower.includes('centrifugal') ||
    lower.includes('monoset') ||
    lower.includes('monobloc') ||
    lower.includes('borewell') ||
    lower.includes('tubewell') ||
    lower.includes('deep well') ||
    lower.includes('sewage pump') ||
    lower.includes('8034') ||
    lower.includes('8472') ||
    lower.includes('9079');

  if (isPumpQuery && !hasPumpSpecifics) {
    return {
      isAmbiguous: true,
      title: 'More Information Required to Identify Applicable Indian Standard',
      reason: 'The procurement requirement "Water Pump" is too ambiguous. Indian Standards (IS 8472, IS 8034, IS 9079) differentiate heavily based on pump mechanism, installation depth, and fluid type.',
      clarificationQuestions: [
        {
          id: 'pumpType',
          question: 'What is the pump mechanism / construction type?',
          options: [
            { label: 'Centrifugal Pump (Surface Mounted)', value: 'Centrifugal surface pump for clear cold water', targetIS: 'IS 8472: 2019' },
            { label: 'Submersible Pumpset (Deep Borewell / Tubewell)', value: 'Submersible pumpset for deep borewells', targetIS: 'IS 8034: 2018' },
            { label: 'Electric Monoset / Monobloc Pump', value: 'Electric monoset monobloc clear water pump', targetIS: 'IS 9079: 2018' }
          ]
        },
        {
          id: 'capacity',
          question: 'What is the required power rating or operating capacity?',
          options: [
            { label: '3 HP / 2.2 kW (Domestic / Small Farm)', value: '3 HP (2.2 kW) power rating' },
            { label: '5 HP / 3.7 kW (Standard Agricultural / Municipal)', value: '5 HP (3.7 kW) power rating' },
            { label: '10 HP or above (Bulk Water Supply)', value: '10 HP (7.5 kW) power rating' }
          ]
        },
        {
          id: 'application',
          question: 'What is the intended installation environment?',
          options: [
            { label: 'Agricultural Irrigation (Clear Cold Water)', value: 'Agricultural irrigation water supply' },
            { label: 'Municipal Potable Water Distribution', value: 'Municipal potable water distribution' },
            { label: 'Open Well / Deep Tubewell Groundwater', value: 'Deep tubewell groundwater extraction' }
          ]
        }
      ]
    };
  }

  return { isAmbiguous: false };
};

/**
 * Extract 12+ Structured Procurement Requirements
 */
export const extractStructuredProcurementRequirements = (text = '', category = '') => {
  const lower = (text + ' ' + category).toLowerCase();
  
  // Product Identification
  let detectedProduct = 'General Procurement Item';
  let detectedCategory = category || 'General';
  let intendedApplication = 'Public Infrastructure & Operations';
  let material = 'Standard Engineering Grade';
  let capacity = 'Standard Rated Capacity';
  let environmental = 'Indoor / Standard Room Climate';
  let electricalSafety = 'Standard Insulation Protection';
  let performance = 'Standard Operating Efficacy';
  let testing = 'Factory Routine & Acceptance Tests';
  let certification = 'Standard BIS Conformity';
  let installation = 'Standard Engineering Guidelines';

  // Domain-specific intelligence
  if (lower.includes('street light') || lower.includes('road light') || lower.includes('luminaire') || lower.includes('led')) {
    detectedProduct = 'Outdoor LED Street Lighting Luminaire';
    detectedCategory = 'LED Lighting';
    intendedApplication = 'Municipal roads, expressways, public thoroughfares';
    material = 'Die-cast Aluminium housing with toughened glass / polycarbonate lens';
    capacity = lower.includes('100w') ? '100 Watts' : lower.includes('watt') ? 'Specified Wattage' : 'Standard LED Wattage';
    environmental = 'Outdoor weatherproof (IP65 / IP66 Ingress Protection)';
    electricalSafety = 'Class I electrical safety, 10kV surge protection, driver dielectric insulation';
    performance = '>= 120 lm/W luminous efficacy, CCT 5700K, CRI >= 70, L70 life > 50,000 hrs';
    testing = 'Type testing as per IS 10322, photobiological safety IS 16108, surge test at NABL lab';
    certification = 'Mandatory BIS Compulsory Registration Scheme (CRS) under MeitY QCO + BEE Star';
    installation = 'Pole mounting with adjustable tilt bracket as per IS 1944';
  } else if (lower.includes('cement') || lower.includes('opc') || lower.includes('concrete')) {
    detectedProduct = 'Ordinary Portland Cement (53 Grade)';
    detectedCategory = 'Cement & Building Materials';
    intendedApplication = 'Prestressed concrete bridges, high-strength RCC structures, public highways';
    material = 'Clinker ground with gypsum (High tricalcium silicate C3S content)';
    capacity = '53 MPa 28-day minimum compressive strength';
    environmental = 'Dry storage, moisture-resistant packaging (HDPE/Paper bags)';
    electricalSafety = 'N/A (Civil Material)';
    performance = 'Initial setting time >= 30 min, Final setting time <= 600 min, Soundness <= 10 mm';
    testing = 'Physical tests as per IS 4031 (Parts 1-15), chemical analysis as per IS 4032';
    certification = 'Mandatory BIS ISI Mark (Scheme I) under DPIIT Cement Quality Control Order';
    installation = 'Batching & curing strictly conforming to IS 456 (Plain and Reinforced Concrete)';
  } else if (lower.includes('helmet') || lower.includes('head protection') || lower.includes('ppe')) {
    detectedProduct = 'Industrial Safety Helmet (Hard Hat)';
    detectedCategory = 'Personal Protective Equipment';
    intendedApplication = 'Construction sites, mines, refineries, heavy engineering works';
    material = 'High Density Polyethylene (HDPE) / ABS virgin shell with cradle harness';
    capacity = 'Impact energy absorption <= 5.0 kN transmitted force';
    environmental = 'UV resistant, tropical temperature endurance (-10°C to +50°C)';
    electricalSafety = 'Electrical insulation proof test up to 2200 V AC';
    performance = 'Penetration resistance, flame retardance, adjustable chin strap';
    testing = 'Impact attenuation test, crown clearance, penetration test as per IS 2925';
    certification = 'Mandatory BIS ISI Mark under DPIIT PPE Quality Control Order 2021';
    installation = 'Worker fitment guidelines conforming to DGMS / Factory Act';
  } else if (lower.includes('solar') || lower.includes('pv') || lower.includes('photovoltaic')) {
    detectedProduct = 'Crystalline Silicon Terrestrial Solar PV Module';
    detectedCategory = 'Solar & Renewable Energy';
    intendedApplication = 'Utility scale solar power plants, ground mounted & rooftop solar arrays';
    material = 'Mono-PERC / Polycrystalline silicon wafers, EVA encapsulation, anodized aluminium frame';
    capacity = '500Wp - 550Wp rated power at STC';
    environmental = 'Mechanical load 5400 Pa (Snow/Wind), Hail impact 25mm at 23 m/s, PID resistant';
    electricalSafety = '1500V DC system voltage rating, Class II safety qualification, IP68 junction box';
    performance = 'Module efficiency >= 21%, positive power tolerance (0 to +5W), low temperature coefficient';
    testing = 'Thermal cycling (200 cycles), Damp heat 85°C/85% RH (1000h) as per IS 14286';
    certification = 'Mandatory BIS CRS Registration + MNRE Approved List of Models and Manufacturers (ALMM)';
    installation = 'Module mounting structure with stainless steel fasteners and grounding per IS 3043';
  } else if (lower.includes('pipe') || lower.includes('hdpe') || lower.includes('water supply')) {
    detectedProduct = 'High Density Polyethylene (HDPE) Pressure Pipe';
    detectedCategory = 'Pipes & Water Supply';
    intendedApplication = 'Potable drinking water mains, Jal Jeevan Mission rural & urban distribution';
    material = 'Virgin High Density Polyethylene PE-100 grade material with carbon black';
    capacity = 'PN 10 / PN 16 pressure rating (10 to 16 kg/cm²)';
    environmental = 'Underground buried pipeline, chemical and soil corrosion resistant';
    electricalSafety = 'N/A (Polymer Hydraulic Pipe)';
    performance = 'Hydrostatic internal pressure strength, Melt Flow Rate (0.2-1.1 g/10min), OIT > 20 min';
    testing = 'Hydrostatic test at 80°C for 165 hours as per IS 4984 Clause 8';
    certification = 'Mandatory BIS ISI Mark under DPIIT Pipes Quality Control Order';
    installation = 'Butt-fusion jointing and trench laying conforming to IS 7634 (Part 2)';
  } else if (lower.includes('pump') || lower.includes('submersible') || lower.includes('centrifugal')) {
    detectedProduct = lower.includes('submersible') ? 'Submersible Borewell Pumpset' : 'Centrifugal Clear Water Pump';
    detectedCategory = 'Pumps & Water Equipment';
    intendedApplication = 'Deep well groundwater extraction, agricultural irrigation, municipal boosting';
    material = 'Cast iron / Stainless steel impeller, copper wound motor, stainless steel shaft';
    capacity = '5 HP (3.7 kW) / 10 HP Power Rating';
    environmental = 'Submerged in groundwater / Surface pump house (IP55/IP68)';
    electricalSafety = 'Class F insulation, earthing terminal as per IS 3043, thermal overload protector';
    performance = 'High overall efficiency (BEE 5-Star rated), optimized head vs discharge curve';
    testing = 'Hydraulic performance & efficiency test as per IS 11346';
    certification = 'Mandatory BIS ISI Mark + BEE Mandatory Star Labeling under Energy Conservation Act';
    installation = 'Installation & piping alignment as per IS 9694 (Code of Practice for Agricultural Pumps)';
  }

  // Structured Itemized tags
  const structuredItems = [
    { label: 'Product Title', value: detectedProduct, category: 'Product' },
    { label: 'Category', value: detectedCategory, category: 'Classification' },
    { label: 'Intended Application', value: intendedApplication, category: 'Application' },
    { label: 'Material & Construction', value: material, category: 'Material' },
    { label: 'Capacity / Rating', value: capacity, category: 'Technical' },
    { label: 'Environmental Protection', value: environmental, category: 'Environmental' },
    { label: 'Electrical & Safety', value: electricalSafety, category: 'Safety' },
    { label: 'Performance Criteria', value: performance, category: 'Performance' },
    { label: 'Testing & Verification', value: testing, category: 'Testing' },
    { label: 'Statutory Certification', value: certification, category: 'Certification' },
    { label: 'Installation Guidelines', value: installation, category: 'Installation' }
  ];

  return {
    detectedProduct,
    detectedCategory,
    structuredItems
  };
};

/**
 * Detect Outdated Standard References in Input
 */
export const detectOutdatedReferences = (rawInput = '') => {
  const outdatedMap = [
    {
      oldNumber: 'IS 8112',
      citedYear: '1989',
      currentNumber: 'IS 269: 2015',
      currentYear: 2015,
      reason: 'IS 8112 (43 Grade OPC) and IS 12269 (53 Grade OPC) were superseded and unified into the 6th Revision of IS 269: 2015.',
      severity: 'HIGH',
      action: 'Update tender citation to IS 269: 2015 (incorporating 33, 43 and 53 Grade Ordinary Portland Cement).'
    },
    {
      oldNumber: 'IS 12269',
      citedYear: '1987',
      currentNumber: 'IS 269: 2015',
      currentYear: 2015,
      reason: 'IS 12269: 1987 was unified into IS 269: 2015. Citing IS 12269 separately is obsolete.',
      severity: 'HIGH',
      action: 'Cite IS 269: 2015 with 53 Grade designation in the technical schedule.'
    },
    {
      oldNumber: 'IS 10322 (Part 5/Sec 3): 1987',
      citedYear: '1987',
      currentNumber: 'IS 10322 (Part 5/Sec 3): 2012',
      currentYear: 2012,
      reason: 'The 1987 edition covers obsolete discharge lamps; the 2012 edition governs modern solid-state LED road luminaires.',
      severity: 'HIGH',
      action: 'Replace IS 10322: 1987 with IS 10322 (Part 5/Sec 3): 2012 with Amendment 1 & 2.'
    },
    {
      oldNumber: 'IS 2147',
      citedYear: '1962',
      currentNumber: 'IS/IEC 60529: 2001',
      currentYear: 2001,
      reason: 'IS 2147: 1962 was superseded by harmonized IS/IEC 60529: 2001 for Ingress Protection (IP Codes).',
      severity: 'MEDIUM',
      action: 'Update IP enclosure rating citation to IS/IEC 60529: 2001 (Reaffirmed 2019).'
    },
    {
      oldNumber: 'IS 4984: 1995',
      citedYear: '1995',
      currentNumber: 'IS 4984: 2016',
      currentYear: 2016,
      reason: 'The 1995 edition allows older PE-63 material; 2016 5th Revision mandates PE-80/PE-100 high-density material.',
      severity: 'HIGH',
      action: 'Update HDPE pipe specification to IS 4984: 2016 (5th Revision) with PE-100 material.'
    }
  ];

  const detectedOutdated = [];
  const lower = rawInput.toLowerCase();

  for (const item of outdatedMap) {
    if (lower.includes(item.oldNumber.toLowerCase()) && !lower.includes(item.currentNumber.toLowerCase())) {
      detectedOutdated.push(item);
    }
  }

  return detectedOutdated;
};

/**
 * Tender Gap Detection Engine
 */
export const detectTenderGaps = (rawInput = '', primaryStandards = [], extractedReqs = []) => {
  const lower = rawInput.toLowerCase();
  const gaps = [];

  // Gap 1: Missing Testing Standard
  const hasTestingRef = lower.includes('test') || lower.includes('is 16107') || lower.includes('is 4031') || lower.includes('is 516') || lower.includes('is 11346') || lower.includes('is 10810') || lower.includes('is 1608');
  if (!hasTestingRef) {
    gaps.push({
      category: 'Testing & Verification Gap',
      severity: 'HIGH',
      title: 'No Explicit Indian Standard Test Method Cited',
      description: 'The tender specification describes functional parameters but omits statutory test standards (e.g. type test, optical efficacy, compressive test, or hydrostatic test).',
      remedy: `Include companion test standard ${primaryStandards[0]?.testingStandards?.[0] || 'IS Testing Protocol'} as mandatory acceptance criteria.`
    });
  }

  // Gap 2: Missing Certification / CRS Mandate
  const hasCertClause = lower.includes('bis') || lower.includes('isi') || lower.includes('crs') || lower.includes('qco') || lower.includes('cml') || lower.includes('bee');
  if (!hasCertClause) {
    gaps.push({
      category: 'Statutory Certification Gap',
      severity: 'HIGH',
      title: 'Mandatory BIS / CRS Certification Clause Missing',
      description: 'The specification does not mandate valid BIS License (CML Number) or Compulsory Registration Scheme (R-Number) from bidders prior to bid submission.',
      remedy: 'Add mandatory clause: "Bidder must submit a valid BIS License / CRS Registration certificate active on the date of bid submission."'
    });
  }

  // Gap 3: Environmental / IP Ingress Gap
  if (lower.includes('light') || lower.includes('led') || lower.includes('solar') || lower.includes('transformer') || lower.includes('pump')) {
    if (!lower.includes('ip65') && !lower.includes('ip66') && !lower.includes('ip67') && !lower.includes('ip68') && !lower.includes('ip55')) {
      gaps.push({
        category: 'Environmental Protection Gap',
        severity: 'MEDIUM',
        title: 'Ingress Protection (IP Code) Unspecified',
        description: 'For outdoor and industrial equipment, failure to specify IP code allows suppliers to offer inadequate dust/water protection.',
        remedy: 'Explicitly specify IP66 (for street lighting) or IP68 (for junction boxes/submersible equipment) tested per IS/IEC 60529.'
      });
    }
  }

  // Gap 4: Electrical Surge Protection Gap
  if ((lower.includes('led') || lower.includes('street light')) && !lower.includes('surge') && !lower.includes('10kv')) {
    gaps.push({
      category: 'Electrical Reliability Gap',
      severity: 'MEDIUM',
      title: 'Surge Protection Rating (10kV) Missing',
      description: 'Indian distribution grid conditions experience frequent voltage transients. Absence of minimum 10kV SPD clause leads to premature driver failures.',
      remedy: 'Mandate integral Surge Protection Device (SPD) rated for minimum 10kV / 5kA conforming to IS 15885 (Part 2/Sec 13).'
    });
  }

  // Gap 5: Installation & Grounding Gap
  if (!lower.includes('is 3043') && !lower.includes('is 456') && !lower.includes('is 1944') && !lower.includes('is 7634') && !lower.includes('is 9694')) {
    gaps.push({
      category: 'Installation & Workmanship Gap',
      severity: 'LOW',
      title: 'Installation Code of Practice Not Referenced',
      description: 'Tender does not tie contractor workmanship to published Indian Standard Codes of Practice.',
      remedy: `Reference relevant installation standard (${primaryStandards[0]?.installationStandards?.[0] || 'IS Code of Practice'}) in execution terms.`
    });
  }

  return gaps;
};

/**
 * Calculate Procurement Readiness Score (0-100)
 */
export const calculateProcurementReadinessScore = (gaps = [], outdated = [], primaryStandards = []) => {
  let score = 95;

  gaps.forEach(g => {
    if (g.severity === 'HIGH') score -= 12;
    else if (g.severity === 'MEDIUM') score -= 6;
    else score -= 3;
  });

  outdated.forEach(() => {
    score -= 10;
  });

  if (primaryStandards.length === 0) score -= 30;

  const finalScore = Math.max(35, Math.min(score, 98));

  const breakdown = {
    standardsCoverage: primaryStandards.length > 0 ? 92 : 40,
    testingCoverage: gaps.some(g => g.category.includes('Testing')) ? 55 : 90,
    safetyCoverage: gaps.some(g => g.category.includes('Reliability') || g.category.includes('Safety')) ? 68 : 94,
    certificationCoverage: gaps.some(g => g.category.includes('Certification')) ? 50 : 96,
    versionCurrency: outdated.length > 0 ? 60 : 95,
    technicalCompleteness: Math.round(finalScore * 0.95)
  };

  return {
    totalScore: finalScore,
    statusLabel: finalScore >= 85 ? 'Tender Ready (High Quality)' : finalScore >= 70 ? 'Minor Revisions Advised' : 'Substantial Gaps Detected',
    actionCount: gaps.length + outdated.length,
    breakdown
  };
};

/**
 * Generate Complete Improved Procurement Specification Text
 */
export const generateImprovedTenderSpecification = (productName, category, primaryStandards = [], testingStandards = [], certifications = [], structured = {}) => {
  const prim = primaryStandards[0] || { standardNumber: 'IS Standard', title: productName };
  const primList = primaryStandards.map(s => `• ${s.standardNumber} (${s.title})`).join('\n');
  const testList = (testingStandards.length > 0 ? testingStandards : primaryStandards)
    .map(s => `• ${s.testingStandards?.[0] || s.standardNumber} — Method of Verification & Type Test`)
    .join('\n');
  
  const certList = certifications.map(c => `• ${c.type} under ${c.authority} (${c.mandateReason.substring(0, 100)}...)`).join('\n');

  return `TECHNICAL SPECIFICATION & PROCUREMENT SCHEDULE
================================================================================
TENDER ITEM: ${productName.toUpperCase()}
CLASSIFICATION: ${category}
STATUTORY BASELINE: BUREAU OF INDIAN STANDARDS (BIS) CONFORMITY

1. PRODUCT DEFINITION & SCOPE OF SUPPLY
--------------------------------------------------------------------------------
The scope covers manufacture, testing at factory, supply, and delivery of ${productName} strictly complying with active Indian Standards and statutory Quality Control Orders.

2. MANDATORY APPLICABLE INDIAN STANDARDS
--------------------------------------------------------------------------------
The equipment / material supplied shall strictly conform to the latest edition along with all published amendments of the following Indian Standards:

${primList}
• IS/IEC 60529: 2001 (Degrees of Protection Provided by Enclosures - IP Code)
• IS 3043: 2018 (Code of Practice for Earthing & Electrical Safety)

3. TECHNICAL & PERFORMANCE REQUIREMENTS
--------------------------------------------------------------------------------
• Primary Construction: Heavy duty industrial grade conforming to ${prim.standardNumber}.
• Ingress Protection: Minimum IP65 / IP66 enclosure sealing against dust & moisture.
• Energy / Operating Efficacy: High efficiency design conforming to BEE star schedules / IS performance criteria.
• Surge Withstand Capability: Minimum 10kV / 5kA transient surge suppression (for electrical/electronic items).
• Operating Temperature Range: Tropical Indian climatic endurance (-10°C to +50°C).

4. QUALITY ASSURANCE & TESTING REQUIREMENTS
--------------------------------------------------------------------------------
The following tests shall be conducted as per mandatory Indian Standard test protocols:
${testList}

• Type Test Certificates: Supplier must provide Type Test reports from an ILAC/NABL accredited laboratory carried out within the last 3 years.
• Acceptance Tests: Visual inspection, dimensional verification, and routine batch testing shall be witnessed by the Indenting Officer / Third Party Inspection Agency.

5. STATUTORY CERTIFICATION & MANDATORY COMPLIANCE
--------------------------------------------------------------------------------
${certList}
• The bidder MUST possess an active and valid BIS License (CML / R-Number) on the date of tender submission. Bids citing expired or non-compliant licenses shall be summarily rejected.

6. INSTALLATION & WORKMANSHIP GUIDELINES
--------------------------------------------------------------------------------
Installation, handling, and jointing shall strictly adhere to ${prim.installationStandards?.[0] || 'IS Code of Practice'} and relevant CPWD/State PWD guidelines.

7. STATUTORY VERIFICATION NOTICE
--------------------------------------------------------------------------------
AI-generated draft technical schedule. Indenting Officers must verify the active edition, latest published amendments, and supplier BIS license status on manakonline.in prior to tender publication.
================================================================================`;
};

/**
 * Main Hybrid RAG & AI Recommendation Pipeline
 */
export const findRelevantStandards = async (inputSpec = '', category = '', externalApiKey = '') => {
  const detectedLang = detectLanguage(inputSpec);
  const normalizedText = normalizeBilingualInput(inputSpec);
  
  // Step 1: Check Ambiguity & Missing Information
  const ambiguityCheck = checkAmbiguityAndMissingInfo(inputSpec, category);
  if (ambiguityCheck.isAmbiguous) {
    return {
      success: true,
      requiresClarification: true,
      detectedLanguage: detectedLang,
      ambiguityDetails: ambiguityCheck,
      extractedRequirements: []
    };
  }

  // Step 2: Extract Structured Requirements
  const structuredData = extractStructuredProcurementRequirements(inputSpec, category);
  const inputWords = normalizedText.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 2);

  // Step 3: Semantic & Metadata Scoring
  const scoredStandards = INDIAN_STANDARDS_DATABASE.map(std => {
    let score = 0;
    const stdText = `${std.standardNumber} ${std.title} ${std.scope} ${std.category} ${std.industry} ${std.keywords.join(' ')}`.toLowerCase();
    
    if (category && std.category.toLowerCase().includes(category.toLowerCase())) {
      score += 25;
    }

    let keywordHits = 0;
    for (const word of inputWords) {
      if (std.keywords.some(k => k.includes(word) || word.includes(k))) {
        keywordHits += 8;
      } else if (stdText.includes(word)) {
        keywordHits += 4;
      }
    }
    score += Math.min(keywordHits, 65);

    // Domain boosts
    if ((inputWords.includes('street') || inputWords.includes('road')) && std.standardNumber.includes('10322 (Part 5/Sec 3)')) score += 35;
    if (inputWords.includes('driver') && std.standardNumber.includes('15885')) score += 30;
    if (inputWords.includes('efficacy') && std.standardNumber.includes('16107')) score += 25;
    if ((inputWords.includes('cement') || inputWords.includes('opc')) && std.standardNumber.includes('269')) score += 45;
    if ((inputWords.includes('helmet') || inputWords.includes('head')) && std.standardNumber.includes('2925')) score += 45;
    if ((inputWords.includes('shoes') || inputWords.includes('footwear')) && std.standardNumber.includes('15298')) score += 45;
    if ((inputWords.includes('solar') || inputWords.includes('pv')) && std.standardNumber.includes('14286')) score += 45;
    if ((inputWords.includes('pipe') || inputWords.includes('hdpe')) && std.standardNumber.includes('4984')) score += 45;
    if ((inputWords.includes('cable') || inputWords.includes('wire')) && std.standardNumber.includes('694')) score += 45;
    if (inputWords.includes('transformer') && std.standardNumber.includes('1180')) score += 45;
    if (inputWords.includes('pump') && inputWords.includes('submersible') && std.standardNumber.includes('8034')) score += 50;
    if (inputWords.includes('pump') && (inputWords.includes('centrifugal') || inputWords.includes('surface')) && std.standardNumber.includes('8472')) score += 50;
    if (inputWords.includes('pump') && inputWords.includes('monoset') && std.standardNumber.includes('9079')) score += 50;

    let finalRelevance = Math.min(Math.round(Math.max(score, 45)), 96);
    if (score < 15) finalRelevance = Math.max(20, score * 2);

    let confidenceLabel = 'Possibly Relevant';
    if (finalRelevance >= 88) confidenceLabel = 'Highly Relevant';
    else if (finalRelevance >= 75) confidenceLabel = 'Relevant';

    return {
      ...std,
      relevanceScore: finalRelevance,
      confidenceLabel,
      whyRecommended: generateWhyRecommended(std, inputSpec)
    };
  });

  const candidates = scoredStandards
    .filter(s => s.relevanceScore >= 50)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  if (candidates.length === 0) {
    return {
      success: false,
      detectedLanguage: detectedLang,
      message: 'No sufficiently relevant standards were identified from the current knowledge base. Try adding more technical details or consult an expert.'
    };
  }

  // Primary vs Alternative Matches
  const primaryStandards = candidates.slice(0, 3);
  const alternativeStandards = candidates.slice(3, 6).map(alt => ({
    ...alt,
    whyAlternative: alt.whyAlternativeNotPrimary || 'Applies to specialized sub-categories or alternative construction materials.'
  }));

  // Allied / Testing / Safety Standards
  const relatedNumbers = new Set();
  primaryStandards.forEach(p => {
    (p.normativeReferences || []).forEach(r => relatedNumbers.add(r));
    (p.relatedStandards || []).forEach(r => relatedNumbers.add(r));
    (p.testingStandards || []).forEach(r => relatedNumbers.add(r));
    (p.safetyStandards || []).forEach(r => relatedNumbers.add(r));
  });

  const relatedStandards = [];
  const testingStandards = [];
  const safetyStandards = [];

  INDIAN_STANDARDS_DATABASE.forEach(std => {
    const isAlreadyPrimary = primaryStandards.some(p => p.standardNumber === std.standardNumber);
    if (isAlreadyPrimary) return;

    const isReferenced = Array.from(relatedNumbers).some(ref => ref.includes(std.standardNumber.split(':')[0].trim()));
    const isCategoryMatched = candidates.some(c => c.standardNumber === std.standardNumber);

    if (isReferenced || isCategoryMatched) {
      let relType = 'Normative Reference';
      if (std.category.includes('Testing') || std.title.toLowerCase().includes('test') || std.title.toLowerCase().includes('method')) {
        relType = 'Testing Standard';
        testingStandards.push({
          ...std,
          relevanceScore: Math.max(std.relevanceScore || 84, 82),
          whyRecommended: `Mandated for verifying compliance of physical and electrical parameters.`
        });
      } else if (std.category.includes('Safety') || std.title.toLowerCase().includes('safety')) {
        relType = 'Safety Standard';
        safetyStandards.push({
          ...std,
          relevanceScore: Math.max(std.relevanceScore || 88, 86),
          whyRecommended: `Mandatory protection against hazard, electrical shock, and mechanical stress.`
        });
      } else {
        relType = 'Allied Standard';
      }

      relatedStandards.push({
        standardNumber: std.standardNumber,
        title: std.title,
        relationshipType: relType,
        relevanceScore: Math.max(std.relevanceScore || 80, 78),
        status: std.status,
        edition: std.edition,
        whyRelated: `Directly referenced by primary product specification for testing, safety, or sub-component conformity.`
      });
    }
  });

  // Mandatory Certifications & Quality Control Orders (QCO)
  const certifications = [];

  // 1. Extract from standard objects if marked mandatory
  primaryStandards.forEach(p => {
    if (p.certification) {
      certifications.push({
        type: p.certification.scheme?.includes('CRS') ? 'Compulsory Registration Scheme (CRS)' : 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: p.standardNumber,
        authority: p.certification.notifyingMinistry || 'Bureau of Indian Standards (BIS) / DPIIT',
        mandateReason: `Covered under mandatory Quality Control Order: ${p.certification.orderName || 'Statutory Gazette QCO'}. Bidders must hold active BIS license / CRS registration.`,
        verificationNote: 'Verify valid BIS CML Number / R-Number on official e-BIS portal (manakonline.in) prior to bid award.'
      });
    }
  });

  const allStdNums = [...primaryStandards, ...relatedStandards].map(s => s.standardNumber).join(' ');
  const combinedText = (productName + ' ' + category + ' ' + inputSpec + ' ' + allStdNums).toLowerCase();

  // 2. Specialized Sector QCO Schemes
  if (combinedText.includes('led') || combinedText.includes('light') || combinedText.includes('luminaire') || combinedText.includes('10322') || combinedText.includes('15885') || combinedText.includes('16107')) {
    if (!certifications.some(c => c.type.includes('CRS'))) {
      certifications.push({
        type: 'Compulsory Registration Scheme (CRS)',
        status: 'Applicable',
        standardNumber: 'IS 10322 (Part 5/Sec 3) / IS 15885 (Part 2/Sec 13)',
        authority: 'Ministry of Electronics & Information Technology (MeitY)',
        mandateReason: 'Covered under Electronics and IT Goods (Requirement for Compulsory Registration) Order. Mandatory for all LED luminaires and controlgear.',
        verificationNote: 'Verify valid MeitY CRS R-Number on the official BIS CRS portal.'
      });
    }
    if (!certifications.some(c => c.type.includes('BEE'))) {
      certifications.push({
        type: 'BEE Star Labeling Energy Rating',
        status: 'Applicable',
        standardNumber: 'IS 16107 (Part 2/Sec 1) / BEE Schedules',
        authority: 'Bureau of Energy Efficiency (BEE), Ministry of Power',
        mandateReason: 'Mandatory energy efficiency star rating label under the Energy Conservation Act.',
        verificationNote: 'Check valid BEE Star rating certificate on the BEE online portal.'
      });
    }
  }

  if (combinedText.includes('cement') || combinedText.includes('opc') || combinedText.includes('ppc') || combinedText.includes('269') || combinedText.includes('1489') || combinedText.includes('12269')) {
    if (!certifications.some(c => c.type.includes('ISI'))) {
      certifications.push({
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 269: 2015',
        authority: 'DPIIT / Ministry of Commerce & Industry',
        mandateReason: 'Covered under mandatory Cement (Quality Control) Order. No cement can be manufactured, stored, sold, or procured without active ISI mark.',
        verificationNote: 'Verify active 7-digit CML Number on official e-BIS portal (manakonline.in).'
      });
    }
  }

  if (combinedText.includes('pump') || combinedText.includes('submersible') || combinedText.includes('motor') || combinedText.includes('8034') || combinedText.includes('8472')) {
    if (!certifications.some(c => c.type.includes('ISI'))) {
      certifications.push({
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 8034: 2018 / IS 8472: 2019',
        authority: 'Ministry of Heavy Industries / DPIIT',
        mandateReason: 'Covered under mandatory Submersible & Centrifugal Pumps (Quality Control) Order. Bidders must hold active CML license.',
        verificationNote: 'Verify active BIS CML license on e-BIS Manakonline portal.'
      });
    }
    if (!certifications.some(c => c.type.includes('BEE'))) {
      certifications.push({
        type: 'BEE Star Labeling Compliance (Minimum 3-Star / 5-Star)',
        status: 'Applicable',
        standardNumber: 'Energy Conservation Act, 2001 & BEE Pump Schedules',
        authority: 'Bureau of Energy Efficiency (BEE)',
        mandateReason: 'Mandatory energy efficiency star rating for all agricultural and municipal water pumpsets.',
        verificationNote: 'Verify BEE energy efficiency registration certificate in the BEE portal.'
      });
    }
  }

  if (combinedText.includes('helmet') || combinedText.includes('head') || combinedText.includes('ppe') || combinedText.includes('2925')) {
    if (!certifications.some(c => c.type.includes('ISI'))) {
      certifications.push({
        type: 'BIS ISI Product Certification (Scheme I)',
        status: 'Applicable',
        standardNumber: 'IS 2925: 1984',
        authority: 'DPIIT, Ministry of Commerce & Industry',
        mandateReason: 'Covered under mandatory Protective Equipment (Quality Control) Order. Industrial safety helmets must carry standard ISI mark.',
        verificationNote: 'Verify active CML License on official BIS portal.'
      });
    }
  }

  // Fallback if no specific rule matched
  if (certifications.length === 0) {
    certifications.push({
      type: 'BIS ISI Product Certification (Scheme I)',
      status: 'Applicable',
      standardNumber: primaryStandards[0]?.standardNumber || 'Applicable Product Standard',
      authority: 'Bureau of Indian Standards / DPIIT',
      mandateReason: 'Mandatory certification under Government of India Gazette Quality Control Orders (QCO) and Rule 144 of GFR 2017.',
      verificationNote: 'Verify valid BIS CML license on manakonline.in prior to contract award.'
    });
  }

  // Outdated Standards & Tender Gaps
  const outdatedReferences = detectOutdatedReferences(inputSpec);
  const tenderGaps = detectTenderGaps(inputSpec, primaryStandards, structuredData.structuredItems);
  const procurementReadiness = calculateProcurementReadinessScore(tenderGaps, outdatedReferences, primaryStandards);

  // Improved Tender Specification
  const improvedSpecification = generateImprovedTenderSpecification(
    structuredData.detectedProduct,
    category || structuredData.detectedCategory,
    primaryStandards,
    testingStandards,
    certifications,
    structuredData
  );

  const overallConfidence = primaryStandards.length > 0 
    ? Math.round(primaryStandards.reduce((acc, curr) => acc + curr.relevanceScore, 0) / primaryStandards.length)
    : 70;

  let overallConfidenceLabel = 'Highly Relevant';
  if (overallConfidence < 75) overallConfidenceLabel = 'Possibly Relevant';
  else if (overallConfidence < 88) overallConfidenceLabel = 'Relevant';

  const aiExplanation = {
    summary: `The specification describes procurement requirements concerning ${primaryStandards.map(p => p.title.split('-')[0].trim()).join(', ')}. The recommendation engine matched the technical parameters against published BIS standard scopes, normative cross-references, and statutory quality control orders.`,
    matchedKeyRequirements: structuredData.structuredItems.map(r => `${r.label}: ${r.value}`),
    regulatoryConsiderations: `As per official Government of India public procurement policies (Make in India Order / BIS QCOs), all tender items matching these specifications require mandatory BIS certification or CRS registration where notified.`,
    riskCautionNote: `AI-generated decision support. Recommendation relevance scores and certification requirements do not constitute legal advice. Tender authorities must confirm current edition and amendment validity on the official BIS portal (bis.gov.in).`
  };

  return {
    success: true,
    requiresClarification: false,
    detectedLanguage: detectedLang,
    overallConfidence,
    overallConfidenceLabel,
    structuredRequirements: structuredData.structuredItems,
    extractedRequirements: structuredData.structuredItems.map(s => ({ tag: s.value, category: s.category, importance: 'Critical' })),
    primaryStandards,
    alternativeStandards,
    relatedStandards: relatedStandards.slice(0, 6),
    testingStandards: testingStandards.slice(0, 3),
    safetyStandards: safetyStandards.slice(0, 3),
    certifications,
    outdatedReferences,
    tenderGaps,
    procurementReadiness,
    improvedSpecification,
    aiExplanation
  };
};

function generateWhyRecommended(std, rawInput) {
  const stdNum = std.standardNumber;
  if (stdNum.includes('10322 (Part 5/Sec 3)')) return 'Primary Indian Standard governing luminaires specifically constructed for public roads and municipal street lighting, covering weatherproof ingress protection, wind load, and thermal stability.';
  if (stdNum.includes('15885')) return 'Mandatory electronic controlgear (LED driver) standard required to ensure surge protection (up to 10kV), current regulation, and electrical safety under Indian power grid fluctuations.';
  if (stdNum.includes('16107')) return 'Specifies optical performance, minimum luminous efficacy (lm/W), CRI, and rated operating life (L70) required for tender evaluation.';
  if (stdNum.includes('60529')) return 'The normative benchmark standard defining IP65/IP66 enclosure protection against dust entry and pressurized water ingress.';
  if (stdNum.includes('269')) return 'Governs chemical and physical specifications for 33, 43, and 53 Grade Ordinary Portland Cement, establishing mandatory compressive strength parameters.';
  if (stdNum.includes('456')) return 'National structural code of practice defining concrete mix design, durability, minimum cover, and structural reinforcement criteria.';
  if (stdNum.includes('2925')) return 'Primary industrial safety standard specifying impact attenuation, crown clearance, and penetration resistance for personal protective headwear.';
  if (stdNum.includes('15298')) return 'Mandatory PPE standard specifying 200J steel toecap impact resistance, anti-penetration midsole, and slip resistance on industrial surfaces.';
  if (stdNum.includes('14286')) return 'Standard design qualification and type approval standard for terrestrial crystalline silicon solar PV modules.';
  if (stdNum.includes('694')) return 'Mandatory specification for PVC insulated copper and aluminium electrical wiring cables up to 1100V with fire retardant properties.';
  if (stdNum.includes('4984')) return 'Primary product standard for HDPE pipes for pressurized potable water transmission under public health engineering and Jal Jeevan Mission.';
  if (stdNum.includes('8472')) return 'Primary Indian Standard specifying hydraulic efficiency, construction, and acceptance testing for surface mounted centrifugal clear water pumps.';
  if (stdNum.includes('8034')) return 'Mandatory specification for deep borewell submersible pumpsets with water/oil lubricated motors and BEE star compliance.';

  return `Directly applicable because the procurement specification specifies ${std.category} characteristics matching the technical scope of ${std.standardNumber}.`;
}
