import mongoose from 'mongoose';
const { Schema, Types } = mongoose;

const educationSchema = new Schema({
  qualification: { type: String, required: true },
  field:         { type: String, required: true },
  institution:   { type: String, required: true },
  yearOfCompletion: { type: Number, required: true },
  grade: String,
  certificatePath: String
}, { _id: false });

const organisationSchema = new Schema({
  companyName:     String,
  position:        String,
  experienceYears: Number,
  startDate:       Date,
  endDate:         Date,
  responsibilities:String,
  experienceLetterPath: String
}, { _id: false });

const bankSchema = new Schema({
  bankName:      { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc:          { type: String, required: true },
  passbookUrl:   { type: String, required: true }
}, { _id: false });

const personalSchema = new Schema({
  firstName:     { type: String, required: true },
  middleName:    String,
  lastName:      { type: String, required: true },
  dob:           { type: Date,   required: true },
  gender:        { type: String, enum: ['Male','Female','Other'], required: true },
  maritalStatus: { type: String, enum: ['Single','Married','Divorced','Widowed'] },

  photoPath: String,
  resumePath: String,
  idProofPath: String
}, { _id: false });

const contactSchema = new Schema({
  email:            { type: String, required: true, lowercase: true, unique: true },
  phone:            { type: String, required: true },
  emergencyContact: String,
  address:          String
}, { _id: false });

const employmentSchema = new Schema({
  employeeId:     { type: String, required: true, unique: true },
  joinDate:       { type: Date,   required: true },
  employmentType: { type: String, enum: ['Full-time','Intern','Contractor'], required: true },
  department:     { type: Types.ObjectId, ref: 'Department', required: true },
  position:       { type: String, required: true },
  status:         { type: String, enum: ['Active','Inactive'], default: 'Active' },
  manager:        { type: Types.ObjectId, ref: 'Employee' },
  workLocation:   String,
  workSchedule:   String
}, { _id: false });

const employeeSchema = new Schema({
  avatarPath:  String,

  personal:   personalSchema,
  contact:    contactSchema,
  educations: [educationSchema],
  organisations: [organisationSchema],
  bank:       bankSchema,
  employment: employmentSchema,

  msGraphUserId: { type: String, index: true },
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);