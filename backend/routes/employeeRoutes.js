import express from 'express';
import { body, param, query } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { requiresRole, authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../utils/multerConfig.js';

import {
  addEmployee,
  listEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

// Global Authentication for all employee routes
router.use(authMiddleware);

// Creation rate limiter and validation rules
const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many employee creation attempts'
});

const employeeValidationRules = [
  body('personal.firstName').notEmpty().withMessage('First name is required').trim(),
  body('personal.lastName').notEmpty().withMessage('Last name is required').trim(),
  body('contact.email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('employment.employeeId').notEmpty().withMessage('Employee ID is required')
];

router.post(
  '/add',
  createLimiter,
  requiresRole('admin'),
  (req, res, next) => {
    upload.any()(req, res, err => {
      if (err) {
        if (err.name === 'MulterError') {
          return res.status(400).json({ message: 'File upload error', error: err.message });
        } else {
          return res.status(400).json({ message: 'File processing failed', error: err.message });
        }
      }
      next();
    });
  },
  employeeValidationRules,
  addEmployee
);

// GET /all - List employees (admin and manager)
router.get(
  '/all',
  requiresRole('admin', 'manager'),
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt(),
    query('search').optional().trim()
  ],
  listEmployees
);

// GET /:_id - Get employee by ID (admin, manager, employee)
router.get(
  '/:_id',
  requiresRole('admin', 'manager', 'employee'),
  param('_id').isMongoId().withMessage('Invalid employee ID'),
  getEmployeeById
);

// PUT /update/:_id - Update employee (admin only)
router.put(
  '/update/:_id',
  requiresRole('admin'),
  param('_id').isMongoId().withMessage('Invalid employee ID'),
  updateEmployee
);

// DELETE /delete/:_id - Delete employee (admin only)
router.delete(
  '/delete/:_id',
  requiresRole('admin'),
  param('_id').isMongoId().withMessage('Invalid employee ID'),
  deleteEmployee
);

export default router;