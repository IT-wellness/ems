import employeeModel from "../models/Employee.js";
import getAccessToken from '../utils/msgraph.js';
import axios from 'axios';

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
}

export const getEmployeeById = async (req, res) => {
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
}

export const updateEmployee = async (req, res) => {
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
}

export const deleteEmployee = async (req, res) => {
    const { _id } = req.params;

    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(_id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
}