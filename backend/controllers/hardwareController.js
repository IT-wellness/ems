import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';
import hardwareModel from '../models/Hardware.js';

// POST /add
export async function addHardware(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newHardware = new hardwareModel(req.body);
    await newHardware.save();

    logger.info('Hardware added', {
      hardwareId: newHardware._id,
      type: newHardware.type,
      status: newHardware.status
    });

    res.status(201).json({
      message: 'Hardware added successfully',
      hardware: newHardware
    });
  } catch (error) {
    logger.error('Hardware creation failed', {
      error: error.message,
      payload: req.body
    });
    res.status(400).json({
      message: 'Error adding hardware',
      error: error.message
    });
  }
}

// GET /all
export async function listHardware(req, res) {
  try {
    const { status, type, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { model: new RegExp(search, 'i') },
        { serialNumber: new RegExp(search, 'i') }
      ];
    }

    const hardwareItems = await hardwareModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await hardwareModel.countDocuments(query);

    res.status(200).json({
      data: hardwareItems,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    logger.error('Hardware list error', error);
    res.status(500).json({
      message: 'Error fetching hardware',
      error: error.message
    });
  }
}

// GET /:_id
export async function getHardwareById(req, res) {
  try {
    const hardwareItem = await hardwareModel.findById(req.params._id).lean();
    if (!hardwareItem) {
      return res.status(404).json({ message: 'Hardware not found' });
    }
    res.status(200).json(hardwareItem);
  } catch (error) {
    logger.error('Hardware fetch error', {
      hardwareId: req.params._id,
      error: error.message
    });
    res.status(500).json({
      message: 'Error fetching hardware',
      error: error.message
    });
  }
}

// PUT /update/:_id
export async function updateHardware(req, res) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedHardware = await hardwareModel.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true, runValidators: true, session }
    );

    if (!updatedHardware) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Hardware not found' });
    }

    await session.commitTransaction();
    logger.info('Hardware updated', { hardwareId: req.params._id });
    res.status(200).json({
      message: 'Hardware updated successfully',
      hardware: updatedHardware
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error('Hardware update failed', {
      hardwareId: req.params._id,
      error: error.message
    });
    res.status(400).json({
      message: 'Error updating hardware',
      error: error.message
    });
  } finally {
    session.endSession();
  }
}

// DELETE /delete/:id
export async function deleteHardware(req, res) {
  try {
    const deletedHardware = await hardwareModel.findByIdAndDelete(req.params._id);
    if (!deletedHardware) {
      return res.status(404).json({ message: 'Hardware not found' });
    }

    logger.info('Hardware deleted', { hardwareId: req.params._id });
    res.status(200).json({ message: 'Hardware deleted successfully' });
  } catch (error) {
    logger.error('Hardware deletion failed', {
      hardwareId: req.params._id,
      error: error.message
    });
    res.status(500).json({
      message: 'Error deleting hardware',
      error: error.message
    });
  }
}