import { Standard } from '../models/Standard.js';
import { INDIAN_STANDARDS_DATABASE } from '../services/standardsData.js';

export const seedStandardsIfEmpty = async () => {
  try {
    const count = await Standard.countDocuments();
    if (count === 0 || count < INDIAN_STANDARDS_DATABASE.length) {
      console.log(`[Seed] Updating / Seeding ${INDIAN_STANDARDS_DATABASE.length} authentic Indian Standards into database...`);
      await Standard.deleteMany({});
      await Standard.insertMany(INDIAN_STANDARDS_DATABASE);
      console.log(`[Seed] Database synchronized successfully.`);
    }
  } catch (error) {
    console.warn(`[Seed] Could not seed MongoDB (${error.message}). Working from in-memory standards dataset.`);
  }
};

export const getKnowledgeBaseStats = async (req, res) => {
  try {
    const totalStandards = INDIAN_STANDARDS_DATABASE.length;
    const totalAmendments = INDIAN_STANDARDS_DATABASE.reduce((acc, curr) => acc + (curr.amendments?.length || 0), 0);
    const totalRelationships = INDIAN_STANDARDS_DATABASE.reduce(
      (acc, curr) => acc + (curr.normativeReferences?.length || 0) + (curr.testingStandards?.length || 0) + (curr.safetyStandards?.length || 0),
      0
    );
    const totalMandates = INDIAN_STANDARDS_DATABASE.filter(s => s.certification?.isMandatory).length;

    return res.json({
      status: 'Synchronized',
      corpusName: 'Bureau of Indian Standards (BIS) e-Manak Index',
      version: 'SIH-2026-v2.8',
      lastVerified: '2026-08-28',
      dataProvenance: 'Official BIS Standards & Gazette Quality Control Orders (DPIIT / MeitY / MNRE / MoHUA)',
      isDemoKnowledgeBase: true,
      stats: {
        totalStandards,
        totalAmendments,
        totalRelationships,
        totalMandatoryQCOs: totalMandates,
        supportedCategories: ['LED Lighting', 'Cement & Concrete', 'Structural Steel', 'Personal Protective Equipment', 'Pumps & Hydraulics', 'Solar PV', 'Electrical Cables', 'Power Transformers']
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving knowledge base stats' });
  }
};

export const searchStandards = async (req, res) => {
  try {
    const {
      q = '',
      category = '',
      industry = '',
      status = '',
      year = '',
      certification = '',
      limit = 50,
      page = 1
    } = req.query;

    let results = [];

    try {
      const query = {};
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(category, 'i') };
      }
      if (industry && industry !== 'All') {
        query.industry = { $regex: new RegExp(industry, 'i') };
      }
      if (status && status !== 'All') {
        query.status = status;
      }
      if (year && year !== 'All') {
        query.publicationYear = Number(year);
      }
      if (certification && certification !== 'All') {
        if (certification === 'Mandatory') {
          query['certification.isMandatory'] = true;
        } else if (certification === 'CRS') {
          query['certification.scheme'] = { $regex: /CRS|Compulsory Registration/i };
        } else if (certification === 'ISI') {
          query['certification.scheme'] = { $regex: /ISI|Scheme I/i };
        }
      }

      if (q.trim()) {
        const regex = new RegExp(q.trim(), 'i');
        query.$or = [
          { standardNumber: regex },
          { title: regex },
          { scope: regex },
          { keywords: { $in: [regex] } }
        ];
      }

      results = await Standard.find(query)
        .sort({ publicationYear: -1, standardNumber: 1 })
        .limit(Number(limit));

      if (results.length === 0 && !q && !category && !status) {
        results = INDIAN_STANDARDS_DATABASE;
      }
    } catch (dbErr) {
      results = INDIAN_STANDARDS_DATABASE.filter(std => {
        if (category && category !== 'All' && !std.category.toLowerCase().includes(category.toLowerCase())) return false;
        if (industry && industry !== 'All' && !std.industry.toLowerCase().includes(industry.toLowerCase())) return false;
        if (status && status !== 'All' && std.status !== status) return false;
        if (year && year !== 'All' && std.publicationYear !== Number(year)) return false;
        if (certification && certification !== 'All') {
          if (certification === 'Mandatory' && !std.certification?.isMandatory) return false;
          if (certification === 'CRS' && !std.certification?.scheme?.includes('CRS')) return false;
          if (certification === 'ISI' && !std.certification?.scheme?.includes('ISI')) return false;
        }
        if (q.trim()) {
          const queryText = q.toLowerCase();
          const matches =
            std.standardNumber.toLowerCase().includes(queryText) ||
            std.title.toLowerCase().includes(queryText) ||
            std.scope.toLowerCase().includes(queryText) ||
            std.keywords.some(k => k.toLowerCase().includes(queryText));
          if (!matches) return false;
        }
        return true;
      });
    }

    return res.json({
      total: results.length,
      page: Number(page),
      standards: results
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error searching standards: ' + error.message });
  }
};

export const getStandardById = async (req, res) => {
  try {
    const { id } = req.params;
    let standard = null;

    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        standard = await Standard.findById(id);
      } else {
        standard = await Standard.findOne({ standardNumber: decodeURIComponent(id) });
      }
    } catch (dbErr) {
      // Fallback
    }

    if (!standard) {
      const decodedId = decodeURIComponent(id).toLowerCase().replace(/[:\s]+/g, ' ').trim();
      standard = INDIAN_STANDARDS_DATABASE.find(s => {
        const sClean = s.standardNumber.toLowerCase().replace(/[:\s]+/g, ' ').trim();
        return sClean.includes(decodedId) || decodedId.includes(sClean) || s._id === id;
      });
    }

    if (!standard) {
      return res.status(404).json({ message: `Standard not found for ID/Number: ${id}` });
    }

    return res.json(standard);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving standard: ' + error.message });
  }
};

export const getCategoriesAndFilters = async (req, res) => {
  try {
    const categories = Array.from(new Set(INDIAN_STANDARDS_DATABASE.map(s => s.category)));
    const industries = Array.from(new Set(INDIAN_STANDARDS_DATABASE.map(s => s.industry)));
    const years = Array.from(new Set(INDIAN_STANDARDS_DATABASE.map(s => s.publicationYear))).sort((a, b) => b - a);

    return res.json({
      categories,
      industries,
      years,
      statuses: ['Current', 'Under Revision', 'Superseded', 'Withdrawn'],
      certifications: ['All', 'Mandatory', 'CRS', 'ISI']
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving filter facets' });
  }
};
