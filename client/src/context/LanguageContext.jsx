import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    appTitle: 'AI-Powered Indian Standards Recommendation Engine',
    heroTitle: 'AI-Powered Indian Standards Recommendation Engine',
    heroSubtitle: 'Identify the right Indian Standards for your procurement specifications with intelligent, explainable recommendations.',
    analyzeSpec: 'Analyze Specification',
    uploadTender: 'Upload Tender',
    dashboard: 'Dashboard',
    newAnalysis: 'New Analysis',
    tenderUpload: 'Upload Tender',
    analysisHistory: 'Analysis History',
    standardsExplorer: 'Standards Explorer',
    savedStandards: 'Saved Standards',
    reports: 'Reports',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    responsibleAiNotice: 'AI recommendations do not replace official BIS verification. Verify applicability on bis.gov.in prior to issuing tenders.',
    totalAnalyses: 'Total Analyses',
    standardsFound: 'Standards Recommended',
    savedCount: 'Saved Standards',
    activeMandates: 'Mandatory QCOs Tracked',
    startNewAnalysis: 'Start a New Analysis',
    describeProduct: 'Product Specification',
    describeProductSub: 'Describe the product or procurement requirement in natural language.',
    tenderDoc: 'Tender Document',
    tenderDocSub: 'Upload a PDF tender/specification document for automated requirement extraction.',
    recentAnalyses: 'Recent Procurement Analyses',
    productName: 'Product Name',
    category: 'Product Category',
    specification: 'Specification / Technical Requirement',
    specPlaceholder: 'Example: We need 100W outdoor LED street lights for municipal roads. The lights should be waterproof (IP66), energy efficient, electrically safe, with surge protection up to 10kV.',
    quantity: 'Quantity (Optional)',
    additionalReqs: 'Additional Requirements (Optional)',
    analyzeBtn: 'Analyze Specification',
    confidenceScore: 'Confidence / Relevance Score',
    primaryStandards: 'Primary Recommended Standards',
    relatedStandards: 'Related & Allied Standards',
    testingSafetyStandards: 'Testing & Safety Standards',
    certificationSection: 'Certification & Compliance Mandates',
    aiExplanation: 'Why These Standards? (AI Analysis)',
    matchedRequirements: 'Matched Requirements',
    downloadPdf: 'Download PDF Report',
    printReport: 'Print Report',
    viewDetails: 'View Details',
    saveStandard: 'Save Standard',
    saved: 'Saved'
  },
  hi: {
    appTitle: 'एआई-संचालित भारतीय मानक अनुशंसा प्रणाली',
    heroTitle: 'एआई-संचालित भारतीय मानक अनुशंसा प्रणाली',
    heroSubtitle: 'सार्वजनिक खरीद विनिर्देशों के लिए सटीक, व्याख्यात्मक और प्रमाणिक भारतीय मानकों (BIS Standards) की पहचान करें।',
    analyzeSpec: 'विनिर्देश का विश्लेषण करें',
    uploadTender: 'निविदा (Tender) अपलोड करें',
    dashboard: 'डैशबोर्ड',
    newAnalysis: 'नया विश्लेषण',
    tenderUpload: 'निविदा अपलोड',
    analysisHistory: 'विश्लेषण इतिहास',
    standardsExplorer: 'मानक अन्वेषक',
    savedStandards: 'सहेजे गए मानक',
    reports: 'रिपोर्ट',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    responsibleAiNotice: 'निर्णय-सहायता प्रणाली: एआई अनुशंसाएं आधिकारिक बीआईएस सत्यापन का विकल्प नहीं हैं। निविदा जारी करने से पहले bis.gov.in पर पुष्टि करें।',
    totalAnalyses: 'कुल विश्लेषण',
    standardsFound: 'अनुशंसित मानक',
    savedCount: 'सहेजे गए मानक',
    activeMandates: 'सक्रिय गुणवत्ता आदेश (QCOs)',
    startNewAnalysis: 'नया विश्लेषण शुरू करें',
    describeProduct: 'उत्पाद विनिर्देश (Specification)',
    describeProductSub: 'सरल भाषा में उत्पाद या खरीद आवश्यकताओं का विवरण दर्ज करें।',
    tenderDoc: 'निविदा दस्तावेज़ (Tender PDF)',
    tenderDocSub: 'स्वचालित आवश्यकता निष्कर्षण के लिए निविदा पीडीएफ दस्तावेज़ अपलोड करें।',
    recentAnalyses: 'हाल के खरीद विश्लेषण',
    productName: 'उत्पाद का नाम',
    category: 'उत्पाद श्रेणी',
    specification: 'तकनीकी विनिर्देश / आवश्यकताएं',
    specPlaceholder: 'उदाहरण: हमें नगर निगम की सड़कों के लिए 100W आउटडोर एलईडी स्ट्रीट लाइट चाहिए। लाइट वाटरप्रूफ (IP66), ऊर्जा कुशल, विद्युत सुरक्षित और 10kV सर्ज सुरक्षा वाली होनी चाहिए।',
    quantity: 'मात्रा (वैकल्पिक)',
    additionalReqs: 'अतिरिक्त आवश्यकताएं (वैकल्पिक)',
    analyzeBtn: 'विनिर्देश का विश्लेषण करें',
    confidenceScore: 'विश्वसनीयता / प्रासंगिकता स्कोर',
    primaryStandards: 'प्राथमिक अनुशंसित मानक',
    relatedStandards: 'संबंधित और संबद्ध मानक',
    testingSafetyStandards: 'परीक्षण और सुरक्षा मानक',
    certificationSection: 'प्रमाणन और अनुपालन अनिवार्यता',
    aiExplanation: 'यही मानक क्यों? (एआई विश्लेषण)',
    matchedRequirements: 'मिलान की गई आवश्यकताएं',
    downloadPdf: 'पीडीएफ रिपोर्ट डाउनलोड करें',
    printReport: 'रिपोर्ट प्रिंट करें',
    viewDetails: 'विवरण देखें',
    saveStandard: 'मानक सहेजें',
    saved: 'सहेजा गया'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const toggleLanguage = (selectedLang) => {
    if (selectedLang) setLang(selectedLang);
    else setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
