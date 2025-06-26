import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['laptop', 'desktop', 'server', 'network device', 'peripheral'],
        trim: true
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    serialNumber: {
        type: String
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    warrantyExpiryDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        enum: ['available', 'in use', 'maintenance', 'retired'],
        default: 'available'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
}, {
    timestamps: true
});

const hardwareModel = mongoose.model('Hardware', hardwareSchema);
export default hardwareModel;