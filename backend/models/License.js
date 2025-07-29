import mongoose from "mongoose";

const LICENSE_TYPES = ["commercial", "open-source", "freeware", "shareware"];
const STATUSES = ["active", "inactive", "expired"];

const licenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: LICENSE_TYPES,
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
        trim: true,
        sparse: true,
        select: false,
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
          const employee = await mongoose.model("Employee").exists({ _id: value });
          return employee;
        },
        message: "Employee does not exist",
      },
    },
  },
  {
    timestamps: true,
  }
);

licenseSchema.pre("save", function (next) {
  if (this.expiryDate && this.expiryDate < new Date()) {
    this.status = "expired";
  }
  next();
});

licenseSchema.index({ type: 1 });
licenseSchema.index({ status: 1 });
licenseSchema.index({ vendor: 1 });
licenseSchema.index({ assignedTo: 1 });

export default mongoose.model("License", licenseSchema);