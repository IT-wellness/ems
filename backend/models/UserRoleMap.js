import mongoose from 'mongoose';

const userRoleMapSchema = new mongoose.Schema({
  msGraphUserId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  role: { type: String, enum: ['admin', 'manager', 'employee'], required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('UserRoleMap', userRoleMapSchema);