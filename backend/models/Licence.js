import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['commercial', 'open-source', 'freeware', 'shareware'],
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

const licenseModel = mongoose.model('License', licenseSchema);
export default licenseModel;