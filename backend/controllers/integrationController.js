import { validationResult } from 'express-validator';
import Integration from '../models/Integration.js';
import logger from '../utils/logger.js';

// POST /add
export async function addIntegration(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newIntegration = new Integration(req.body);
    await newIntegration.save();

    logger.info('Integration created', { integrationId: newIntegration._id, name: newIntegration.name });
    res.status(201).json({ message: 'Integration added successfully', integration: newIntegration });
  } catch (error) {
    logger.error('Integration creation failed', { error: error.message });
    res.status(400).json({ message: 'Error adding integration', error: error.message });
  }
}

// GET /all
export async function listIntegrations(req, res) {
  try {
    const {
      page = 1,
      limit = 10,
      search = ''
    } = req.query;

    const query = { isDeleted: false };
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { provider: searchRegex },
        { description: searchRegex }
      ];
    }

    // Apply role-based filtering: only return integration if user role is in allowedRoles
    // For admins, return all; for others, filter
    if (req.user.role !== 'admin') {
      query.allowedRoles = req.user.role;
    }

    const integrations = await Integration.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('managedBy', 'personal.firstName personal.lastName contactEmail')
      .lean();

    const count = await Integration.countDocuments(query);

    res.status(200).json({
      data: integrations,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    logger.error('Integration list fetch failed', { error: error.message });
    res.status(500).json({ message: 'Error fetching integrations', error: error.message });
  }
}

// GET /:id
export async function getIntegrationById(req, res) {
  try {
    const integration = await Integration.findById(req.params._id)
      .populate('managedBy', 'personal.firstName personal.lastName contactEmail')
      .lean();

    if (!integration || integration.isDeleted) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    // RBAC: check if user role is allowed to view this integration
    if (req.user.role !== 'admin' && !integration.allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(integration);
  } catch (error) {
    logger.error('Integration fetch failed', { integrationId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error fetching integration', error: error.message });
  }
}

// PUT /update/:id
export async function updateIntegration(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const integration = await Integration.findById(req.params._id);
    if (!integration || integration.isDeleted) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    Object.assign(integration, req.body);
    await integration.save();

    logger.info('Integration updated', { integrationId: integration._id });
    res.status(200).json({ message: 'Integration updated successfully', integration });
  } catch (error) {
    logger.error('Integration update failed', { integrationId: req.params._id, error: error.message });
    res.status(400).json({ message: 'Error updating integration', error: error.message });
  }
}

// DELETE /delete/:id
export async function deleteIntegration(req, res) {
  try {
    const integration = await Integration.findById(req.params._id);
    if (!integration || integration.isDeleted) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    // Soft delete
    integration.isDeleted = true;
    await integration.save();

    logger.info('Integration soft-deleted', { integrationId: integration._id });
    res.status(200).json({ message: 'Integration deleted successfully' });
  } catch (error) {
    logger.error('Integration deletion failed', { integrationId: req.params._id, error: error.message });
    res.status(500).json({ message: 'Error deleting integration', error: error.message });
  }
}