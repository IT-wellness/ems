import mongoose from "mongoose";

const STATUSES = ['open', 'in-progress', 'resolved', 'closed', 'rejected'];
const PRIORITIES = ['low', 'medium', 'high', 'critical'];

const attachmentSchema = new mongoose.Schema({
  path: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const eventSchema = new mongoose.Schema({
  field: { type: String, enum: ['status', 'assignedTo', 'priority'], required: true },
  from: { type: String },
  to: { type: String },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  changedAt: { type: Date, default: Date.now }
}, { _id: false });

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: STATUSES,
        default: 'open'
    },
    priority: {
        type: String,
        required: true,
        enum: PRIORITIES,
        default: 'medium'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    validate: {
      validator: async function (value) {
        if (!value) return true;
        if (value.equals(this.createdBy)) return false;
        return await mongoose.model('Employee').exists({ _id: value });
      },
      message: 'Employee does not exist or is the ticket creator'
    }
  },
    dueDate: {
    type: Date
  },
    resolvedAt: {
      type: Date,
    },
    closedAt: {          // Added to record when ticket is closed
    type: Date
  },
      attachments: [attachmentSchema],
      comments: [commentSchema],
      events: [eventSchema],
  rejectionReason: {   // Optional reason when status=rejected
    type: String,
    trim: true
  },
  isEscalated: {       // Optional escalation flag
    type: Boolean,
    default: false
  },
  category: {          // Optional ticket classification
    type: String,
    trim: true
  },
  tags: [String]       // Optional tags for flexible filtering
},
  {
    timestamps: true,
  }
);

ticketSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (['resolved'].includes(this.status)) {
      this.resolvedAt = new Date();
      this.closedAt = undefined;
    } else if (this.status === 'closed') {
      if (!this.resolvedAt) this.resolvedAt = new Date();
      this.closedAt = new Date();
    } else {
      this.resolvedAt = undefined;
      this.closedAt = undefined;
    }
  }
  next();
});

// Indexes
ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });
ticketSchema.index({ assignedTo: 1 });
ticketSchema.index({ createdBy: 1 });
ticketSchema.index({ status: 1, priority: 1 });

export default mongoose.model('Ticket', ticketSchema);