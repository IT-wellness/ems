import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createUploadDirs = () => {
    const baseDir = './uploads/employees';
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
    }
};

createUploadDirs();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/employees');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const safeName = file.fieldname + '-' + Date.now() + ext;
        cb(null, safeName);
    }
});

export const upload = multer({ storage: storage });