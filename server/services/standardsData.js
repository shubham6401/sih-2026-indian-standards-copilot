export const INDIAN_STANDARDS_DATABASE = [
  // ==========================================
  // LED LIGHTING & LUMINAIRES
  // ==========================================
  {
    standardNumber: "IS 10322 (Part 5/Sec 3): 2012",
    title: "Luminaires - Part 5 Particular Requirements - Section 3 Luminaires for Road and Street Lighting",
    scope: "Specifies requirements for road and street lighting luminaires for use with tungsten filament, tubular fluorescent and other discharge lamps on supply voltages not exceeding 1000 V. Covers mechanical, thermal, electrical safety, ingress protection (IP65/IP66), photobiological safety, windage resistance, and mounting durability.",
    category: "LED Lighting",
    industry: "Electrical & Municipal Infrastructure",
    edition: "3rd Revision (Reaffirmed 2022)",
    publicationYear: 2012,
    status: "Current",
    editionHistory: [
      { year: 1987, edition: "1st Edition", note: "Initial standard for conventional street lanterns (IS 10322 Pt 5 Sec 3: 1987)" },
      { year: 2012, edition: "3rd Revision", note: "Full harmonization with modern solid-state outdoor luminaires" },
      { year: 2016, edition: "Amendment 1", note: "Thermal endurance and optical degradation testing under Indian climate" },
      { year: 2020, edition: "Amendment 2", note: "Surge protection test harmonized up to 10kV for Indian grid" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2016-04-15", description: "Updated test methods for optical and thermal performance under tropical outdoor conditions." },
      { amendmentNumber: "Amendment No. 2", date: "2020-11-10", description: "Harmonization with LED driver surge protection requirements up to 10kV." }
    ],
    supersedes: "IS 10322 (Part 5/Sec 3): 1987",
    normativeReferences: ["IS/IEC 60529: 2001", "IS 15885 (Part 2/Sec 13): 2012", "IS 16107 (Part 2/Sec 1): 2012", "IS 16108: 2012"],
    relatedStandards: ["IS 16103 (Part 1): 2012", "IS 16102 (Part 1): 2012", "IS 6873 (Part 5): 1999"],
    testingStandards: ["IS 16107 (Part 1): 2012 (Lumen Efficacy & Thermal Test)", "IS/IEC 60529: 2001 (IP65/IP66 Ingress Protection)", "IS 1608 (Part 1): 2018 (Mechanical Tensile)"],
    safetyStandards: ["IS 15885 (Part 2/Sec 13): 2012 (LED Driver Safety)", "IS 16108: 2012 (Photobiological Safety)"],
    installationStandards: ["IS 1944 (Part 1 & 2): 1970 (Code of Practice for Lighting of Public Thoroughfares)"],
    certification: {
      isMandatory: true,
      scheme: "Compulsory Registration Scheme (CRS) / BIS Scheme I",
      notifyingMinistry: "Ministry of Electronics and Information Technology (MeitY) & Ministry of Power",
      orderName: "Electronics and Information Technology Goods (Requirement for Compulsory Registration) Order",
      status: "Mandatory under BIS CRS"
    },
    whyAlternativeNotPrimary: "Primary specification for all public thoroughfare, highway, and municipal road luminaires.",
    keywords: ["led", "street light", "road lighting", "luminaire", "outdoor lighting", "municipal road", "waterproof", "ip65", "ip66", "100w", "highway light", "pole mount", "energy efficient"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 15885 (Part 2/Sec 13): 2012",
    title: "Safety of Lamp Controlgear - Part 2 Particular Requirements - Section 13 D.C. or A.C. Supplied Electronic Controlgear for LED Modules",
    scope: "Covers particular safety requirements for electronic controlgear (LED drivers) for use on D.C. supplies up to 250 V and A.C. supplies up to 1000 V at 50 Hz or 60 Hz and at an output frequency which may deviate from the supply frequency.",
    category: "LED Lighting",
    industry: "Electrical Equipment",
    edition: "1st Revision (Reaffirmed 2022)",
    publicationYear: 2012,
    status: "Current",
    editionHistory: [
      { year: 2012, edition: "1st Edition", note: "Enacted to mandate safety of electronic controlgear for LED lamps" },
      { year: 2017, edition: "Amendment 1", note: "Mandatory surge withstand voltage test addition" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2017-09-01", description: "Inclusion of surge withstand capability tests for Indian grid fluctuation conditions." }
    ],
    supersedes: "None",
    normativeReferences: ["IS 15885 (Part 1): 2011", "IS 14700 (Part 3/Sec 2): 2008"],
    relatedStandards: ["IS 10322 (Part 5/Sec 3): 2012", "IS 16103 (Part 1): 2012"],
    testingStandards: ["IS 16107 (Part 2/Sec 1): 2012", "IS 14700 (Part 3/Sec 2): 2008"],
    safetyStandards: ["IS 15885 (Part 1): 2011"],
    installationStandards: ["IS 732: 2019 (Code of Practice for Electrical Wiring Installations)"],
    certification: {
      isMandatory: true,
      scheme: "Compulsory Registration Scheme (CRS)",
      notifyingMinistry: "MeitY",
      orderName: "Electronics & IT Goods Compulsory Registration Order",
      status: "Mandatory under BIS CRS"
    },
    whyAlternativeNotPrimary: "Applies specifically to the sub-assembly electronic controlgear (driver) rather than the complete outdoor luminaire fixture.",
    keywords: ["led driver", "electronic controlgear", "power supply", "surge protection", "smps", "voltage fluctuations", "led module driver", "constant current driver"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 16107 (Part 2/Sec 1): 2012",
    title: "Luminaires Performance - Part 2 Particular Requirements - Section 1 LED Luminaire",
    scope: "Specifies performance requirements for LED luminaires for general lighting, covering lumen output, luminous efficacy (lm/W), correlated colour temperature (CCT), colour rendering index (CRI), rated life, lumen maintenance, and harmonic distortion.",
    category: "LED Lighting",
    industry: "Lighting Infrastructure",
    edition: "1st Edition (Reaffirmed 2022)",
    publicationYear: 2012,
    status: "Current",
    editionHistory: [
      { year: 2012, edition: "1st Edition", note: "Baseline performance criteria for LED fixtures" },
      { year: 2018, edition: "Amendment 1", note: "Elevated minimum efficacy threshold to 100 lm/W for tenders" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2018-02-14", description: "Enhanced minimum luminous efficacy baseline to 100 lm/W for municipal and industrial procurements." }
    ],
    supersedes: "None",
    normativeReferences: ["IS 10322 (Part 1): 2014", "IS 16103 (Part 2): 2012"],
    relatedStandards: ["IS 10322 (Part 5/Sec 3): 2012", "IS 15885 (Part 2/Sec 13): 2012"],
    testingStandards: ["IS 16107 (Part 1): 2012 (General Test Requirements for Luminaires)"],
    safetyStandards: ["IS 10322 (Part 1): 2014"],
    installationStandards: ["IS 1944 (Part 1): 1970"],
    certification: {
      isMandatory: true,
      scheme: "BEE Star Labeling & BIS Certification",
      notifyingMinistry: "Bureau of Energy Efficiency (BEE) / BIS",
      orderName: "Energy Conservation Act - Star Labeling Schedule for LED Luminaires",
      status: "Applicable for Energy Star Ratings"
    },
    whyAlternativeNotPrimary: "Focuses on optical and energy performance metrics (lm/W, CRI, CCT) rather than physical ingress/safety construction.",
    keywords: ["led performance", "luminous efficacy", "lumens per watt", "cct", "cri", "power factor", "thd", "lumen maintenance", "l70", "energy efficiency"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 16102 (Part 1): 2012",
    title: "Self-Ballasted LED Lamps for General Lighting Services - Part 1 Safety Requirements",
    scope: "Specifies safety and interchangeability requirements, together with test methods for self-ballasted retrofit LED lamps (B22/E27) intended for domestic and similar general indoor lighting purposes.",
    category: "LED Lighting",
    industry: "Consumer & Commercial Lighting",
    edition: "1st Edition",
    publicationYear: 2012,
    status: "Current",
    editionHistory: [
      { year: 2012, edition: "1st Edition", note: "Safety requirements for self-ballasted retrofit LED bulbs" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2019-07-22", description: "Cap temperature and mechanical strength test harmonization." }
    ],
    supersedes: "None",
    normativeReferences: ["IS 16108: 2012", "IS/IEC 60529: 2001"],
    relatedStandards: ["IS 16102 (Part 2): 2012", "IS 15885 (Part 2/Sec 13): 2012"],
    testingStandards: ["IS 16102 (Part 2): 2012"],
    safetyStandards: ["IS 16108: 2012"],
    installationStandards: ["IS 732: 2019"],
    certification: {
      isMandatory: true,
      scheme: "Compulsory Registration Scheme (CRS)",
      notifyingMinistry: "MeitY",
      orderName: "Electronics & IT Goods Compulsory Registration Order",
      status: "Mandatory under BIS CRS"
    },
    whyAlternativeNotPrimary: "Applicable to domestic/indoor retrofit LED bulbs with standard Edison/Bayonet caps, not integrated outdoor street lighting luminaires.",
    keywords: ["led bulb", "self-ballasted led", "retrofit lamp", "b22", "e27", "indoor lighting", "domestic lamp"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS/IEC 60529: 2001",
    title: "Degrees of Protection Provided by Enclosures (IP Code)",
    scope: "Applies to the classification of degrees of protection provided by enclosures for electrical equipment with a rated voltage not exceeding 72.5 kV against ingress of solid foreign objects (dust) and water.",
    category: "Testing & Enclosures",
    industry: "General Electrical & Mechanical",
    edition: "Reaffirmed 2019",
    publicationYear: 2001,
    status: "Current",
    editionHistory: [
      { year: 1962, edition: "IS 2147: 1962", note: "Original Indian Standard for degree of protection by enclosures" },
      { year: 2001, edition: "Harmonized IS/IEC 60529", note: "Adoption of international IEC 60529 standard (Reaffirmed 2019)" }
    ],
    amendments: [],
    supersedes: "IS 2147: 1962",
    normativeReferences: [],
    relatedStandards: ["IS 10322 (Part 5/Sec 3): 2012", "IS 8623 (Part 1): 1993"],
    testingStandards: ["IS/IEC 60529 Clause 11, 12, 13, 14 (Water spray and dust chamber)"],
    safetyStandards: ["IS 10322 (Part 1): 2014"],
    installationStandards: ["IS 3043: 2018"],
    certification: {
      isMandatory: false,
      scheme: "Testing Benchmark / Test Certificate",
      notifyingMinistry: "BIS / Standard Test Code",
      orderName: "General Code for Ingress Protection Testing",
      status: "Normative Reference in Product Specs"
    },
    whyAlternativeNotPrimary: "A general enclosure test standard rather than a product specification.",
    keywords: ["ip code", "ip65", "ip66", "ip67", "ip68", "waterproof", "dustproof", "ingress protection", "enclosure testing"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // CEMENT, CONCRETE & STRUCTURAL STEEL
  // ==========================================
  {
    standardNumber: "IS 269: 2015",
    title: "Ordinary Portland Cement - Specification (33 Grade, 43 Grade and 53 Grade)",
    scope: "Covers the manufacture and chemical and physical requirements of Ordinary Portland Cement of 33 grade, 43 grade, and 53 grade. Unifies previous individual specifications IS 269 (33G), IS 8112 (43G), and IS 12269 (53G) into a single comprehensive standard.",
    category: "Cement & Building Materials",
    industry: "Civil Construction & Infrastructure",
    edition: "6th Revision (Reaffirmed 2020)",
    publicationYear: 2015,
    status: "Current",
    editionHistory: [
      { year: 1989, edition: "Separate Standards", note: "IS 269 (33G), IS 8112: 1989 (43G), and IS 12269: 1987 (53G)" },
      { year: 2015, edition: "6th Revision (Unified)", note: "All grades unified under single IS 269 standard" },
      { year: 2018, edition: "Amendment 1", note: "Revised limits on insoluble residue and chloride content" },
      { year: 2021, edition: "Amendment 2", note: "Performance criteria for micro-fine mineral additions" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2018-05-10", description: "Revised limits on insoluble residue and chloride content for durability." },
      { amendmentNumber: "Amendment No. 2", date: "2021-08-20", description: "Specification of performance criteria for micro-fine additions and packaging norms." }
    ],
    supersedes: "IS 269: 1989, IS 8112: 1989, IS 12269: 1987",
    normativeReferences: ["IS 4031 (Parts 1 to 15): Methods of Physical Tests for Hydraulic Cement", "IS 4032: 1985 (Methods of Chemical Analysis)"],
    relatedStandards: ["IS 456: 2000", "IS 1489 (Part 1): 2015", "IS 383: 2016"],
    testingStandards: ["IS 4031 (Part 6): Compressive Strength", "IS 4031 (Part 4): Consistency", "IS 4031 (Part 5): Setting Times"],
    safetyStandards: ["IS 4032: 1985"],
    installationStandards: ["IS 456: 2000 (Plain and Reinforced Concrete - Code of Practice)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark (Scheme I) Mandatory Certification",
      notifyingMinistry: "Ministry of Commerce and Industry (DPIIT)",
      orderName: "Cement (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Primary specification for all structural Ordinary Portland Cement (33G, 43G, 53G).",
    keywords: ["cement", "opc", "53 grade cement", "43 grade cement", "33 grade", "ordinary portland cement", "concrete", "mortar", "compressive strength", "infrastructure construction", "bridge", "rcc"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 1489 (Part 1): 2015",
    title: "Portland Pozzolana Cement - Specification - Part 1 Fly Ash Based",
    scope: "Covers the manufacture and chemical and physical requirements of Portland Pozzolana cement using flyash pozzolana component for hydraulic structures, mass concrete, marine works, and general building construction.",
    category: "Cement & Building Materials",
    industry: "Civil Construction",
    edition: "4th Revision",
    publicationYear: 2015,
    status: "Current",
    editionHistory: [
      { year: 1991, edition: "3rd Revision", note: "Baseline pozzolana specification" },
      { year: 2015, edition: "4th Revision", note: "Permissible fly ash blending norms updated to 35%" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2019-12-05", description: "Clarification on permissible fly ash blending ratio up to 35%." }
    ],
    supersedes: "IS 1489 (Part 1): 1991",
    normativeReferences: ["IS 4031 (Parts 1 to 15)", "IS 3812 (Part 1): Pulverized Fuel Ash"],
    relatedStandards: ["IS 269: 2015", "IS 456: 2000"],
    testingStandards: ["IS 4031 (Part 6): 1988"],
    safetyStandards: ["IS 4032: 1985"],
    installationStandards: ["IS 456: 2000"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT",
      orderName: "Cement (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Applicable when Pozzolana (fly-ash blended) cement is specified for mass concrete or plastering, rather than high-strength pure OPC.",
    keywords: ["ppc cement", "portland pozzolana cement", "fly ash cement", "green concrete", "mass concrete", "plastering", "masonry"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 456: 2000",
    title: "Plain and Reinforced Concrete - Code of Practice",
    scope: "Deals with the general structural use of plain and reinforced concrete in building and civil engineering structures. Specifies mix design proportions (M20, M25, M30, M40, etc.), water-cement ratio, durability requirements, curing, and structural safety limits.",
    category: "Construction & Concrete",
    industry: "Structural Engineering",
    edition: "4th Revision (Reaffirmed 2021)",
    publicationYear: 2000,
    status: "Current",
    editionHistory: [
      { year: 1978, edition: "3rd Revision", note: "Historical standard for reinforced concrete" },
      { year: 2000, edition: "4th Revision", note: "Limit state design and modern concrete technology" },
      { year: 2019, edition: "Amendment 5", note: "Manufactured sand (M-Sand) and mineral admixtures criteria" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2001-09-01", description: "Design load considerations." },
      { amendmentNumber: "Amendment No. 2", date: "2005-08-01", description: "Durability requirements in aggressive exposure conditions." },
      { amendmentNumber: "Amendment No. 5", date: "2019-07-15", description: "Revised provisions for manufactured sand and mineral admixtures." }
    ],
    supersedes: "IS 456: 1978",
    normativeReferences: ["IS 269: 2015", "IS 383: 2016", "IS 1786: 2008", "IS 516: 1959"],
    relatedStandards: ["IS 13920: 2016 (Ductile Detailing of Reinforced Concrete Structures)"],
    testingStandards: ["IS 516: 1959 (Method of Tests for Strength of Concrete)", "IS 1199: 2018"],
    safetyStandards: ["IS 875 (Parts 1 to 5): Design Loads"],
    installationStandards: ["IS 456: 2000 Section 4 & 5"],
    certification: {
      isMandatory: false,
      scheme: "National Building Code / CPWD Mandatory Standard",
      notifyingMinistry: "Ministry of Housing and Urban Affairs",
      orderName: "Central Public Works Department Specification Baseline",
      status: "Mandatory Code of Practice"
    },
    whyAlternativeNotPrimary: "Structural design code of practice rather than individual material supply specification.",
    keywords: ["reinforced concrete", "rcc", "plain concrete", "concrete mix design", "m25", "m30", "m40", "curing", "slump test", "formwork", "structural design"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 1786: 2008",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement - Specification (TMT Steel Bars)",
    scope: "Covers the requirements of deformed steel bars and wires for use as reinforcement in concrete in sizes from 4 mm to 40 mm. Covers grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600, with stringent ductility (elongation) parameters for seismic zones.",
    category: "Steel & Construction Materials",
    industry: "Metallurgy & Infrastructure",
    edition: "4th Revision (Reaffirmed 2018)",
    publicationYear: 2008,
    status: "Current",
    editionHistory: [
      { year: 1985, edition: "3rd Revision", note: "Original deformed bars specification" },
      { year: 2008, edition: "4th Revision", note: "Introduction of Fe 500D / Fe 550D high-ductility seismic grades" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2012-03-10", description: "Introduction of Fe 600 grade and enhanced bend/rebend requirements." },
      { amendmentNumber: "Amendment No. 3", date: "2020-04-20", description: "Strict phosphorus and sulphur restrictions for enhanced corrosion resistance." }
    ],
    supersedes: "IS 1786: 1985",
    normativeReferences: ["IS 1608 (Part 1): 2018", "IS 228: Methods of Chemical Analysis of Steel"],
    relatedStandards: ["IS 456: 2000", "IS 2062: 2011"],
    testingStandards: ["IS 1608 (Part 1): 2018 (Tensile Testing)", "IS 1599: Metallic Materials - Bend Test"],
    safetyStandards: ["IS 13920: 2016 (Earthquake Resistance Detailing)"],
    installationStandards: ["IS 456: 2000 Clause 12"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark (Scheme I) Mandatory Certification",
      notifyingMinistry: "Ministry of Steel",
      orderName: "Steel and Steel Products (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Primary specification for TMT reinforcement steel bars in RCC structures.",
    keywords: ["tmt bars", "steel reinforcement", "fe 500d", "fe 550d", "rebar", "deformed steel", "concrete reinforcement", "tensile strength", "ductility", "ribbed bars"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // WATER PUMPS & PUMPING EQUIPMENT (SCENARIO 3 & AMBIGUITY HANDLING)
  // ==========================================
  {
    standardNumber: "IS 8472: 2019",
    title: "Pumps - Centrifugal Pumps for Clear, Cold Water - Specification",
    scope: "Covers the requirements for single-stage centrifugal pumps for clear, cold water for agricultural, industrial, municipal and water supply purposes. Specifies hydraulic efficiency, mechanical construction, hydrostatic pressure test, and head-capacity curves.",
    category: "Pumps & Water Equipment",
    industry: "Agriculture & Water Supply",
    edition: "3rd Revision",
    publicationYear: 2019,
    status: "Current",
    editionHistory: [
      { year: 1977, edition: "1st Edition", note: "Original clear water centrifugal pump standard" },
      { year: 1998, edition: "2nd Revision", note: "Revised minimum efficiency benchmarks" },
      { year: 2019, edition: "3rd Revision", note: "Harmonization with modern energy efficient hydraulic designs" }
    ],
    amendments: [],
    supersedes: "IS 8472: 1998",
    normativeReferences: ["IS 9694 (Parts 1 to 4): Code for Selection, Installation and Maintenance of Agricultural Pumps", "IS 11346: Code of Practice for Testing of Agricultural Pumps"],
    relatedStandards: ["IS 8034: 2018", "IS 9079: 2018"],
    testingStandards: ["IS 11346: 2002 (Testing of Agricultural and Water Supply Pumpsets)", "IS 5120: Technical Requirements for Rotodynamic Pumps"],
    safetyStandards: ["IS 9239: Centrifugal Pumps Safety Rules"],
    installationStandards: ["IS 9694 (Part 2): 1980"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark + BEE Star Labeling Mandatory Certification",
      notifyingMinistry: "Ministry of Heavy Industries & BEE",
      orderName: "Pumps (Quality Control) Order & Energy Conservation Act",
      status: "Mandatory ISI & BEE Star Rating"
    },
    whyAlternativeNotPrimary: "Primary specification for surface mounted centrifugal pumps for clear water distribution.",
    keywords: ["water pump", "centrifugal pump", "clear water pump", "surface pump", "5hp pump", "10hp pump", "irrigation pump", "flow rate", "head"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 8034: 2018",
    title: "Submersible Pumpsets - Specification",
    scope: "Covers the requirements for submersible pumpsets with water/oil lubricated motors suitable for installation in deep borewells, tube wells, and open wells for agricultural irrigation and municipal water supply.",
    category: "Pumps & Water Equipment",
    industry: "Water Supply & Borewells",
    edition: "3rd Revision",
    publicationYear: 2018,
    status: "Current",
    editionHistory: [
      { year: 1989, edition: "1st Edition", note: "Original submersible pumpset standard" },
      { year: 2002, edition: "2nd Revision", note: "Energy efficiency parameters added" },
      { year: 2018, edition: "3rd Revision", note: "Enhanced overall efficiency & stainless steel impeller provisions" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2021-03-15", description: "Harmonization with BEE 5-star efficiency curves." }
    ],
    supersedes: "IS 8034: 2002",
    normativeReferences: ["IS 9283: 2013 (Motors for Submersible Pumpsets)", "IS 11346: 2002"],
    relatedStandards: ["IS 8472: 2019", "IS 9079: 2018"],
    testingStandards: ["IS 11346: 2002 (Hydraulic performance & efficiency test)"],
    safetyStandards: ["IS 9283: 2013 (Submersible Motor Insulation)"],
    installationStandards: ["IS 9694 (Part 3): 1980 (Installation of Submersible Pumps)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark + BEE Mandatory Star Labeling",
      notifyingMinistry: "Ministry of Heavy Industries & Bureau of Energy Efficiency",
      orderName: "Submersible Pumps (Quality Control) Order",
      status: "Mandatory ISI & BEE Star Labeling"
    },
    whyAlternativeNotPrimary: "Applicable specifically when pump is intended for submerged borewell/deep well operation rather than surface clear water installation.",
    keywords: ["submersible pump", "borewell pump", "tubewell pump", "deep well pump", "underwater pump", "open well submersible", "water extraction"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 9079: 2018",
    title: "Electric Monoset Pumps for Clear, Cold Water - Specification",
    scope: "Specifies requirements for monobloc pumpsets (integral motor and pump casing on a single shaft) for agricultural, commercial and domestic clear water pumping up to 22 kW.",
    category: "Pumps & Water Equipment",
    industry: "Agriculture & Domestic Pumping",
    edition: "3rd Revision",
    publicationYear: 2018,
    status: "Current",
    editionHistory: [
      { year: 2002, edition: "2nd Revision", note: "Baseline monobloc pumpset standard" },
      { year: 2018, edition: "3rd Revision", note: "Energy efficiency schedule updated" }
    ],
    amendments: [],
    supersedes: "IS 9079: 2002",
    normativeReferences: ["IS 7538: Three-Phase Induction Motors for Agricultural Pumps"],
    relatedStandards: ["IS 8472: 2019", "IS 8034: 2018"],
    testingStandards: ["IS 11346: 2002"],
    safetyStandards: ["IS 3043: 2018 (Earthing of Pumping Motors)"],
    installationStandards: ["IS 9694 (Part 1): 1980"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark + BEE Star Labeling",
      notifyingMinistry: "DPIIT & BEE",
      orderName: "Monoset Pumps (Quality Control) Order",
      status: "Mandatory ISI & BEE Star"
    },
    whyAlternativeNotPrimary: "Applies to integrated monoset pumpsets rather than bare-shaft centrifugal or submerged borewell units.",
    keywords: ["monoset pump", "monobloc pump", "electric water pump", "domestic pump", "single phase pump", "three phase monoset"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // PERSONAL PROTECTIVE EQUIPMENT (PPE)
  // ==========================================
  {
    standardNumber: "IS 2925: 1984",
    title: "Specification for Industrial Safety Helmets",
    scope: "Covers the requirements regarding material, construction, workmanship, and finish of helmets intended for protection of workers against falling objects and other hazards in industrial environments like construction sites, mines, and refineries.",
    category: "Personal Protective Equipment",
    industry: "Occupational Health & Safety",
    edition: "2nd Revision (Reaffirmed 2021)",
    publicationYear: 1984,
    status: "Current",
    editionHistory: [
      { year: 1975, edition: "1st Edition", note: "Original safety helmets standard" },
      { year: 1984, edition: "2nd Revision", note: "Impact attenuation and crown clearance norms" },
      { year: 2016, edition: "Amendment 2", note: "Electrical insulation testing up to 2200V" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2000-03-01", description: "Shock absorption and penetration resistance test revisions." },
      { amendmentNumber: "Amendment No. 2", date: "2016-08-11", description: "Electrical insulation testing up to 2200V." }
    ],
    supersedes: "IS 2925: 1975",
    normativeReferences: ["IS 9890: 1981 (General Requirements for Non-Metallic Helmets)"],
    relatedStandards: ["IS 15298 (Part 2): 2016", "IS 3521 (Part 1): 2021"],
    testingStandards: ["IS 2925 Clauses 8.1 - 8.6 (Impact Test, Penetration Test, Flame Retardance, Electrical Resistance)"],
    safetyStandards: ["IS 8519: 1977 (Guide for Selection of Industrial Safety Equipment)"],
    installationStandards: ["DGMS / Factory Act Safety Guidelines"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT & Ministry of Labour",
      orderName: "Personal Protective Equipment (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Primary standard for industrial head protective helmets (hard hats).",
    keywords: ["safety helmet", "industrial helmet", "hard hat", "ppe", "head protection", "impact resistance", "construction safety", "chin strap", "electrical resistance"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 15298 (Part 2): 2016",
    title: "Personal Protective Equipment - Part 2 Safety Footwear (Second Revision)",
    scope: "Specifies basic and additional (optional) requirements for safety footwear used for general industrial purposes. It includes mechanical risks, slip resistance, thermal risks, ergonomic behavior, and toecap impact resistance of 200 Joules.",
    category: "Personal Protective Equipment",
    industry: "Occupational Safety & Manufacturing",
    edition: "2nd Revision (Reaffirmed 2022)",
    publicationYear: 2016,
    status: "Current",
    editionHistory: [
      { year: 2011, edition: "1st Revision", note: "Harmonization with ISO 20345" },
      { year: 2016, edition: "2nd Revision", note: "Expanded slip resistance and composite toecap criteria" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2021-02-18", description: "Addition of slip resistance on ceramic tile and glycerol surface." }
    ],
    supersedes: "IS 15298 (Part 2): 2011",
    normativeReferences: ["IS 15298 (Part 1): Test Methods for Footwear"],
    relatedStandards: ["IS 2925: 1984", "IS 3521 (Part 1): 2021"],
    testingStandards: ["IS 15298 (Part 1): 2011 (Impact 200J, Compression 15kN, Sole Penetration 1100N)"],
    safetyStandards: ["IS 8519: 1977"],
    installationStandards: ["Factory Safety Codes"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT",
      orderName: "Footwear made from Leather and other Materials (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Applicable to industrial safety footwear and boots, not head or body PPE.",
    keywords: ["safety shoes", "safety footwear", "steel toe boot", "puncture resistant sole", "anti-skid", "oil resistant shoes", "industrial footwear", "ppe"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 3521 (Part 1): 2021",
    title: "Personal Protective Equipment Against Falls from a Height - Part 1 Full Body Harness",
    scope: "Specifies the requirements, test methods, marking, information supplied by the manufacturer and packaging for full body harnesses used in fall arrest systems.",
    category: "Personal Protective Equipment",
    industry: "Construction, Telecom & High-Altitude Works",
    edition: "4th Revision",
    publicationYear: 2021,
    status: "Current",
    editionHistory: [
      { year: 1999, edition: "3rd Revision", note: "Historical standard for safety belts and harnesses" },
      { year: 2021, edition: "4th Revision", note: "Harmonized full body harness standard with 15kN static strength" }
    ],
    amendments: [],
    supersedes: "IS 3521: 1999",
    normativeReferences: ["IS/ISO 10333-1: 2000", "IS 1608 (Part 1): 2018"],
    relatedStandards: ["IS 2925: 1984", "IS 15298 (Part 2): 2016"],
    testingStandards: ["IS 3521 (Part 1) Clause 5 (Dynamic Performance Test, Static Strength 15kN)"],
    safetyStandards: ["IS 4912: Safety Requirements for Floor and Wall Openings"],
    installationStandards: ["DGMS Guidelines for Work at Heights"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT",
      orderName: "Personal Protective Equipment (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Applies to fall protection harnesses for work at heights.",
    keywords: ["safety harness", "full body harness", "safety belt", "fall arrest", "work at height", "lanyard", "carabiner", "ppe"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // ELECTRICAL CABLES, TRANSFORMERS & EARTHING
  // ==========================================
  {
    standardNumber: "IS 694: 2010",
    title: "Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables/Cords with Rigid and Flexible Conductor for Working Voltages up to and Including 1100 V",
    scope: "Covers the requirements for single-core and multi-core PVC insulated and PVC sheathed cables with copper and aluminium conductors for electric power and lighting in domestic, commercial and industrial installations up to 1.1 kV.",
    category: "Electrical Cables",
    industry: "Electrical Infrastructure & Power Distribution",
    edition: "4th Revision (Reaffirmed 2020)",
    publicationYear: 2010,
    status: "Current",
    editionHistory: [
      { year: 1990, edition: "3rd Revision", note: "Historical PVC insulated cable standard" },
      { year: 2010, edition: "4th Revision", note: "Harmonized conductor resistance and FRLS compound provisions" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2014-06-15", description: "Inclusion of FRLS (Flame Retardant Low Smoke) compound specs." },
      { amendmentNumber: "Amendment No. 2", date: "2018-11-20", description: "Harmonization of conductor resistance tables with IS 8130." }
    ],
    supersedes: "IS 694: 1990",
    normativeReferences: ["IS 8130: 2013 (Conductors for Insulated Electric Cables)", "IS 5831: 1984 (PVC Insulation and Sheath)", "IS 10810 (Parts): Methods of Test for Cables"],
    relatedStandards: ["IS 7098 (Part 1): 1988", "IS 1554 (Part 1): 1988"],
    testingStandards: ["IS 10810 (Part 43): Insulation Resistance", "IS 10810 (Part 45): High Voltage Spark Test", "IS 10810 (Part 53): Flammability Test"],
    safetyStandards: ["IS 732: 2019"],
    installationStandards: ["IS 732: 2019 (Code of Practice for Electrical Wiring Installations)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT",
      orderName: "Electrical Wires and Cables (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Primary standard for low-voltage PVC insulated wiring up to 1100V.",
    keywords: ["pvc wire", "electric wire", "frls cable", "copper cable", "1100v cable", "domestic wiring", "house wiring", "flexible cord", "multicore cable"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 7098 (Part 1): 1988",
    title: "Cross-Linked Polyethylene (XLPE) Insulated PVC Sheathed Cables - Part 1 For Working Voltages up to and Including 1100 V",
    scope: "Covers the requirements for armored and unarmored single, twin, three, three and a half, and four core XLPE insulated and PVC sheathed cables for electricity supply up to 1.1 kV.",
    category: "Electrical Cables",
    industry: "Power Utilities & Industrial Plants",
    edition: "1st Revision (Reaffirmed 2020)",
    publicationYear: 1988,
    status: "Current",
    editionHistory: [
      { year: 1988, edition: "1st Edition", note: "Original XLPE LT power cable specification" },
      { year: 2015, edition: "Amendment 2", note: "Halogen-free zero smoke (ZHFR) outer sheath additions" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 2", date: "2015-03-12", description: "Inclusion of halogen-free flame retardant (ZHFR) outer sheath options." }
    ],
    supersedes: "None",
    normativeReferences: ["IS 8130: 2013", "IS 5831: 1984", "IS 3975: Mild Steel Wires, Strips and Tapes for Armoring Cables"],
    relatedStandards: ["IS 7098 (Part 2): 2011 (for 3.3 kV to 33 kV)", "IS 694: 2010"],
    testingStandards: ["IS 10810 (Part 54): Hot Set Test for XLPE", "IS 10810 (Part 33): Conductor Resistance Test"],
    safetyStandards: ["IS 732: 2019"],
    installationStandards: ["IS 1255: 1983 (Code of Practice for Installation and Maintenance of Power Cables up to and Including 33 kV)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "DPIIT",
      orderName: "Electrical Wires and Cables (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Applicable when high-amperage thermosetting XLPE armored cable is specified over general PVC wiring.",
    keywords: ["xlpe cable", "armored cable", "underground cable", "lt power cable", "power distribution", "aluminum cable", "industrial cable"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 1180 (Part 1): 2014",
    title: "Outdoor/Indoor Type Three-Phase Distribution Transformers up to and Including 2500 kVA, 33 kV - Specification - Part 1 Mineral Oil Immersed",
    scope: "Specifies requirements for non-sealed and sealed type three-phase distribution transformers used in power supply networks. Includes standardized energy loss levels (Level 1, 2, and 3 - BEE Star compliance), impedance, temperature rise limits, and short-circuit withstand capabilities.",
    category: "Electrical Equipment",
    industry: "Power Utilities & Discoms",
    edition: "3rd Revision (Reaffirmed 2019)",
    publicationYear: 2014,
    status: "Current",
    editionHistory: [
      { year: 1989, edition: "1st Edition", note: "Original IS 1180 distribution transformers standard" },
      { year: 2014, edition: "3rd Revision", note: "Integrated BEE Star energy loss levels and mandatory short-circuit tests" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2016-02-18", description: "Mandating Level 2 energy efficiency losses across all state utilities." },
      { amendmentNumber: "Amendment No. 3", date: "2021-04-10", description: "Testing protocol for short circuit dynamic withstand test at CPRI/ERDA." }
    ],
    supersedes: "IS 1180 (Part 1): 1989, IS 1180 (Part 2): 1989",
    normativeReferences: ["IS 2026 (Parts 1 to 5): Power Transformers", "IS 335: 2018 (New Insulating Oils)"],
    relatedStandards: ["IS 3043: 2018", "IS 10028: Code of Practice for Selection, Installation and Maintenance of Transformers"],
    testingStandards: ["IS 2026 (Part 1): 2011", "IS 2026 (Part 5): Short Circuit Test"],
    safetyStandards: ["IS 2026 (Part 2): Temperature Rise Limits"],
    installationStandards: ["IS 10028 (Part 2): 1981"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark + BEE Mandatory Star Labeling",
      notifyingMinistry: "Ministry of Power & DPIIT",
      orderName: "Distribution Transformers (Quality Control) Order",
      status: "Mandatory ISI & BEE Star Labeling"
    },
    whyAlternativeNotPrimary: "Primary standard for power distribution transformers.",
    keywords: ["distribution transformer", "100 kva transformer", "250 kva", "500 kva", "11kv/415v", "oil immersed transformer", "substation", "bee star rating", "loss levels"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 3043: 2018",
    title: "Code of Practice for Earthing (First Revision)",
    scope: "Provides comprehensive guidance on design, installation, testing, and maintenance of electrical earthing systems for residential, commercial, industrial, substation, and telecom installations to ensure human safety and equipment protection against fault currents.",
    category: "Electrical Safety & Installation",
    industry: "Electrical Engineering & Utilities",
    edition: "2nd Edition",
    publicationYear: 2018,
    status: "Current",
    editionHistory: [
      { year: 1987, edition: "1st Edition", note: "Original code of practice for earthing" },
      { year: 2018, edition: "2nd Edition", note: "Modern touch/step potential calculations and maintenance free chemical earthing" }
    ],
    amendments: [],
    supersedes: "IS 3043: 1987",
    normativeReferences: ["IS 732: 2019", "IS 2309: 1989"],
    relatedStandards: ["IS 2309: 1989 (Lightning Protection)", "IS 8623: 1993"],
    testingStandards: ["IS 3043 Clause 10 (Earth Resistance Measurement, Fall of Potential Method)"],
    safetyStandards: ["Central Electricity Authority (Measures relating to Safety and Electric Supply) Regulations"],
    installationStandards: ["IS 3043: 2018 Section 3 & 4 (Pipe, Plate, Chemical, and Driven Rod Electrodes)"],
    certification: {
      isMandatory: false,
      scheme: "Mandatory Safety Standard under CEA Regulations",
      notifyingMinistry: "Central Electricity Authority (CEA)",
      orderName: "CEA Safety Regulations 2023",
      status: "Statutory Requirement under CEA Regulations"
    },
    whyAlternativeNotPrimary: "An installation and grounding practice standard required for system safety rather than a manufactured product standard.",
    keywords: ["earthing", "grounding", "earth pit", "chemical earthing", "gi strip earthing", "copper plate earthing", "earth resistance", "substation earthing", "touch and step potential"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // SOLAR PHOTOVOLTAIC & RENEWABLE ENERGY
  // ==========================================
  {
    standardNumber: "IS 14286: 2010 / IEC 61215: 2005",
    title: "Crystalline Silicon Terrestrial Photovoltaic (PV) Modules - Design Qualification and Type Approval",
    scope: "Lays down requirements for the design qualification and type approval of terrestrial crystalline silicon PV modules suitable for long-term operation in general open-air climates. Includes thermal cycling, damp heat, mechanical load test (5400 Pa), and hail impact tests.",
    category: "Solar & Renewable Energy",
    industry: "Clean Tech & Solar Infrastructure",
    edition: "1st Edition (Harmonized with IEC 61215)",
    publicationYear: 2010,
    status: "Current",
    editionHistory: [
      { year: 2010, edition: "1st Edition", note: "Harmonized terrestrial PV qualification standard" },
      { year: 2018, edition: "Amendment 1", note: "Mandatory PID resistance tests under MNRE orders" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2018-09-05", description: "Addition of PID (Potential Induced Degradation) test requirements under MNRE guidelines." }
    ],
    supersedes: "None",
    normativeReferences: ["IS/IEC 61730 (Part 1): 2004", "IS/IEC 61730 (Part 2): 2004"],
    relatedStandards: ["IS 16221 (Part 2): 2015 (Solar Inverters)", "IS 16077: 2013"],
    testingStandards: ["IS 14286 Clause 10.11 (Thermal Cycling), Clause 10.13 (Damp Heat 85C/85% RH), Clause 10.16 (Mechanical Load 5400 Pa)"],
    safetyStandards: ["IS/IEC 61730 (Part 1 & 2): 2004 (PV Module Safety Qualification)"],
    installationStandards: ["MNRE Solar Rooftop / Ground Mounted Guidelines"],
    certification: {
      isMandatory: true,
      scheme: "Compulsory Registration Scheme (CRS) / ALMM (Approved List of Models and Manufacturers)",
      notifyingMinistry: "Ministry of New and Renewable Energy (MNRE)",
      orderName: "Solar Photovoltaics, Systems, Devices and Components Goods (Requirements for Compulsory Registration) Order",
      status: "Mandatory under BIS CRS & MNRE ALMM"
    },
    whyAlternativeNotPrimary: "Primary design qualification standard for terrestrial crystalline silicon solar PV modules.",
    keywords: ["solar pv module", "solar panels", "mono perc", "polycrystalline module", "solar power plant", "500w solar panel", "bifacial solar", "rooftop solar", "mnre approved"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS/IEC 61730 (Part 1 & 2): 2004",
    title: "Photovoltaic (PV) Module Safety Qualification - Part 1 Requirements for Construction, Part 2 Requirements for Testing",
    scope: "Specifies fundamental construction and safety testing requirements for PV modules in order to provide safe electrical and mechanical operation during their intended lifetime against fire, electrical shock, and personal injury.",
    category: "Solar & Renewable Energy",
    industry: "Solar Power",
    edition: "1st Edition",
    publicationYear: 2004,
    status: "Current",
    editionHistory: [
      { year: 2004, edition: "1st Edition", note: "Safety qualification and fire risk classification for PV modules" }
    ],
    amendments: [],
    supersedes: "None",
    normativeReferences: ["IS 14286: 2010"],
    relatedStandards: ["IS 16221 (Part 2): 2015"],
    testingStandards: ["IS/IEC 61730-2 (Fire Test, Dielectric Withstand Test, Ground Continuity)"],
    safetyStandards: ["IS/IEC 61730-1"],
    installationStandards: ["IS 3043: 2018", "CEA Solar Safety Standards"],
    certification: {
      isMandatory: true,
      scheme: "Compulsory Registration Scheme (CRS)",
      notifyingMinistry: "MNRE & MeitY",
      orderName: "Solar PV Compulsory Registration Order",
      status: "Mandatory under BIS CRS"
    },
    whyAlternativeNotPrimary: "Companion safety standard to IS 14286 design qualification.",
    keywords: ["solar safety", "pv module safety", "fire test solar", "dielectric test", "solar glass", "junction box ip68"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },

  // ==========================================
  // PIPES & WATER SUPPLY INFRASTRUCTURE
  // ==========================================
  {
    standardNumber: "IS 4984: 2016",
    title: "High Density Polyethylene (HDPE) Pipes for Water Supply - Specification",
    scope: "Covers requirements for HDPE pipes from 16 mm to 1000 mm nominal diameter for use in buried water mains, potable water distribution, sewerage, and drainage systems under pressure (PN 2.5 to PN 16, PE 80 and PE 100 material).",
    category: "Pipes & Water Supply",
    industry: "Municipal & Public Health Engineering (JJM)",
    edition: "5th Revision",
    publicationYear: 2016,
    status: "Current",
    editionHistory: [
      { year: 1995, edition: "4th Revision", note: "Historical standard for PE-63 and PE-80 pipes" },
      { year: 2016, edition: "5th Revision", note: "Mandates high density PE-100 material with 100-hour hydrostatic test" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2019-03-25", description: "Tightened hydrostatic strength testing at 80°C for 165 hours." }
    ],
    supersedes: "IS 4984: 1995",
    normativeReferences: ["IS 7328: High Density Polyethylene Materials for Moulding and Extrusion", "IS 2530: Methods of Test for Polyethylene"],
    relatedStandards: ["IS 4985: 2021 (uPVC Pipes)", "IS 8329: 2000 (Ductile Iron Pipes)"],
    testingStandards: ["IS 4984 Clause 8 (Hydraulic Internal Pressure Test, Melt Flow Rate, Carbon Black Content, Oxidation Induction Time)"],
    safetyStandards: ["IS 10141: Positive List of Constituents in Contact with Foodstuffs, Pharmaceuticals and Drinking Water"],
    installationStandards: ["IS 7634 (Part 2): 2012 (Code of Practice for Laying and Jointing of Polyethylene Pipes)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "Ministry of Chemicals and Fertilizers / DPIIT",
      orderName: "Pipes and Fittings (Quality Control) Order",
      status: "Mandatory ISI Certification (Jal Jeevan Mission Standard)"
    },
    whyAlternativeNotPrimary: "Primary standard for HDPE pressurized drinking water supply pipelines.",
    keywords: ["hdpe pipe", "pe100 pipe", "water supply pipe", "potable water", "drinking water pipe", "jal jeevan mission", "butt fusion", "pn10 hdpe", "pn16 pipe"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  },
  {
    standardNumber: "IS 8329: 2000",
    title: "Centrifugally Cast (Ductile) Iron Pressure Pipes for Water, Gas and Sewage - Specification",
    scope: "Covers the requirements for ductile iron pipes with socket and spigot ends or flanged ends in sizes DN 80 mm to DN 2000 mm for carrying water, sewage and gas under pressure. Includes requirements for internal cement mortar lining and external zinc/bitumen coating.",
    category: "Pipes & Water Supply",
    industry: "Public Health Engineering & Water Infrastructure",
    edition: "3rd Revision (Reaffirmed 2020)",
    publicationYear: 2000,
    status: "Current",
    editionHistory: [
      { year: 1994, edition: "2nd Revision", note: "Original DI pressure pipes specification" },
      { year: 2000, edition: "3rd Revision", note: "Cement mortar lining and external zinc coating requirements" }
    ],
    amendments: [
      { amendmentNumber: "Amendment No. 1", date: "2007-06-01", description: "Inclusion of class C pipes specification alongside class K7 and K9." },
      { amendmentNumber: "Amendment No. 3", date: "2018-05-15", description: "Zinc-aluminium coating provisions for enhanced corrosion resistance." }
    ],
    supersedes: "IS 8329: 1994",
    normativeReferences: ["IS 1500: Method for Brinell Hardness Test", "IS 1608 (Part 1): 2018"],
    relatedStandards: ["IS 9523: Ductile Iron Fittings", "IS 14846: Sluice Valves"],
    testingStandards: ["IS 8329 Clause 10 (Hydrostatic Works Test up to 50 bar), Clause 11 (Tensile Test, Min 420 MPa), Clause 12 (Brinell Hardness)"],
    safetyStandards: ["IS 5382: Rubber Sealing Rings for Gas Mains, Water Mains and Sewers"],
    installationStandards: ["IS 12288: 1987 (Code of Practice for Use and Laying of Ductile Iron Pipes)"],
    certification: {
      isMandatory: true,
      scheme: "BIS ISI Mark Mandatory Certification",
      notifyingMinistry: "Ministry of Steel & DPIIT",
      orderName: "Ductile Iron Pipes (Quality Control) Order",
      status: "Mandatory ISI Certification"
    },
    whyAlternativeNotPrimary: "Applicable when high-durability metallic ductile iron (K7/K9) pipes are required for bulk water transmission over HDPE.",
    keywords: ["di pipe", "ductile iron pipe", "k9 pipe", "k7 pipe", "water transmission", "bulk water pipeline", "socket and spigot", "cement mortar lining"],
    source: "Bureau of Indian Standards (BIS)",
    lastVerified: "2026-06-15"
  }
];
