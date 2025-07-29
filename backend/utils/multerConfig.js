import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = path.resolve('uploads/employees');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const timestamp = Date.now();
    const safeName = `${file.fieldname}-${timestamp}-${baseName}${ext}`;
    cb(null, safeName);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // optional: 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Only JPEG, PNG, and PDF files are allowed.'), false);
    }
  }
});