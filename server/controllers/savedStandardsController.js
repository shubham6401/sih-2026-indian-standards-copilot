import { SavedStandard } from '../models/SavedStandard.js';
import { INDIAN_STANDARDS_DATABASE } from '../services/standardsData.js';

const memorySavedStandards = [];

export const saveStandard = async (req, res) => {
  try {
    const { standardNumber, notes = '', tags = [] } = req.body;
    if (!standardNumber) {
      return res.status(400).json({ message: 'standardNumber is required.' });
    }

    const matchedStd = INDIAN_STANDARDS_DATABASE.find(s => s.standardNumber === standardNumber) || {
      standardNumber,
      title: standardNumber,
      category: 'General',
      status: 'Current'
    };

    const recordData = {
      userId: req.user?._id || null,
      standardNumber: matchedStd.standardNumber,
      title: matchedStd.title,
      category: matchedStd.category,
      status: matchedStd.status,
      edition: matchedStd.edition,
      notes,
      tags,
      standardDetails: matchedStd,
      createdAt: new Date()
    };

    let saved = null;
    try {
      saved = await SavedStandard.create(recordData);
    } catch (e) {
      saved = { _id: 'saved_' + Date.now(), ...recordData };
      memorySavedStandards.unshift(saved);
    }

    return res.status(201).json({ success: true, savedStandard: saved });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving standard: ' + error.message });
  }
};

export const getSavedStandards = async (req, res) => {
  try {
    let list = [];
    try {
      const userId = req.user?._id;
      const query = userId ? { $or: [{ userId }, { userId: null }] } : {};
      list = await SavedStandard.find(query).sort({ createdAt: -1 });
    } catch (e) {
      list = memorySavedStandards;
    }

    if (list.length === 0 && memorySavedStandards.length > 0) {
      list = memorySavedStandards;
    }

    return res.json(list);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving saved standards: ' + error.message });
  }
};

export const removeSavedStandard = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await SavedStandard.findByIdAndDelete(id);
    } catch (e) {
      const idx = memorySavedStandards.findIndex(s => String(s._id) === String(id) || s.standardNumber === id);
      if (idx !== -1) memorySavedStandards.splice(idx, 1);
    }

    return res.json({ success: true, message: 'Standard removed from saved library.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing standard: ' + error.message });
  }
};
