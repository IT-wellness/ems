import express from 'express';
import softwareModel from '../models/Software.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, version, vendor, licenseType, purchaseDate, expiryDate, assignedTo } = req.body;

    try {
        const newSoftware = new softwareModel({
            name,
            version,
            vendor,
            licenseType,
            purchaseDate,
            expiryDate,
            assignedTo
        });

        await newSoftware.save();
        res.status(201).json({ message: 'Software added successfully', software: newSoftware });
    } catch (error) {
        res.status(400).json({ message: 'Error adding software', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const softwareItems = await softwareModel.find({}).populate('assignedTo');
        res.status(200).json(softwareItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching software', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const softwareItem = await softwareModel.findById(id).populate('assignedTo');
        if (!softwareItem) {
            return res.status(404).json({ message: 'Software not found' });
        }
        res.status(200).json(softwareItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching software', error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, version, vendor, licenseType, purchaseDate, expiryDate, assignedTo } = req.body;

    try {
        const updatedSoftware = await softwareModel.findByIdAndUpdate(id, {
            name,
            version,
            vendor,
            licenseType,
            purchaseDate,
            expiryDate,
            assignedTo
        }, { new: true });

        if (!updatedSoftware) {
            return res.status(404).json({ message: 'Software not found' });
        }
        res.status(200).json({ message: 'Software updated successfully', software: updatedSoftware });
    } catch (error) {
        res.status(400).json({ message: 'Error updating software', error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSoftware = await softwareModel.findByIdAndDelete(id);
        if (!deletedSoftware) {
            return res.status(404).json({ message: 'Software not found' });
        }
        res.status(200).json({ message: 'Software deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting software', error: error.message });
    }
});

export default router;