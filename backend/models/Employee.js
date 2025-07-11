import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

// EDUCATION
const educationSchema = new Schema({
  qualification:     { type: String, required: true },
  field:             { type: String, required: true },
  institution:       { type: String, required: true },
  yearOfCompletion:  { type: Number, required: true },
  grade:             { type: String },
  certificatePath:   { type: String }, // local file path
}, { _id: false });

// ORGANISATION
const organisationSchema = new Schema({
  companyName:           { type: String },
  position:              { type: String },
  experienceYears:       { type: Number },
  startDate:             { type: Date },
  endDate:               { type: Date },
  responsibilities:      { type: String },
  experienceLetterPath:  { type: String }, // local file path
}, { _id: false });

// BANK
const bankSchema = new Schema({
  bankName:      { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc:          { type: String, required: true },
  passbookPath:  { type: String, required: true } // renamed from passbookUrl
}, { _id: false });

// PERSONAL
const personalSchema = new Schema({
  firstName:     { type: String, required: true },
  middleName:    { type: String },
  lastName:      { type: String, required: true },
  dob:           { type: Date, required: true },
  gender:        { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  photoPath:     { type: String }, // local image
  resumePath:    { type: String },
  idProofPath:   { type: String }
}, { _id: false });

// CONTACT
const contactSchema = new Schema({
  email:            { type: String, required: true, lowercase: true },
  phone:            { type: String, required: true },
  emergencyContact: { type: String },
  address:          { type: String }
}, { _id: false });

// EMPLOYMENT
const employmentSchema = new Schema({
  employeeId:     { type: String, required: true, unique: true },
  joinDate:       { type: Date, required: true },
  employmentType: { type: String, enum: ['Full-time', 'Intern', 'Contractor'], required: true },
  department:     { type: Types.ObjectId, ref: 'Department', required: true },
  position:       { type: String, required: true },
  status:         { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  manager:        { type: Types.ObjectId, ref: 'Employee' },
  workLocation:   { type: String },
  workSchedule:   { type: String }
}, { _id: false });

// EMPLOYEE
const employeeSchema = new Schema({
  avatarPath: { type: String }, // photo file

  personal:     personalSchema,
  contact:      contactSchema,
  educations:   [educationSchema],
  organisations:[organisationSchema],
  bank:         bankSchema,
  employment:   employmentSchema,

  contactEmail: { type: String, required: true, lowercase: true, unique: true }, // ensure unique email at root

  msGraphUserId: { type: String, index: true },
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
