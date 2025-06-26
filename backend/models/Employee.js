import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'employee'],
        default: 'employee'
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }},
    {
        timestamops: true
    }
);

const employeeModel = mongoose.model('Employee', employeeSchema);
export default employeeModel;