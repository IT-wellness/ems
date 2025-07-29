import mongoose from "mongoose";

const STATUSES = ["enabled", "disabled", "disconnected"];

const integrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  provider: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: String,
    enum: STATUSES,
    default: "enabled",
    required: true
  },
  connectedAt: {
    type: Date
  },
  lastSyncedAt: {
    type: Date
  },
  managedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    }
  ],
  allowedRoles: [
    {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true
    }
  ],
  oauth: {
    refreshToken: { type: String, select: false },
    accessToken: { type: String, select: false },
    expiry: { type: Date }
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

integrationSchema.index({ provider: 1 });
integrationSchema.index({ status: 1 });
integrationSchema.index({ allowedRoles: 1 });

export default mongoose.model("Integration", integrationSchema);