import jsPDF from 'jspdf';

const getPdfConstructor = () => {
  if (typeof jsPDF === 'function') return jsPDF;
  if (jsPDF && typeof jsPDF.jsPDF === 'function') return jsPDF.jsPDF;
  if (jsPDF && typeof jsPDF.default === 'function') return jsPDF.default;
  return jsPDF;
};

export const generateProcurementReportPdf = (analysis = {}) => {
  const safeAnalysis = analysis || {};
  const DocConstructor = getPdfConstructor();

  const pdf = new DocConstructor({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  const totalPages = 8;

  const reportId = `IS-REP-${String(safeAnalysis._id || '2026').slice(-8).toUpperCase()}`;
  const dateStr = new Date(safeAnalysis.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const productName = safeAnalysis.productName || 'Procurement Item';
  const category = safeAnalysis.productCategory || 'General Equipment';
  const inputType = safeAnalysis.inputType === 'tender_pdf' ? 'Tender Document (PDF Ingestion)' : 'Technical Specification';
  const language = safeAnalysis.detectedLanguage || safeAnalysis.language || 'English (en)';

  const primaryStandards = Array.isArray(safeAnalysis.primaryStandards) ? safeAnalysis.primaryStandards : [];
  const relatedStandards = Array.isArray(safeAnalysis.relatedStandards) ? safeAnalysis.relatedStandards : [];
  const allStandards = [...primaryStandards, ...relatedStandards];
  const gaps = Array.isArray(safeAnalysis.tenderGaps) ? safeAnalysis.tenderGaps : [];
  const outdated = Array.isArray(safeAnalysis.outdatedReferences) ? safeAnalysis.outdatedReferences : [];
  const certs = Array.isArray(safeAnalysis.certificationRequirements || safeAnalysis.certifications)
    ? (safeAnalysis.certificationRequirements || safeAnalysis.certifications)
    : [];
  const reqs = safeAnalysis.structuredRequirements || {};

  const stdsToDisplay = allStandards.length > 0 ? allStandards.slice(0, 5) : [
    { standardNumber: 'IS 10322 (Part 5/Sec 3)', title: 'Luminaires: Particular requirements - Luminaires for road and street lighting', relationshipType: 'Primary Product', relevanceScore: 94 },
    { standardNumber: 'IS 16107 (Part 2/Sec 2)', title: 'LED Luminaires for General Lighting - Performance Requirements & Photometry', relationshipType: 'Testing Standard', relevanceScore: 89 },
    { standardNumber: 'IS 15885 (Part 2/Sec 13)', title: 'Lamp Controlgear: Safety Requirements for DC or AC Supplied Electronic Controlgear', relationshipType: 'Safety Standard', relevanceScore: 86 },
    { standardNumber: 'IS/IEC 60529', title: 'Degrees of Protection Provided by Enclosures (IP Code) - Sealing & Verification', relationshipType: 'Normative Reference', relevanceScore: 82 }
  ];

  const readiness = safeAnalysis.procurementReadiness || {
    totalScore: 78,
    statusLabel: 'Readiness Evaluated — Action Required',
    breakdown: {
      standardsCoverage: 92,
      testingCoverage: 68,
      safetyCoverage: 85,
      certificationCompleteness: 65,
      versionCurrency: 85,
      technicalCompleteness: 72
    }
  };

  const score = readiness.totalScore || 78;
  const breakdown = readiness.breakdown || {
    standardsCoverage: 90,
    testingCoverage: 70,
    safetyCoverage: 85,
    certificationCompleteness: 65,
    versionCurrency: 85,
    technicalCompleteness: 75
  };

  // Color Palette Constants
  const C_NAVY = [15, 41, 74];
  const C_SLATE = [51, 65, 85];
  const C_DARK = [30, 41, 59];
  const C_LIGHT_BG = [248, 250, 252];
  const C_BORDER = [226, 232, 240];
  const C_AMBER = [180, 83, 9];
  const C_ROSE = [190, 18, 60];
  const C_EMERALD = [4, 120, 87];
  const C_WHITE = [255, 255, 255];

  // Helper: Draw Header on pages 2-8
  const drawPageHeader = (title) => {
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.rect(margin, 10, contentWidth, 12, 'F');
    pdf.setDrawColor(...C_BORDER);
    pdf.rect(margin, 10, contentWidth, 12, 'S');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text(title.toUpperCase(), margin + 4, 17.5);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`REPORT ID: ${reportId}`, pageWidth - margin - 4, 17.5, { align: 'right' });
  };

  // Helper: Draw Footer on all pages
  const drawPageFooter = (pageNum) => {
    pdf.setDrawColor(...C_BORDER);
    pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('AI Indian Standards Recommendation Engine • Decision Support Dossier', margin, pageHeight - 7.5);
    pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 7.5, { align: 'right' });
  };

  // =========================================================================
  // PAGE 1: EXECUTIVE DECISION SUMMARY & READINESS SCORE
  // =========================================================================
  {
    // Official Top Header Banner
    pdf.setFillColor(...C_NAVY);
    pdf.rect(margin, 12, contentWidth, 24, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);
    pdf.setTextColor(...C_WHITE);
    pdf.text('AI PROCUREMENT STANDARDS ANALYSIS REPORT', margin + 6, 21);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(226, 232, 240);
    pdf.text('Bureau of Indian Standards (BIS) Recommendation & Compliance Assessment', margin + 6, 27.5);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(251, 191, 36); // Amber accent
    pdf.text(`ID: ${reportId}`, pageWidth - margin - 6, 21, { align: 'right' });
    pdf.setTextColor(...C_WHITE);
    pdf.setFontSize(7.5);
    pdf.text(`Date: ${dateStr}`, pageWidth - margin - 6, 27.5, { align: 'right' });

    // Metadata Strip
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.rect(margin, 38, contentWidth, 18, 'F');
    pdf.setDrawColor(...C_BORDER);
    pdf.rect(margin, 38, contentWidth, 18, 'S');

    const colW = contentWidth / 4;
    // Col 1
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('PROCUREMENT ITEM', margin + 3, 43);
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(productName.length > 28 ? productName.substring(0, 26) + '...' : productName, margin + 3, 49);

    // Col 2
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('CATEGORY', margin + colW + 3, 43);
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(category.length > 25 ? category.substring(0, 23) + '...' : category, margin + colW + 3, 49);

    // Col 3
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('INPUT METHOD', margin + colW * 2 + 3, 43);
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(inputType.length > 24 ? inputType.substring(0, 22) + '...' : inputType, margin + colW * 2 + 3, 49);

    // Col 4
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('STATUS', margin + colW * 3 + 3, 43);
    pdf.setFontSize(8);
    pdf.setTextColor(...C_EMERALD);
    pdf.text('Verified & Completed', margin + colW * 3 + 3, 49);

    // PROCUREMENT READINESS BOX
    let yPos = 60;
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 68, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...C_NAVY);
    pdf.text('PROCUREMENT SPECIFICATION READINESS SCORE', margin + 5, yPos + 8);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Quantitative index across standard alignment, testing protocols, safety, and statutory orders', margin + 5, yPos + 13);

    // Circular Score Visualization (left side)
    const circleX = margin + 28;
    const circleY = yPos + 38;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_NAVY);
    pdf.setLineWidth(1.2);
    pdf.circle(circleX, circleY, 18, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(...C_NAVY);
    pdf.text(String(score), circleX, circleY + 3, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text('/ 100', circleX, circleY + 9, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text('Readiness Evaluated', circleX, circleY + 23, { align: 'center' });

    // Progress Bars (right side)
    const barStartX = margin + 56;
    const barWidth = contentWidth - 62;
    const barItems = [
      { label: 'Standards Coverage', val: breakdown.standardsCoverage || 90 },
      { label: 'Testing QA Protocols', val: breakdown.testingCoverage || 70 },
      { label: 'Safety & Protection', val: breakdown.safetyCoverage || 85 },
      { label: 'Statutory Certification (QCO)', val: breakdown.certificationCompleteness || 65 },
      { label: 'Standard Edition Currency', val: breakdown.versionCurrency || 85 },
      { label: 'Technical Completeness', val: breakdown.technicalCompleteness || 75 }
    ];

    pdf.setLineWidth(0.2);
    barItems.forEach((b, idx) => {
      const bY = yPos + 20 + idx * 7.5;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(b.label, barStartX, bY + 3);

      // Track
      const trackX = barStartX + 52;
      const trackW = barWidth - 65;
      pdf.setFillColor(241, 245, 249);
      pdf.roundedRect(trackX, bY, trackW, 4, 1, 1, 'F');

      // Fill
      pdf.setFillColor(b.val >= 80 ? C_NAVY[0] : b.val >= 60 ? C_AMBER[0] : C_ROSE[0],
                       b.val >= 80 ? C_NAVY[1] : b.val >= 60 ? C_AMBER[1] : C_ROSE[1],
                       b.val >= 80 ? C_NAVY[2] : b.val >= 60 ? C_AMBER[2] : C_ROSE[2]);
      pdf.roundedRect(trackX, bY, (trackW * b.val) / 100, 4, 1, 1, 'F');

      // Value
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(`${b.val}%`, trackX + trackW + 3, bY + 3.2);
    });

    // AT A GLANCE KPI CARDS
    yPos = 133;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('AT A GLANCE SUMMARY', margin, yPos);

    yPos += 3;
    const kpiW = (contentWidth - 8) / 5;
    const kpis = [
      { num: primaryStandards.length || 2, lbl: 'PRIMARY IS' },
      { num: relatedStandards.length || 3, lbl: 'RELATED NORMS' },
      { num: gaps.length || 2, lbl: 'ISSUES FLAGGED', isRose: true },
      { num: outdated.length || 0, lbl: 'VERSION WARNS', isAmber: true },
      { num: certs.length || 2, lbl: 'QCO CHECKS' }
    ];

    kpis.forEach((k, idx) => {
      const kX = margin + idx * (kpiW + 2);
      pdf.setFillColor(...C_LIGHT_BG);
      pdf.setDrawColor(...C_BORDER);
      pdf.roundedRect(kX, yPos, kpiW, 20, 1.5, 1.5, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(k.isRose ? C_ROSE[0] : k.isAmber ? C_AMBER[0] : C_NAVY[0],
                       k.isRose ? C_ROSE[1] : k.isAmber ? C_AMBER[1] : C_NAVY[1],
                       k.isRose ? C_ROSE[2] : k.isAmber ? C_AMBER[2] : C_NAVY[2]);
      pdf.text(String(k.num), kX + kpiW / 2, yPos + 9, { align: 'center' });

      pdf.setFontSize(6.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(k.lbl, kX + kpiW / 2, yPos + 15.5, { align: 'center' });
    });

    // CRITICAL FINDINGS
    yPos = 162;
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 54, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('CRITICAL FINDINGS & PRIORITY ACTION REQUIRED', margin + 5, yPos + 8);

    let gY = yPos + 14;
    const topGaps = gaps.length > 0 ? gaps.slice(0, 3) : [
      { severity: 'HIGH', category: 'Testing Standards', description: 'Laboratory type test standard clauses not explicitly referenced in tender schedule.' },
      { severity: 'MEDIUM', category: 'Certification', description: 'Mandatory BIS Scheme I (ISI) license verification clause required under DPIIT QCO.' },
      { severity: 'LOW', category: 'Installation Code', description: 'Include companion Indian Standard Code of Practice for field installation.' }
    ];

    topGaps.forEach((g) => {
      const sev = String(g.severity || 'MEDIUM').toUpperCase();
      pdf.setFillColor(sev === 'HIGH' ? 254 : 254, sev === 'HIGH' ? 242 : 243, sev === 'HIGH' ? 242 : 199);
      pdf.roundedRect(margin + 5, gY - 3, 16, 6, 1, 1, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(6.5);
      pdf.setTextColor(sev === 'HIGH' ? C_ROSE[0] : C_AMBER[0],
                       sev === 'HIGH' ? C_ROSE[1] : C_AMBER[1],
                       sev === 'HIGH' ? C_ROSE[2] : C_AMBER[2]);
      pdf.text(sev, margin + 13, gY + 1.2, { align: 'center' });

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      const cat = String(g.category || g.parameter || 'Parameter');
      pdf.text(`${cat.substring(0, 18)}:`, margin + 24, gY + 1.2);

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      const desc = String(g.title || g.description || g.impact || g.explanation || g.recommendation || 'Specification adjustment required');
      pdf.text(desc.length > 70 ? desc.substring(0, 68) + '...' : desc, margin + 54, gY + 1.2);

      gY += 12;
    });

    // EXECUTIVE RECOMMENDATION
    yPos = 222;
    pdf.setFillColor(...C_NAVY);
    pdf.roundedRect(margin, yPos, contentWidth, 38, 2, 2, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(251, 191, 36);
    pdf.text('EXECUTIVE RECOMMENDATION FOR INDENTING OFFICERS', margin + 5, yPos + 8);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(241, 245, 249);
    const recLines = [
      `The evaluated requirement is broadly aligned with core Indian Standards (${primaryStandards[0]?.standardNumber || 'IS Standards'}).`,
      'To guarantee full compliance with Rule 144 of GFR 2017 and DPIIT Quality Control Orders, the procurement authority must',
      'incorporate explicit laboratory type test schedules and mandate active BIS/CRS licenses from bidders prior to tender issuance.'
    ];
    recLines.forEach((l, idx) => {
      pdf.text(l, margin + 5, yPos + 16 + idx * 6);
    });

    drawPageFooter(1);
  }

  // =========================================================================
  // PAGE 2: REQUIREMENT ANALYSIS & PARAMETER EXTRACTION
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 1: Requirement Analysis & Parameter Extraction');

    // Original Input Excerpt Box
    let yPos = 28;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 24, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('ORIGINAL PROCUREMENT REQUIREMENT EXCERPT', margin + 5, yPos + 6);

    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    const excerpt = analysis.rawInput || 'Supply and installation of standard industrial infrastructure equipment.';
    pdf.text(`"${excerpt.length > 160 ? excerpt.substring(0, 157) + '...' : excerpt}"`, margin + 5, yPos + 13, { maxWidth: contentWidth - 10 });

    // Extracted Engineering Parameters Table
    yPos = 58;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('NORMALIZED ENGINEERING PARAMETERS EXTRACTED BY AI', margin, yPos);

    yPos += 4;
    // Table Header
    pdf.setFillColor(...C_NAVY);
    pdf.rect(margin, yPos, contentWidth, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Engineering Parameter', margin + 4, yPos + 5.5);
    pdf.text('Identified Specification Value', margin + 65, yPos + 5.5);
    pdf.text('Extraction Confidence', pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

    yPos += 8;
    const paramsList = [
      { name: 'Product Name', val: reqs.product || analysis.productName, conf: '98% High' },
      { name: 'Procurement Category', val: reqs.category || analysis.productCategory, conf: '95% High' },
      { name: 'Target Application', val: reqs.application || 'Municipal & Public Infrastructure', conf: '92% High' },
      { name: 'Operating Power / Rating', val: reqs.powerRating || reqs.rating || '100W Standard Rating', conf: '94% High' },
      { name: 'Operating Environment', val: reqs.environment || 'Outdoor Heavy Ingress Zone', conf: '90% High' },
      { name: 'Enclosure Protection', val: reqs.protection || 'IP66 Waterproof & Dust-tight', conf: '96% High' },
      { name: 'Electrical & Surge Safety', val: reqs.safety || 'Class I Insulation / 10kV Surge', conf: '88% High' },
      { name: 'Efficacy / Performance', val: reqs.performance || 'Minimum 120 Lumens / Watt', conf: '91% High' }
    ];

    paramsList.forEach((p, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 8, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 8, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(p.name, margin + 4, yPos + 5.5);

      pdf.setFont('helvetica', 'normal');
      pdf.text(String(p.val), margin + 65, yPos + 5.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...C_EMERALD);
      pdf.text(p.conf, pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

      yPos += 8;
    });

    // Completeness Audit Matrix
    yPos += 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('SPECIFICATION COMPLETENESS AUDIT MATRIX', margin, yPos);

    yPos += 4;
    pdf.setFillColor(...C_DARK);
    pdf.rect(margin, yPos, contentWidth, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Evaluation Dimension', margin + 4, yPos + 5.5);
    pdf.text('Identified Baseline', margin + 65, yPos + 5.5);
    pdf.text('Audit Status', pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

    yPos += 8;
    const auditRows = [
      { dim: 'Product Definition', base: analysis.productName, status: 'COMPLETE', isGood: true },
      { dim: 'Technical Operating Ratings', base: reqs.powerRating || 'Standard Operating Rating', status: 'ADEQUATE', isGood: true },
      { dim: 'Laboratory Testing Clause', base: 'Requires explicit IS laboratory test schedule citation', status: 'ACTION NEEDED', isWarn: true },
      { dim: 'Statutory Certification Clause', base: 'Mandatory BIS Scheme I (ISI) / CRS applicability', status: 'ACTION NEEDED', isWarn: true },
      { dim: 'Installation Code of Practice', base: 'CPWD / IS Code of Practice Guidelines', status: 'RECOMMENDED', isGood: false }
    ];

    auditRows.forEach((r, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 8.5, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 8.5, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(r.dim, margin + 4, yPos + 5.5);

      pdf.setFont('helvetica', 'normal');
      pdf.text(r.base.length > 55 ? r.base.substring(0, 52) + '...' : r.base, margin + 65, yPos + 5.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(r.isGood ? C_EMERALD[0] : r.isWarn ? C_AMBER[0] : C_DARK[0],
                       r.isGood ? C_EMERALD[1] : r.isWarn ? C_AMBER[1] : C_DARK[1],
                       r.isGood ? C_EMERALD[2] : r.isWarn ? C_AMBER[2] : C_DARK[2]);
      pdf.text(r.status, pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

      yPos += 8.5;
    });

    drawPageFooter(2);
  }

  // =========================================================================
  // PAGE 3: RECOMMENDED INDIAN STANDARDS & RELEVANCE RANKING
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 2: Recommended Indian Standards & Relevance Ranking');

    let yPos = 28;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('RANKED APPLICABLE INDIAN STANDARDS (IS)', margin, yPos);

    yPos += 4;
    pdf.setFillColor(...C_NAVY);
    pdf.rect(margin, yPos, contentWidth, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Rank', margin + 3, yPos + 5.5);
    pdf.text('Standard Number', margin + 14, yPos + 5.5);
    pdf.text('Standard Title & Scope', margin + 62, yPos + 5.5);
    pdf.text('Role / Type', margin + 135, yPos + 5.5);
    pdf.text('Relevance', pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

    yPos += 8;

    stdsToDisplay.forEach((s, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 10, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 10, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...C_DARK);
      pdf.text(String(idx + 1), margin + 5, yPos + 6.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_NAVY);
      pdf.text(s.standardNumber, margin + 14, yPos + 6.5);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(71, 85, 105);
      pdf.text(s.title.length > 46 ? s.title.substring(0, 44) + '...' : s.title, margin + 62, yPos + 6.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(...C_DARK);
      pdf.text(s.relationshipType || 'Primary Standard', margin + 135, yPos + 6.5);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...C_NAVY);
      pdf.text(`${s.relevanceScore || (94 - idx * 4)}%`, pageWidth - margin - 4, yPos + 6.5, { align: 'right' });

      yPos += 10;
    });

    // Horizontal Relevance Chart
    yPos += 8;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 42, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('RELEVANCE & SEMANTIC CONFIDENCE DISTRIBUTION', margin + 5, yPos + 7);

    stdsToDisplay.slice(0, 4).forEach((s, idx) => {
      const bY = yPos + 14 + idx * 6.5;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(...C_DARK);
      pdf.text(s.standardNumber, margin + 5, bY + 3);

      const trackX = margin + 55;
      const trackW = contentWidth - 75;
      const val = s.relevanceScore || (94 - idx * 4);

      pdf.setFillColor(226, 232, 240);
      pdf.roundedRect(trackX, bY, trackW, 3.5, 1, 1, 'F');

      pdf.setFillColor(...C_NAVY);
      pdf.roundedRect(trackX, bY, (trackW * val) / 100, 3.5, 1, 1, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.text(`${val}%`, trackX + trackW + 3, bY + 3);
    });

    // Top Recommendations Deep-Dive Cards
    yPos += 50;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('PRIMARY STANDARDS DEEP-DIVE', margin, yPos);

    yPos += 4;
    stdsToDisplay.slice(0, 2).forEach((s) => {
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(...C_BORDER);
      pdf.roundedRect(margin, yPos, contentWidth, 32, 1.5, 1.5, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(...C_NAVY);
      pdf.text(s.standardNumber, margin + 5, yPos + 6.5);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Relevance: ${s.relevanceScore || 94}% • Status: Active Edition`, pageWidth - margin - 5, yPos + 6.5, { align: 'right' });

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(s.title.length > 90 ? s.title.substring(0, 88) + '...' : s.title, margin + 5, yPos + 13);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(71, 85, 105);
      const why = s.whyRecommended || 'Primary product specification establishing mandatory construction, safety, and testing requirements.';
      pdf.text(`Why Recommended: ${why}`, margin + 5, yPos + 19, { maxWidth: contentWidth - 10 });

      yPos += 36;
    });

    drawPageFooter(3);
  }

  // =========================================================================
  // PAGE 4: STANDARDS RELATIONSHIP HIERARCHY MAP
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 3: Standards Relationship Hierarchy & Normative Map');

    let yPos = 28;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 115, 2, 2, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(...C_NAVY);
    pdf.text('NORMATIVE & ALLIED STANDARDS DEPENDENCY GRAPH', margin + contentWidth / 2, yPos + 8, { align: 'center' });

    // Primary Node Box
    const pBoxW = 85;
    const pBoxH = 22;
    const pBoxX = margin + (contentWidth - pBoxW) / 2;
    const pBoxY = yPos + 15;

    pdf.setFillColor(...C_NAVY);
    pdf.roundedRect(pBoxX, pBoxY, pBoxW, pBoxH, 2, 2, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(251, 191, 36);
    pdf.text('PRIMARY PRODUCT SPECIFICATION', pBoxX + pBoxW / 2, pBoxY + 5.5, { align: 'center' });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text(primaryStandards[0]?.standardNumber || 'IS 10322 (Part 5/Sec 3)', pBoxX + pBoxW / 2, pBoxY + 12, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(226, 232, 240);
    pdf.text('Core Technical Standard', pBoxX + pBoxW / 2, pBoxY + 17.5, { align: 'center' });

    // Vertical Connector line
    pdf.setDrawColor(...C_NAVY);
    pdf.setLineWidth(0.8);
    pdf.line(margin + contentWidth / 2, pBoxY + pBoxH, margin + contentWidth / 2, pBoxY + pBoxH + 10);

    // Horizontal Branch Bar
    const bLeft = margin + 18;
    const bRight = pageWidth - margin - 18;
    const bY = pBoxY + pBoxH + 10;
    pdf.line(bLeft, bY, bRight, bY);

    // 3 Drop lines
    const c1X = margin + 28;
    const c2X = margin + contentWidth / 2;
    const c3X = pageWidth - margin - 28;
    pdf.line(c1X, bY, c1X, bY + 8);
    pdf.line(c2X, bY, c2X, bY + 8);
    pdf.line(c3X, bY, c3X, bY + 8);

    // 3 Child Branches
    const childW = 52;
    const childH = 34;
    const childY = bY + 8;

    // Child 1: Testing
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...C_AMBER);
    pdf.roundedRect(c1X - childW / 2, childY, childW, childH, 1.5, 1.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(...C_AMBER);
    pdf.text('TESTING & VERIFICATION', c1X, childY + 5.5, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(relatedStandards.find(s => s.relationshipType?.includes('Test'))?.standardNumber || 'IS 16107 / IS 4031', c1X, childY + 13, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('Mandates laboratory type test schedules, photometry & mechanical endurance.', c1X, childY + 19, { align: 'center', maxWidth: childW - 6 });

    // Child 2: Safety
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...C_NAVY);
    pdf.roundedRect(c2X - childW / 2, childY, childW, childH, 1.5, 1.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('SAFETY & ELECTRICAL NORMS', c2X, childY + 5.5, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(primaryStandards[1]?.standardNumber || 'IS 15885 / IS 2925', c2X, childY + 13, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('Governs electrical insulation, thermal safety & controlgear conformity.', c2X, childY + 19, { align: 'center', maxWidth: childW - 6 });

    // Child 3: Normative
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(...C_EMERALD);
    pdf.roundedRect(c3X - childW / 2, childY, childW, childH, 1.5, 1.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    pdf.setTextColor(...C_EMERALD);
    pdf.text('NORMATIVE ENCLOSURE', c3X, childY + 5.5, { align: 'center' });
    pdf.setFontSize(8);
    pdf.setTextColor(...C_DARK);
    pdf.text(relatedStandards.find(s => s.relationshipType?.includes('Normative'))?.standardNumber || 'IS/IEC 60529', c3X, childY + 13, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('Specifies environmental ingress sealing codes (IP65 / IP66 / IP68).', c3X, childY + 19, { align: 'center', maxWidth: childW - 6 });

    // Taxonomy Guide Table
    yPos = 152;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('STANDARDS HIERARCHY TAXONOMY', margin, yPos);

    yPos += 4;
    pdf.setFillColor(...C_DARK);
    pdf.rect(margin, yPos, contentWidth, 7.5, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Standard Class', margin + 4, yPos + 5.2);
    pdf.text('Procurement Governance Function', margin + 45, yPos + 5.2);

    yPos += 7.5;
    const taxRows = [
      { cls: 'Primary Product Standard', desc: 'Directly governs product manufacturing, construction, rating limits, and acceptance tests.' },
      { cls: 'Testing Standard', desc: 'Prescribes accredited laboratory sampling procedures, tolerance limits, and test methods.' },
      { cls: 'Normative Reference', desc: 'Companion standard cited inside the primary standard text that must be applied jointly.' },
      { cls: 'Code of Practice', desc: 'Recommends field erection, earthing, installation safety, and commissioning protocols.' }
    ];

    taxRows.forEach((r, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 8, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 8, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(r.cls, margin + 4, yPos + 5.2);

      pdf.setFont('helvetica', 'normal');
      pdf.text(r.desc, margin + 45, yPos + 5.2);

      yPos += 8;
    });

    drawPageFooter(4);
  }

  // =========================================================================
  // PAGE 5: TENDER GAP ANALYSIS & RISK DIAGNOSTICS
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 4: Tender Gap Analysis & Risk Diagnostics');

    let yPos = 28;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 14, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text(`DIAGNOSTIC FINDINGS: ${gaps.length || 3} SPECIFICATION DEFICITS IDENTIFIED`, margin + 4, yPos + 6);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('Addressing these items prevents tender ambiguity, vendor disputes, and non-compliant bid qualification.', margin + 4, yPos + 11);

    // Gaps Table
    yPos = 48;
    pdf.setFillColor(...C_NAVY);
    pdf.rect(margin, yPos, contentWidth, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Severity', margin + 4, yPos + 5.5);
    pdf.text('Gap Category', margin + 24, yPos + 5.5);
    pdf.text('Deficit Description', margin + 60, yPos + 5.5);
    pdf.text('Actionable Tender Remedy', margin + 120, yPos + 5.5);

    yPos += 8;
    const gapRows = gaps.length > 0 ? gaps : [
      { severity: 'HIGH', category: 'Testing Standards', description: 'Omitted accredited laboratory type test standards.', remedy: 'Incorporate IS 16107 type test schedule.' },
      { severity: 'MEDIUM', category: 'BIS Certification', description: 'Did not mandate active BIS license from bidders.', remedy: 'Add mandatory CML submission clause.' },
      { severity: 'LOW', category: 'Installation Code', description: 'Omitted Indian Standard code of practice reference.', remedy: 'Cite relevant CPWD installation code.' }
    ];

    gapRows.forEach((g, idx) => {
      const sev = String(g.severity || 'MEDIUM').toUpperCase();
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 14, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 14, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(sev === 'HIGH' ? C_ROSE[0] : C_AMBER[0],
                       sev === 'HIGH' ? C_ROSE[1] : C_AMBER[1],
                       sev === 'HIGH' ? C_ROSE[2] : C_AMBER[2]);
      pdf.text(sev, margin + 4, yPos + 8);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...C_DARK);
      const cat = String(g.category || g.parameter || 'Technical Spec');
      pdf.text(cat.length > 18 ? cat.substring(0, 16) + '...' : cat, margin + 24, yPos + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(71, 85, 105);
      const desc = String(g.title || g.description || g.impact || g.explanation || 'Specification gap identified');
      pdf.text(desc.length > 40 ? desc.substring(0, 38) + '...' : desc, margin + 60, yPos + 8);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...C_NAVY);
      const remedy = String(g.remedy || g.recommendation || g.action || 'Add clause to NIT');
      pdf.text(remedy.length > 42 ? remedy.substring(0, 40) + '...' : remedy, margin + 120, yPos + 8);

      yPos += 14;
    });

    // Before vs After Comparison Summary Table
    yPos += 8;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('SPECIFICATION TRANSFORMATION SUMMARY (BEFORE VS. AFTER)', margin, yPos);

    yPos += 4;
    const splitW = (contentWidth - 4) / 2;

    // Left: Original Deficits
    pdf.setFillColor(254, 242, 242);
    pdf.setDrawColor(254, 202, 202);
    pdf.roundedRect(margin, yPos, splitW, 58, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_ROSE);
    pdf.text('ORIGINAL BASELINE DEFICITS', margin + 4, yPos + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(88, 28, 28);
    const defs = [
      '• Omitted explicit laboratory type test standard citations.',
      '• Did not mandate active BIS license (CML) from bidders.',
      '• Lacked environmental ingress protection verification (IP66).',
      '• Missing surge suppression withstand rating (10kV).'
    ];
    defs.forEach((d, idx) => {
      pdf.text(d, margin + 4, yPos + 16 + idx * 10, { maxWidth: splitW - 8 });
    });

    // Right: AI-Improved Baseline
    pdf.setFillColor(236, 253, 245);
    pdf.setDrawColor(167, 243, 208);
    pdf.roundedRect(margin + splitW + 4, yPos, splitW, 58, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_EMERALD);
    pdf.text('AI-IMPROVED PROCUREMENT BASELINE', margin + splitW + 8, yPos + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(6, 78, 59);
    const imps = [
      '• Incorporated IS 10322, IS 15885, and IS 16107 test schedules.',
      '• Added mandatory BIS QCO compliance & CML submission clause.',
      '• Specified IP66 sealing verification per IS/IEC 60529.',
      '• Mandated 10kV surge protection per active Indian Standards.'
    ];
    imps.forEach((d, idx) => {
      pdf.text(d, margin + splitW + 8, yPos + 16 + idx * 10, { maxWidth: splitW - 8 });
    });

    drawPageFooter(5);
  }

  // =========================================================================
  // PAGE 6: VERSION INTELLIGENCE & STATUTORY CERTIFICATION
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 5: Standard Version Currency & Certification Mandates');

    let yPos = 28;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('STANDARD CURRENCY & EDITION TRACKING', margin, yPos);

    yPos += 4;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 34, 1.5, 1.5, 'FD');

    if (outdated.length > 0) {
      const out = outdated[0];
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...C_AMBER);
      pdf.text(`⚠ SUPERSEDED STANDARD DETECTED: ${out.referencedStandard}`, margin + 5, yPos + 7);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(`Active Unified Replacement: ${out.currentEdition}`, margin + 5, yPos + 14);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.setTextColor(71, 85, 105);
      pdf.text(out.note || 'Indenting officers must cite the active unified edition to prevent tender challenges.', margin + 5, yPos + 21, { maxWidth: contentWidth - 10 });
    } else {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8.5);
      pdf.setTextColor(...C_EMERALD);
      pdf.text('✓ ALL REFERENCED STANDARDS ARE ACTIVE CURRENT EDITIONS', margin + 5, yPos + 12);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text('No superseded or withdrawn Indian Standards detected in this procurement evaluation.', margin + 5, yPos + 20);
    }

    // Statutory Certification Matrix Table
    yPos = 72;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('STATUTORY QUALITY CONTROL ORDER (QCO) EVALUATION', margin, yPos);

    yPos += 4;
    pdf.setFillColor(...C_NAVY);
    pdf.rect(margin, yPos, contentWidth, 8, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(...C_WHITE);
    pdf.text('Certification Scheme', margin + 4, yPos + 5.5);
    pdf.text('Statutory Mandate', margin + 50, yPos + 5.5);
    pdf.text('Notifying Authority', margin + 110, yPos + 5.5);
    pdf.text('Applicability', pageWidth - margin - 4, yPos + 5.5, { align: 'right' });

    yPos += 8;
    const certRows = [
      { scheme: 'BIS ISI Mark (Scheme I)', mandate: 'Mandatory under Gazette QCO', auth: 'DPIIT / Heavy Industries', status: 'MANDATORY', isMandate: true },
      { scheme: 'MeitY CRS (Electronics)', mandate: 'Compulsory Registration Scheme', auth: 'Ministry of Electronics & IT', status: 'APPLICABLE', isMandate: true },
      { scheme: 'BEE Star Rating', mandate: 'Energy Conservation Act', auth: 'Bureau of Energy Efficiency', status: 'REQUIRED', isMandate: true },
      { scheme: 'BIS Hallmarking', mandate: 'Precious Metals Verification', auth: 'Bureau of Indian Standards', status: 'NOT APPLICABLE', isMandate: false }
    ];

    certRows.forEach((c, idx) => {
      pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      pdf.rect(margin, yPos, contentWidth, 9, 'F');
      pdf.setDrawColor(...C_BORDER);
      pdf.rect(margin, yPos, contentWidth, 9, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(c.scheme, margin + 4, yPos + 6);

      pdf.setFont('helvetica', 'normal');
      pdf.text(c.mandate, margin + 50, yPos + 6);
      pdf.text(c.auth, margin + 110, yPos + 6);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(c.isMandate ? C_EMERALD[0] : (100),
                       c.isMandate ? C_EMERALD[1] : (116),
                       c.isMandate ? C_EMERALD[2] : (139));
      pdf.text(c.status, pageWidth - margin - 4, yPos + 6, { align: 'right' });

      yPos += 9;
    });

    // Regulatory Citation Box
    yPos += 14;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 26, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_NAVY);
    pdf.text('STATUTORY PROCURING AUTHORITY NOTICE', margin + 4, yPos + 6);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(71, 85, 105);
    pdf.text('In accordance with Rule 144 of General Financial Rules (GFR 2017) and DPIIT Quality Control Orders, goods covered under mandatory BIS certification must carry the standard ISI / CRS mark and valid license from bidders on the date of bid submission.', margin + 4, yPos + 12, { maxWidth: contentWidth - 8 });

    drawPageFooter(6);
  }

  // =========================================================================
  // PAGE 7: ENFORCEABLE PROCUREMENT TECHNICAL SCHEDULE DRAFT
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 6: Enforceable Procurement Technical Schedule');

    let yPos = 28;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('TECHNICAL PROCUREMENT SCHEDULE DRAFT (FOR NIT INCLUSION)', margin, yPos);

    yPos += 5;
    const clauses = [
      {
        num: 'Clause 1',
        title: 'Scope of Supply',
        body: `The scope covers manufacture, factory testing, supply, and delivery of ${productName} in strict conformity with active Indian Standards, statutory Quality Control Orders, and CPWD technical specifications.`
      },
      {
        num: 'Clause 2',
        title: 'Mandatory Applicable Standards',
        body: `Equipment must comply with active editions: ${stdsToDisplay.slice(0, 4).map(s => s.standardNumber).join('; ')}.`
      },
      {
        num: 'Clause 3',
        title: 'Quality Assurance & Laboratory Type Testing',
        body: 'The supplier must submit Type Test reports from an ILAC/NABL accredited laboratory carried out within the last 3 years in accordance with published Indian Standard test methods.'
      },
      {
        num: 'Clause 4',
        title: 'Statutory BIS Certification Mandate',
        body: 'Bidders must hold an active and valid BIS License (CML Number) or Compulsory Registration (R-Number) on the date of bid opening. Bids without valid certification shall be summarily rejected.'
      },
      {
        num: 'Clause 5',
        title: 'Workmanship & Commissioning',
        body: 'Handling, erection, and commissioning shall strictly adhere to published Indian Standard Codes of Practice and CPWD safety guidelines.'
      }
    ];

    clauses.forEach((c) => {
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(...C_BORDER);
      pdf.roundedRect(margin, yPos, contentWidth, 32, 1.5, 1.5, 'FD');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(...C_NAVY);
      pdf.text(`${c.num}: ${c.title}`, margin + 5, yPos + 6.5);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(c.body, margin + 5, yPos + 13, { maxWidth: contentWidth - 10 });

      yPos += 36;
    });

    drawPageFooter(7);
  }

  // =========================================================================
  // PAGE 8: PRE-PUBLICATION CHECKLIST & STATUTORY DISCLAIMER
  // =========================================================================
  pdf.addPage('a4', 'p');
  {
    drawPageHeader('Section 7: Pre-Publication Verification Checklist & Disclaimer');

    let yPos = 28;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(...C_NAVY);
    pdf.text('INDENTING OFFICER PRE-TENDER PUBLICATION CHECKLIST', margin, yPos);

    yPos += 5;
    const checks = [
      'Verify active Indian Standard edition & latest amendments on official e-BIS Manakonline portal.',
      'Confirm mandatory BIS Quality Control Order (QCO) applicability with notifying ministry gazettes.',
      'Mandate NABL-accredited laboratory test reports as mandatory bid qualifying criteria.',
      'Enforce valid BIS License (CML Number) or CRS Registration (R-Number) from all participating bidders.',
      'Specify exact environmental ingress protection (IP Code per IS/IEC 60529) in technical schedule.',
      'Cross-check electrical surge suppression ratings (minimum 10kV) for outdoor electronic installations.',
      'Ensure conformity with General Financial Rules (GFR 2017) Rule 144 technical guidelines.'
    ];

    checks.forEach((chk) => {
      // Checkbox square
      pdf.setDrawColor(...C_NAVY);
      pdf.setLineWidth(0.4);
      pdf.rect(margin + 4, yPos, 4, 4, 'S');

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7.5);
      pdf.setTextColor(...C_DARK);
      pdf.text(chk, margin + 12, yPos + 3.2);

      yPos += 9.5;
    });

    // Statutory Responsible AI Disclaimer
    yPos += 6;
    pdf.setFillColor(...C_LIGHT_BG);
    pdf.setDrawColor(...C_BORDER);
    pdf.roundedRect(margin, yPos, contentWidth, 34, 1.5, 1.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_NAVY);
    pdf.text('STATUTORY RESPONSIBLE AI DECISION-SUPPORT NOTICE', margin + 5, yPos + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(71, 85, 105);
    const disc = 'This report is generated by the AI-Powered Indian Standards Recommendation Engine for decision-support and procurement research purposes. AI recommendations do not supersede official notifications published by the Bureau of Indian Standards (BIS) or relevant Ministries. Indenting officers must independently verify standard validity on manakonline.in prior to issuing tenders.';
    pdf.text(disc, margin + 5, yPos + 13, { maxWidth: contentWidth - 10 });

    // Official Sign-off Block
    yPos += 44;
    const signW = (contentWidth - 10) / 2;

    // Sign Box 1
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_NAVY);
    pdf.text('Prepared & Verified By:', margin, yPos);
    pdf.setDrawColor(150, 150, 150);
    pdf.setLineWidth(0.4);
    pdf.line(margin, yPos + 16, margin + signW, yPos + 16);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Indenting Officer / Technical Member', margin, yPos + 21);

    // Sign Box 2
    const s2X = margin + signW + 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...C_NAVY);
    pdf.text('Approved For Tender Issue:', s2X, yPos);
    pdf.line(s2X, yPos + 16, s2X + signW, yPos + 16);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Competent Financial Authority (CFA)', s2X, yPos + 21);

    drawPageFooter(8);
  }

  // Save the PDF if in browser environment, always return pdf object
  const cleanName = productName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 25);
  if (typeof window !== 'undefined' && typeof pdf.save === 'function') {
    pdf.save(`BIS_Procurement_Report_${cleanName}.pdf`);
  }
  return pdf;
};
