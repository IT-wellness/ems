import { validationResult } from 'express-validator';
import softwareModel from '../models/Software.js';
import logger from '../utils/logger.js';

// POST /add
export async function addSoftware(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newSoftware = new softwareModel(req.body);
    await newSoftware.save();
    logger.info('Software added', { softwareId: newSoftware._id, name: newSoftware.name });

    res.status(201).json({ message: 'Software added successfully', software: newSoftware });
  } catch (error) {
    logger.error('Software creation failed', { error: error.message, payload: req.body });
    res.status(400).json({ message: 'Error adding software', error: error.message });
  }
}

// GET /all
export async function listSoftware(req, res) {
  try {
    const softwareItems = await softwareModel.find({}).populate('assignedTo').lean();
    res.status(200).json(softwareItems);
  } catch (error) {
    logger.error('Software list error', error);
    res.status(500).json({ message: 'Error fetching software', error: error.message });
  }
}

// GET /:id
export async function getSoftwareById(req, res) {
  try {
    const softwareItem = await softwareModel.findById(req.params._id).populate('assignedTo').lean();
    if (!softwareItem) return res.status(404).json({ message: 'Software not found' });
    res.status(200).json(softwareItem);
  } catch (error) {
    logger.error('Software fetch error', { softwareId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error fetching software', error: error.message });
  }
}

// PUT /update/:id
export async function updateSoftware(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updatedSoftware = await softwareModel.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true });
    if (!updatedSoftware) return res.status(404).json({ message: 'Software not found' });

    logger.info('Software updated', { softwareId: req.params._id });
    res.status(200).json({ message: 'Software updated successfully', software: updatedSoftware });
  } catch (error) {
    logger.error('Software update failed', { softwareId: req.params._id, error: error.message });
    res.status(400).json({ message: 'Error updating software', error: error.message });
  }
}

// DELETE /delete/:id
export async function deleteSoftware(req, res) {
  try {
    const deletedSoftware = await softwareModel.findByIdAndDelete(req.params._id);
    if (!deletedSoftware) return res.status(404).json({ message: 'Software not found' });

    logger.info('Software deleted', { softwareId: req.params._id });
    res.status(200).json({ message: 'Software deleted successfully' });
  } catch (error) {
    logger.error('Software deletion failed', { softwareId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error deleting software', error: error.message });
  }
}