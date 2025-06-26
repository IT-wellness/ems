import express from 'express';
import licenseModel from '../models/Licence.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { softwareId, licenseKey, purchaseDate, expiryDate, assignedTo } = req.body;

    try {
        const newLicense = new licenseModel({
            softwareId,
            licenseKey,
            purchaseDate,
            expiryDate,
            assignedTo
        });

        await newLicense.save();
        res.status(201).json({ message: 'License added successfully', license: newLicense });
    } catch (error) {
        res.status(400).json({ message: 'Error adding license', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const licenses = await licenseModel.find({}).populate('softwareId assignedTo');
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching licenses', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const license = await licenseModel.findById(id).populate('softwareId assignedTo');
        if (!license) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json(license);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching license', error: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { softwareId, licenseKey, purchaseDate, expiryDate, assignedTo } = req.body;

    try {
        const updatedLicense = await licenseModel.findByIdAndUpdate(id, {
            softwareId,
            licenseKey,
            purchaseDate,
            expiryDate,
            assignedTo
        }, { new: true });

        if (!updatedLicense) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License updated successfully', license: updatedLicense });
    } catch (error) {
        res.status(400).json({ message: 'Error updating license', error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLicense = await licenseModel.findByIdAndDelete(id);
        if (!deletedLicense) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting license', error: error.message });
    }
});

export default router;