import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    const { firstName, lastName, email, password, phone, role, department } = req.body;
    try {
        // Step 1: Get Microsoft Access Token
        const token = await getAccessToken();

        // Step 2: Create User in Microsoft 365
        const msUser = {
            accountEnabled: true,
            displayName: `${firstName} ${lastName}`,
            mailNickname: firstName.toLowerCase() + lastName.toLowerCase(),
            userPrincipalName: email,
            usageLocation: "CA",
            passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password: password || "StrongPassw0rd!"
            }
            };

        const userResponse = await axios.post(
            'https://graph.microsoft.com/v1.0/users',
            msUser,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            }
            );

        const userId = userResponse.data.id;
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

        // Step 4: Save Employee in MongoDB
        const newEmployee = new employeeModel({
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
            department
            });

        await newEmployee.save();

        res.status(201).json({
            message: 'Employee created in Microsoft and saved in DB',
            employee: newEmployee,
            msUserId: userId
            });

    } catch (error) {
        console.error(error?.response?.data || error.message);
        res.status(500).json({ message: 'Error creating employee', error: error.message });
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