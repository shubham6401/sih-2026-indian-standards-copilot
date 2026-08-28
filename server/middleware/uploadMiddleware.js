import multer from 'multer';

// Use memory storage for fast in-memory PDF parsing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF documents are supported for tender specification analysis.'), false);
  }
};

export const uploadPdf = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max
  },
  fileFilter
});
