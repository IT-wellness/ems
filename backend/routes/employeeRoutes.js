import express from 'express';
import axios from 'axios';
import crypto from 'crypto';

import Employee from '../models/Employee.js';
import getAccessToken from '../utils/msgraph.js';
import { upload } from '../utils/multerConfig.js';
// import { emailQueue } from '../utils/emailQueue.js';

const router = express.Router();

function mapFilesToDoc(files, payload) {
  const lookup = Object.fromEntries(files.map(f => [f.fieldname, f.path]));

  return {
    ...payload,
    avatarPath: lookup.avatar || payload.avatarPath,

    bank: payload.bank
      ? { ...payload.bank, passbookUrl: lookup.passbook || payload.bank.passbookUrl }
      : undefined,

    educations: (payload.educations || []).map((edu, i) => ({
      ...edu,
      certificatePath: lookup[`education_${i}`] || edu.certificatePath,
    })),

    organisations: (payload.organisations || []).map((org, i) => ({
      ...org,
      experienceLetterPath: lookup[`organisation_${i}`] || org.experienceLetterPath,
    })),
  };
}

router.post('/add', upload.any(), async (req, res) => {
  try {
    const payload = JSON.parse(req.body.payload || '{}');

    // console.log(payload);
    // Step 1: Get Microsoft Access Token
    const accessToken = await getAccessToken();
    const tempPassword = crypto.randomBytes(8).toString('base64');

    // Step 2: Create User in Microsoft 365
    const msUser = {
      accountEnabled: true,
      displayName: `${payload.personal.firstName} ${payload.personal.lastName}`,
      mailNickname: `${payload.personal.firstName}${payload.personal.lastName}`.toLowerCase(),
      userPrincipalName: payload.contact.email,
      usageLocation: "CA",
      passwordProfile: {
        forceChangePasswordNextSignIn: true,
        password: tempPassword,
      },
    };

    const { data: { id: msGraphUserId } } = await axios.post(
      'https://graph.microsoft.com/v1.0/users',
      msUser,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // // Step 3: Assign Microsoft License
    const licenseRequest = {
      addLicenses: [{ skuId: process.env.SKU_ID }],
      removeLicenses: [],
    };

    await axios.post(
      `https://graph.microsoft.com/v1.0/users/${msGraphUserId}/assignLicense`,
      licenseRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // // Step 4: Map uploaded files to doc
    // const docWithFiles = mapFilesToDoc(req.files, payload);

    // // Step 5: Save employee in DB
    // const employee = await Employee.create({
    //   ...docWithFiles,
    //   msGraphUserId,
    // });

    // // Step 6: Send Welcome Email
    // // await emailQueue.add('sendWelcomeEmail', {
    // //   to: payload.contact.email,
    // //   name: `${payload.personal.firstName} ${payload.personal.lastName}`,
    // //   tempPassword,
    // // });

    console.log("MS User ID: ", msGraphUserId);

    return res.status(201).json({
      message: 'Employee created',
    //   employee,
    //   microsoftTempPassword: tempPassword, // Consider removing this from response in production
    });

  } catch (err) {
    console.error(err?.response?.data || err);
    return res.status(500).json({
      message: 'Failed to create employee',
      error: err?.response?.data?.error?.message || err.message,
    });
  }
});

// GET /employees/all - Get all employees
router.get('/all', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// GET /employees/:_id - Get single employee
router.get('/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const employee = await Employee.findById(_id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
});

// PUT /employees/update/:_id - Update employee basic fields
router.put('/update/:_id', async (req, res) => {
  const { _id } = req.params;
  const updateData = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error: error.message });
  }
});

// DELETE /employees/delete/:id - Delete employee
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
});

export default router;
