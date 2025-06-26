import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    version: {
        type: String,
        required: true,
        trim: true
    },
    vendor: {
        type: String,
        required: true,
        trim: true
    },
    licenseKey: {
        type: String,
        unique: true,
        trim: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'expired'],
        default: 'active'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
});

const softwareModel = mongoose.model('Software', softwareSchema);
export default softwareModel;