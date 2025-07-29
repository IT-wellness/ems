import mongoose from "mongoose";

const STATUSES = ['active', 'inactive', 'expired'];

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
        sparse: true,
        trim: true,
        select: false
    },
    purchaseDate: {
    type: Date,
    required: true,
    validate: {
      validator: date => date <= new Date(),
      message: "Purchase date cannot be in the future"
    }
  },
    expiryDate: {
        type: Date,
        validate: {
        validator: function (value) {
          return !value || value > this.purchaseDate;
        },
        message: "Expiry date must be after purchase date",
      },
    },
    status: {
        type: String,
        required: true,
        enum: STATUSES,
        default: 'active'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        validate: {
        validator: async function (value) {
          if (!value) return true;
          const employeeExists = await mongoose.model("Employee").exists({ _id: value });
        return employeeExists != null;
        },
        message: "Employee does not exist",
      },
    },
  },
 {
    timestamps: true
});

softwareSchema.pre("save", function (next) {
  if (this.expiryDate && this.expiryDate < new Date()) {
    this.status = "expired";
  }
  next();
});

// Indexes
softwareSchema.index({ name: 1 });
softwareSchema.index({ vendor: 1 });
softwareSchema.index({ status: 1 });
softwareSchema.index({ assignedTo: 1 });

export default mongoose.model("Software", softwareSchema);