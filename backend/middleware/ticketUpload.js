import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.resolve('uploads/tickets');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    const filename = `${file.fieldname}-${Date.now()}-${base}${ext}`;
    cb(null, filename);
  }
});

const allowedExtensions = /jpeg|jpg|png|pdf|docx|xlsx|txt/;
const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

const ticketUpload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.test(ext)) {
      return cb(new Error('Unsupported file type'), false);
    }
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Unsupported MIME type'), false);
    }
    cb(null, true);
  }
});

export default ticketUpload;