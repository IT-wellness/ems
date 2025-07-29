import { validationResult } from 'express-validator';
import licenseModel from '../models/License.js';
import logger from '../utils/logger.js';

// POST /add
export async function addLicense(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newLicense = new licenseModel(req.body);
    await newLicense.save();

    logger.info('License added', { licenseId: newLicense._id });
    res.status(201).json({ message: 'License added successfully', license: newLicense });
  } catch (error) {
    logger.error('License creation failed', { error: error.message });
    res.status(400).json({ message: 'Error adding license', error: error.message });
  }
}

// GET /all
export async function listLicenses(req, res) {
  try {
    const licenses = await licenseModel.find({})
      .populate('softwareId assignedTo')
      .lean();

    res.status(200).json(licenses);
  } catch (error) {
    logger.error('License list error', error);
    res.status(500).json({ message: 'Error fetching licenses', error: error.message });
  }
}

// GET /:id
export async function getLicenseById(req, res) {
  try {
    const license = await licenseModel.findById(req.params._id)
      .populate('softwareId assignedTo')
      .lean();

    if (!license) return res.status(404).json({ message: 'License not found' });
    res.status(200).json(license);
  } catch (error) {
    logger.error('License fetch error', { licenseId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error fetching license', error: error.message });
  }
}

// PUT /update/:id
export async function updateLicense(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updatedLicense = await licenseModel.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });

    if (!updatedLicense) return res.status(404).json({ message: 'License not found' });
    logger.info('License updated', { licenseId: req.params._id });
    res.status(200).json({ message: 'License updated successfully', license: updatedLicense });
  } catch (error) {
    logger.error('License update failed', { licenseId: req.params._id, error: error.message });
    res.status(400).json({ message: 'Error updating license', error: error.message });
  }
}

// DELETE /delete/:id
export async function deleteLicense(req, res) {
  try {
    const deletedLicense = await licenseModel.findByIdAndDelete(req.params._id);

    if (!deletedLicense) return res.status(404).json({ message: 'License not found' });
    logger.info('License deleted', { licenseId: req.params._id });
    res.status(200).json({ message: 'License deleted successfully' });
  } catch (error) {
    logger.error('License deletion failed', { licenseId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error deleting license', error: error.message });
  }
}