# AI Procurement Standards Copilot (SIH 2026)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bureau of Indian Standards](https://img.shields.io/badge/Standards-BIS%20Manakonline-12396b.svg)](https://manakonline.in)
[![Make in India](https://img.shields.io/badge/Procurement-Make%20in%20India%20Aligned-amber.svg)](https://dpiit.gov.in)
[![SIH 2026 Innovation](https://img.shields.io/badge/SIH%202026-AI%20Procurement%20Copilot-emerald.svg)](https://sih.gov.in)

> **"We don't simply search Indian Standards.**  
> **We understand the procurement requirement, identify the standards, discover their relationships, detect missing or outdated references, explain our recommendations, and help the procurement officer create a complete, enforceable technical specification."**

A differentiated, intelligent decision-support copilot designed specifically for **Government Departments (CPWD, Railways, MoHUA), Central/State PSUs (NTPC, BHEL, IOCL), Municipal Corporations, and Procurement Officers** to bridge the critical gap between unstructured procurement specifications/tenders and statutory Indian Standards (IS), mandatory Quality Control Orders (QCOs), and compulsory BIS certifications.

---

## 🏛️ Differentiated Copilot Capabilities

### 1. Tender Intelligence & Structured Extraction
- Ingests raw specifications, Hindi/English text, Voice audio, or multi-page Tender PDFs (up to 20MB).
- Extracts and itemizes 12+ structured attributes: *Product, Classification, Application, Material & Construction, Capacity/Rating, Environmental Ingress, Electrical Safety, Performance Efficacy, Testing Protocols, Statutory Certifications, Installation Codes*.
- Indenting officers can review and adjust extracted parameters before final specification generation.

### 2. Missing Information & Zero-Hallucination Ambiguity Dialog
- Prevents hallucinated standard recommendations when specifications are underspecified (e.g. *"We need a water pump"*).
- Launches an **Interactive Clarification Dialog** asking targeted technical questions (*Pump mechanism: Submersible vs Centrifugal vs Monobloc; Power rating: 5 HP vs 10 HP; Environment: Deep borewell vs Surface*).

### 3. Tender Gap Detection Engine
- Automatically scans tender specifications against recommended standards and flags:
  - ❌ **Missing Laboratory Test Standards** (e.g., omitted luminous efficacy IS 16107, concrete compressive test IS 4031)
  - ❌ **Missing Statutory Certification Clauses** (e.g., absent BIS CML / CRS registration qualifying conditions)
  - ❌ **Unspecified Environmental Ingress Ratings** (e.g., missing IP66 / IP68 protection)
  - ❌ **Surge Protection Deficits** (e.g., missing 10kV transient SPD requirements)
- Assigns severity ratings (**HIGH**, **MEDIUM**, **LOW**) with actionable remedial clauses.

### 4. Version & Amendment Intelligence
- Detects superseded or obsolete citations in draft tenders (e.g. `IS 8112: 1989` or `IS 12269: 1987` → unified `IS 269: 2015`).
- Visualizes edition evolution histories and notified amendments (e.g., tropical climate & 10kV grid surge protection amendments).

### 5. Procurement Readiness Score (0–100)
- Computes a comprehensive quality index evaluating:
  - **Standards Coverage** (%)
  - **Testing & Verification Coverage** (%)
  - **Safety & Protection Coverage** (%)
  - **Certification & QCO Compliance** (%)
  - **Version Currency** (%)
  - **Technical Completeness** (%)
- Highlights exact areas requiring attention before Notice Inviting Tender (NIT) publication.

### 6. Alternative Standards Disambiguation
- Categorizes candidate standards into **Primary Match (94%)**, **Alternative Match (83%)**, and **Possible Match (71%)**.
- Explicitly explains: *"Why is this not the primary recommendation?"* (e.g. domestic retrofit vs outdoor integrated luminaire, surface vs submerged deep-well construction).

### 7. Standards Relationship Hierarchy Graph
- Interactive visual graph connecting:
  $$\text{Primary Product Standard} \longrightarrow \text{Testing Standards} \longrightarrow \text{Safety Standards} \longrightarrow \text{Installation Codes} \longrightarrow \text{Normative References}$$

### 8. Before vs. After Specification Comparison View
- Side-by-side interactive transformation view comparing original raw tender text with the AI-upgraded schedule, highlighting added test clauses, updated editions, and enforceable certification terms.

### 9. AI Tender Specification Generator
- Synthesizes a structured 8-section procurement technical schedule ready for GeM (Government e-Marketplace) indents and formal tenders.
- Supports inline editing, one-click clipboard copy, and formal PDF dossier export (`jsPDF` + `html2canvas`).

### 10. Multilingual Voice Input
- Built-in speech recognition supporting **English** and **Hindi (हिंदी)** voice dictation via the HTML5 Web Speech API.

### 11. Knowledge Base Transparency & Provenance
- Dedicated provenance panel tracking corpus synchronization, active amendments, and direct links to the official [e-BIS Manakonline](https://manakonline.in) portal.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS (Clean Government Theme), Lucide Icons, jsPDF, html2canvas, Canvas Confetti.
- **Backend**: Node.js, Express.js REST API (Port 5001).
- **Persistence Layer**: Resilient MongoDB / Mongoose with embedded in-memory fallback for zero-dependency execution.
- **RAG & NLP Engine**: Bilingual transliteration matcher, graph relation traversal, and Gemini 1.5 Flash LLM integration hooks.
- **Document Processing**: `multer` and `pdf-parse` for multi-page tender PDF ingestion.

---

## 🚀 Quick Start Guide

### 1. Installation

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Running Locally

**Terminal 1 (Backend Server on Port 5001):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend Client on Port 5174 / 5173):**
```bash
cd client
npm run dev
```

Open your browser at **`http://localhost:5174`** (or `http://localhost:5173`).

---

## 🎯 3 Curated SIH 2026 Demo Scenarios

Click any preset in **New Analysis** or **Demo Mode**:

| Scenario | Input Requirement | Key Demonstration Highlights |
| :--- | :--- | :--- |
| **1. 100W Outdoor LED Street Light** | `"We need 100W outdoor LED street lights for municipal roads. The lights should be waterproof (IP66), energy efficient..."` | Full Pipeline: `IS 10322 (Part 5/Sec 3)`, `IS 15885`, `IS 16107`, Relationship Graph, MeitY CRS & BEE Star, Gap Analysis, Improved Spec. |
| **2. 53 Grade Structural Cement** | `"We require 53 Grade Ordinary Portland Cement as per IS 12269:1987 for construction of reinforced concrete bridges..."` | **Outdated Citation Detection**: Flags `IS 12269:1987` → upgrades to `IS 269:2015`, compressive testing `IS 4031`, DPIIT Cement QCO. |
| **3. Ambiguous Query: "Water Pump"** | `"We need a water pump."` | **Zero-Hallucination Clarification**: AI asks for pump mechanism (Centrifugal vs Submersible vs Monoset) → accurately maps to `IS 8034:2018` / `IS 8472:2019`. |

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **CPWD Procurement Officer** | `demo@procure.gov.in` | `demo123` |
| **PSU Executive (NTPC/BHEL)** | `psu@gov.in` | `demo123` |

---

## ⚖️ Statutory Notice & Responsible AI Disclaimer

> [!IMPORTANT]
> **Decision-Support Notice:** This application is an advisory AI decision-support system designed to assist procurement officers in drafting tenders. Recommendations, relevance scores, and compliance tags do **not** constitute legal advice or statutory certifications. Indenting officers must independently verify standard applicability, active revision numbers, and valid manufacturer BIS licensing on the official portal ([manakonline.in](https://manakonline.in) / [bis.gov.in](https://www.bis.gov.in)) prior to issuing tenders or awarding contracts.
