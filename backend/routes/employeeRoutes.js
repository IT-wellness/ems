import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

import Employee from '../models/Employee';
import { getAccessToken } from '../utils/msgraph.js';
import { upload} from '../utils/multerConfig.js'
import { emailQueue } from '../queues/emailQueue.js';

const router = express.Router();

function mapFilesToDoc(files, payload) {
    const doc = { ...payload };
    const fileDict = Object.fromEntries(files.map(f => [f.fieldname, f.path]))

    if (fileDict.avatar) doc.avatarPath = fileDict.avatar;
    if (fileDict.passbook) doc.bank.passbookPath = fileDict.passbook;

    if (doc.educations?.length) {
        doc.educations = doc.educations.map((edu, idx) => ({
            ...edu,
            certificatePath: fileDict[`education_${idx}`] || edu.certificatePath
        }));
    }

    if (doc.organisations?.length) {
        doc.organisations = doc.organisations.map((org, idx) => ({
            ...org,
            experienceLetterUrl: fileDict[`organisation_${idx}`] || org.experienceLetterPath
        }));
    }
    return doc;
}

router.post('/add', upload.any(), async (req, res) => {
    try {
        const payload = JSON.parse(req.body.payload || '{}');

        // Step 1: Get Microsoft Access Token
        const token = await getAccessToken();

        // Step 2: Create User in Microsoft 365
        const msUser = {
            accountEnabled: true,
            displayName: `${payload.personal.firstName} ${payload.personal.lastName}`,
            mailNickname: `${payload.personal.firstName}${payload.personal.lastName}`.toLowerCase(),
            userPrincipalName: payload.contact.email,
            usageLocation: "CA",
            passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password: "StrongPassw0rd!"
            }
            };

        const { data: { id: msUserId } } = await axios.post(
            'https://graph.microsoft.com/v1.0/users',
            msUser,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
            );
        // Step 3: Assign License
        const licenseRequest = {
            addLicenses: [
                {
                skuId: process.env.SKU_ID
                }
            ],
            removeLicenses: []
            };

        await axios.post(
            `https://graph.microsoft.com/v1.0/users/${userId}/assignLicense`,
            licenseRequest,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
            );

    const docWithFiles = mapFilesToDoc(req.files, payload);

        // Step 4: Save Employee in MongoDB
    const employee = await Employee.create({
        ...docWithFiles,
        msUserId: msUserId
    });

    await emailQueue.add('sendWelcomeEmail', {
        to: payload.contact.email,
        name: `${payload.personal.firstname} ${payload.personal.lastname}`,
        tempPassword
    });

    return res.status(201).json({
      message: 'Employee created',
      employee: employee,
      microsoftTempPassword: tempPassword
    });

  } catch (err) {
    console.error(err?.response?.data || err);
    return res.status(500).json({ message: err.message || 'Failed to create employee', error: err.message });
  }
});

router.get('/all', async (req, res) => {
    try {
        const employees = await employeeModel.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});

router.get('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const employee = await employeeModel.findById(_id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
});

router.put('/update/:_id', async (req, res) => {
    const { _id } = req.params;
    const { firstName, lastName, email, phone, role, department } = req.body;

    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(_id, {
            firstName,
            lastName,
            email,
            phone,
            role,
            department
        }, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

export default router;