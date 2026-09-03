import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEMO_USERS, DEMO_PASSWORD } from './demoUsers.js';
import { PO_TOPICS } from './poTopics.js';
import { DEPT_TOPICS } from './deptTopics.js';
import { PSU_TOPICS } from './psuTopics.js';
import { ADMIN_TOPICS } from './adminTopics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

const buildAnalysis = (t, index, roleName, prefix, userEmail) => {
  const score = 88 + (index % 10);
  return {
    demoKey: `${prefix}_analysis_${String(index + 1).padStart(2, '0')}`,
    userEmail: userEmail,
    productName: t.name,
    productCategory: t.category,
    status: index % 7 === 3 ? 'Needs Attention' : (index % 11 === 5 ? 'Under Review' : 'Completed'),
    reportType: `${roleName} Standards Compliance Report`,
    quantity: t.quantity,
    confidenceScore: score,
    confidenceLabel: score >= 94 ? 'Direct Match' : 'Highly Relevant',
    inputType: 'tender_pdf',
    createdAt: daysAgo(index + 1),
    rawInput: t.spec,
    explanation: `Evaluated against Bureau of Indian Standards corpus. Primary specification aligns with ${t.std}. ${t.gap}`,
    documentMetadata: {
      filename: t.file,
      fileSize: 1200000 + (index * 85432) % 4500000,
      totalPages: 14 + (index * 3) % 45,
      extractedClausesCount: 20 + (index * 2) % 35
    },
    primaryStandards: [
      {
        standardNumber: t.std,
        title: t.stdTitle,
        edition: t.edition,
        status: 'Current',
        category: t.category,
        relevanceScore: score,
        whyRecommended: `Primary Indian Standard governing ${t.name}.`
      },
      {
        standardNumber: t.secondary,
        title: t.secondaryTitle,
        edition: 'Current Edition',
        status: 'Current',
        category: t.category,
        relevanceScore: score - 4,
        whyRecommended: `Essential subsidiary safety and performance standard.`
      }
    ],
    alternativeStandards: [
      {
        standardNumber: t.testing,
        title: t.testingTitle,
        edition: 'Harmonized Edition',
        status: 'Current',
        category: t.category,
        relevanceScore: score - 6,
        whyRecommended: `Referenced testing and inspection standard.`
      }
    ],
    relatedStandards: [
      {
        standardNumber: t.testing,
        title: t.testingTitle,
        relationshipType: 'Testing Protocol',
        relevanceScore: score - 5,
        status: 'Current',
        edition: 'Active'
      }
    ],
    testingStandards: [
      {
        standardNumber: t.testing,
        title: t.testingTitle,
        category: t.category,
        status: 'Current'
      }
    ],
    safetyStandards: [
      {
        standardNumber: t.secondary,
        title: t.secondaryTitle,
        category: t.category,
        status: 'Current'
      }
    ],
    certifications: [
      {
        type: t.qco.includes('CRS') ? 'Compulsory Registration Scheme (CRS)' : 'BIS ISI Mark Certification Scheme-I',
        status: 'Mandatory',
        standardNumber: t.std,
        authority: 'Bureau of Indian Standards (BIS) / DPIIT',
        mandateReason: t.qco,
        verificationNote: 'Mandatory verification on official BIS Portal (www.bis.gov.in) prior to bid qualification.'
      }
    ],
    tenderGaps: [
      {
        category: 'Statutory Compliance & Testing',
        severity: index % 3 === 0 ? 'HIGH' : 'MEDIUM',
        title: 'Compliance Gap Detected',
        description: t.gap,
        remedy: t.remedy
      }
    ],
    procurementReadiness: {
      totalScore: score,
      statusLabel: score >= 92 ? 'Tender Ready (High Quality)' : 'Needs Revision Before Publication',
      actionCount: score >= 92 ? 1 : 2,
      breakdown: {
        standardsCoverage: score + 1 > 100 ? 100 : score + 1,
        testingCoverage: score - 3,
        safetyCoverage: score,
        certificationCoverage: score + 2 > 100 ? 100 : score + 2,
        versionCurrency: 98,
        technicalCompleteness: score - 2
      }
    },
    improvedSpecification: `${t.spec} All materials and equipment shall be strictly manufactured in compliance with ${t.std} and ${t.secondary}. Vendor must possess valid active BIS License / CRS Registration and submit accredited NABL laboratory test certificates conforming to ${t.testing}.`
  };
};

const poAnalyses = PO_TOPICS.map((t, i) => buildAnalysis(t, i, 'Procurement Officer', 'po', 'procurement1@anveshak.demo'));
const deptAnalyses = DEPT_TOPICS.map((t, i) => buildAnalysis(t, i, 'Government Department', 'dept', 'department1@anveshak.demo'));
const psuAnalyses = PSU_TOPICS.map((t, i) => buildAnalysis(t, i, 'PSU', 'psu', 'psu1@anveshak.demo'));
const adminAnalyses = ADMIN_TOPICS.map((t, i) => buildAnalysis(t, i, 'Admin Governance', 'admin', 'admin1@anveshak.demo'));

const ALL_ANALYSES = [
  ...poAnalyses,
  ...deptAnalyses,
  ...psuAnalyses,
  ...adminAnalyses
];

console.log(`Generated:
- Procurement Officer: ${poAnalyses.length} analyses
- Government Department: ${deptAnalyses.length} analyses
- PSU: ${psuAnalyses.length} analyses
- Admin: ${adminAnalyses.length} analyses
- Total: ${ALL_ANALYSES.length} analyses`);

// Write out demoData.js
const fileContent = `/**
 * Anveshak — SIH 2026 Hackathon Demo Dataset
 * Comprehensive verifiable Indian Standards procurement intelligence data
 * 4 Demo Accounts for EACH of the 4 Roles (16 accounts total + aliases)
 * 32 Comprehensive PDF Tender Reports for EACH Role (128 analyses total)
 */

export const DEMO_PASSWORD = '${DEMO_PASSWORD}';

export const DEMO_USERS = ${JSON.stringify(DEMO_USERS, null, 2)};

export const DEMO_ANALYSES = ${JSON.stringify(ALL_ANALYSES, null, 2)};
`;

const outputPath = path.resolve(__dirname, 'demoData.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully written demoData.js (${(fileContent.length / 1024).toFixed(1)} KB) to ${outputPath}`);
