import express from 'express';
import hardwareModel from '../models/Hardware.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, type, brand, model, serialNumber, purchaseDate, warrantyExpiryDate, status, assignedTo } = req.body;

    try {
        const newHardware = new hardwareModel({
            name,
            type,
            brand,
            model,
            serialNumber,
            purchaseDate,
            warrantyExpiryDate,
            status,
            assignedTo
        });

        await newHardware.save();
        res.status(201).json({ message: 'Hardware added successfully', hardware: newHardware });
    } catch (error) {
        res.status(400).json({ message: 'Error adding hardware', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const hardwareItems = await hardwareModel.find({});
        res.status(200).json(hardwareItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hardware', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const hardwareItem = await hardwareModel.findById(id);
        if (!hardwareItem) {
            return res.status(404).json({ message: 'Hardware not found' });
        }
        res.status(200).json(hardwareItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hardware', error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type, brand, model, serialNumber, purchaseDate, warrantyExpiryDate, status, assignedTo } = req.body;

    try {
        const updatedHardware = await hardwareModel.findByIdAndUpdate(id, {
            name,
            type,
            brand,
            model,
            serialNumber,
            purchaseDate,
            warrantyExpiryDate,
            status,
            assignedTo
        }, { new: true });

        if (!updatedHardware) {
            return res.status(404).json({ message: 'Hardware not found' });
        }
        res.status(200).json({ message: 'Hardware updated successfully', hardware: updatedHardware });
    } catch (error) {
        res.status(400).json({ message: 'Error updating hardware', error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedHardware = await hardwareModel.findByIdAndDelete(id);
        if (!deletedHardware) {
            return res.status(404).json({ message: 'Hardware not found' });
        }
        res.status(200).json({ message: 'Hardware deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hardware', error: error.message });
    }
});

export default router;