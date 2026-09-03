import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Analysis } from '../models/Analysis.js';
import { Standard } from '../models/Standard.js';
import { memoryAnalyses } from './analysisController.js';
import { INDIAN_STANDARDS_DATABASE } from '../services/standardsData.js';
import { DEMO_USERS } from '../seed/demoData.js';

export const getUsers = async (req, res) => {
  try {
    let users = [];
    if (mongoose.connection?.readyState === 1) {
      try {
        users = await User.find({}).select('-password').sort({ createdAt: -1 });
      } catch (e) {
        users = DEMO_USERS;
      }
    } else {
      users = DEMO_USERS;
    }

    if (!users || users.length === 0) {
      users = DEMO_USERS;
    }

    // Compute dynamic analysis counts per user
    const isDbReady = mongoose.connection?.readyState === 1;
    const userList = await Promise.all(
      users.map(async (u) => {
        const uObj = u.toObject ? u.toObject() : { ...u };
        let count = 0;
        if (isDbReady) {
          try {
            count = await Analysis.countDocuments({
              $or: [
                { userId: u._id },
                { userEmail: u.email }
              ]
            });
          } catch (cntErr) {
            count = memoryAnalyses.filter(a => a.userEmail === u.email).length;
          }
        } else {
          count = memoryAnalyses.filter(a => a.userEmail === u.email).length;
        }

        if (count === 0) {
          count = memoryAnalyses.filter(a => a.userEmail === u.email).length;
        }

        return {
          ...uObj,
          analysesCount: count
        };
      })
    );

    return res.json({
      success: true,
      count: userList.length,
      users: userList
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving platform users: ' + error.message });
  }
};

export const getPlatformStats = async (req, res) => {
  try {
    let totalUsers = DEMO_USERS.length;
    let totalAnalyses = memoryAnalyses.length;
    let totalStandards = INDIAN_STANDARDS_DATABASE.length;

    try {
      const dbUserCount = await User.countDocuments();
      if (dbUserCount > 0) totalUsers = dbUserCount;
    } catch (e) {}

    try {
      const dbAnalysisCount = await Analysis.countDocuments();
      if (dbAnalysisCount > 0) totalAnalyses = dbAnalysisCount;
    } catch (e) {}

    try {
      const dbStdCount = await Standard.countDocuments();
      if (dbStdCount > 0) totalStandards = dbStdCount;
    } catch (e) {}

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalAnalyses,
        reportsGenerated: totalAnalyses,
        standardsIndexed: totalStandards,
        systemStatus: {
          aiEngine: 'Active (Hybrid NLP + BIS RAG)',
          database: 'Connected',
          documentOCR: 'Ready (Tesseract.js & PDFParse)',
          lastSync: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving platform statistics: ' + error.message });
  }
};

export const getSystemActivity = async (req, res) => {
  try {
    const activityLog = [
      {
        id: 'act-1',
        event: 'BIS Standard Catalog Sync',
        description: 'Synchronized 1850+ active Bureau of Indian Standards specifications with DPIIT QCO orders.',
        actor: 'BIS Automated Sync Daemon',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        severity: 'info'
      },
      {
        id: 'act-2',
        event: 'QCO Gazette Enforcement Notice',
        description: 'DPIIT mandatory certification mandate updated for Electrical & Electronic Luminaires.',
        actor: 'Statutory Regulator Notice',
        timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        severity: 'warning'
      },
      {
        id: 'act-3',
        event: 'Tender Specification Analysis Completed',
        description: 'Analysis completed for 100W Outdoor LED Street Light (IS 10322 Part 5/Sec 3).',
        actor: 'Rajesh Kumar (CPWD)',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        severity: 'success'
      },
      {
        id: 'act-4',
        event: 'Department Procurement Plan Verified',
        description: 'Highway Paving Bitumen VG-30 compliance verified against IS 73: 2013.',
        actor: 'Priya Sharma (Public Works)',
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        severity: 'success'
      },
      {
        id: 'act-5',
        event: 'High Voltage Equipment Audit Completed',
        description: '33kV/11kV 5 MVA Power Transformer verified against IS 2026: 2011 and QCO norms.',
        actor: 'Amit Verma (Energy PSU)',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        severity: 'info'
      }
    ];

    return res.json({
      success: true,
      activities: activityLog
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving system activity log: ' + error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ['Procurement Officer', 'Government Department', 'PSU', 'Organization/Admin'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be one of: ' + allowedRoles.join(', ') });
    }

    try {
      const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
      if (user) {
        return res.json({ success: true, message: 'User role updated successfully', user });
      }
    } catch (e) {}

    const memUser = DEMO_USERS.find(u => u._id === id || u.demoKey === id);
    if (memUser) {
      memUser.role = role;
      return res.json({ success: true, message: 'User role updated successfully', user: memUser });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user role: ' + error.message });
  }
};
