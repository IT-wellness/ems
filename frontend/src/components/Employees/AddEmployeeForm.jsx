import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, User, Mail, GraduationCap, RotateCcw, Banknote, Briefcase } from 'lucide-react'

const AddEmployeeForm = () => {
    const navigate = useNavigate();

    const [avatarFile, setAvatarFile] = useState(null);
    
    const [personal, setPersonal] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    maritalStatus: ''
  });

  const [contact, setContact] = useState({
    email: '',
    phone: '',
    emergencyContact: '',
    address: ''
  });

  const [educations, setEducations] = useState([
    {
      qualification: '',
      field: '',
      institution: '',
      yearOfCompletion: '',
      grade: '',
      certificateFile: null
    }
  ]);

  const [organisations, setOrganisations] = useState([
    {
      companyName: '',
      position: '',
      experienceYears: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      experienceLetter: null
    }
  ]);

  const [bank, setBank] = useState({
    bankName: '',
    accountNumber: '',
    ifsc: '',
    passbookFile: null
  });

  const [employment, setEmployment] = useState({
    employeeId: '',
    joinDate: '',
    employmentType: '',
    department: '',
    position: '',
    status: 'Active',
    manager: '',
    workLocation: '',
    workSchedule: ''
  });

  const handleState = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (setter, field) => (e) => {
    const file = e.target.files?.[0] ?? null;
    setter((prev) => ({ ...prev, [field]: file }));
  };

  const handleAddEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        qualification: '',
        field: '',
        institution: '',
        yearOfCompletion: '',
        grade: '',
        certificateFile: null
      }
    ]);
  };

  const handleRemoveEducation = (index) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setEducations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handleEducationFile = (index, e) => {
    const file = e.target.files?.[0] ?? null;
    setEducations((prev) => {
      const copy = [...prev];
      copy[index].certificateFile = file;
      return copy;
    });
  };

  const handleAddOrganisation = () => {
    setOrganisations((prev) => [
      ...prev,
      {
        companyName: '',
        position: '',
        experienceYears: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        experienceLetter: null
      }
    ]);
  };

  const handleRemoveOrganisation = (index) => {
    setOrganisations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOrgChange = (index, e) => {
    const { name, value } = e.target;
    setOrganisations((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handleOrgFile = (index, e) => {
    const file = e.target.files?.[0] ?? null;
    setOrganisations((prev) => {
      const copy = [...prev];
      copy[index].experienceLetter = file;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      avatarFile,
      personal,
      contact,
      educations,
      organisations,
      bank,
      employment
    };

    console.log('AddEmployeeForm → payload', payload);
    // TODO: dispatch to backend / redux
  };

    return (
        <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-7xl text-sm"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Personal Information                                             */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={User} text="Personal Information" />

      <div className="flex flex-col items-center gap-2 my-6">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {avatarFile ? (
            <img src={URL.createObjectURL(avatarFile)} alt="Avatar preview" className="object-cover w-full h-full" />
          ) : (
            <User className="w-16 h-16 text-gray-400" />
          )}
        </div>
        <label className="text-blue-600 font-medium cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          Upload Photo
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="First Name*" name="firstName" placeholder="Enter first name" value={personal.firstName} onChange={handleState(setPersonal)} />
        <Input label="Middle Name" name="middleName" placeholder="Enter middle name" value={personal.middleName} onChange={handleState(setPersonal)} />
        <Input label="Last Name*" name="lastName" placeholder="Enter last name" value={personal.lastName} onChange={handleState(setPersonal)} />
        <Input type="date" label="Date of Birth*" name="dob" value={personal.dob} onChange={handleState(setPersonal)} />
        <Select label="Gender*" name="gender" value={personal.gender} onChange={handleState(setPersonal)} options={["Male", "Female", "Other"]} />
        <Select label="Marital Status" name="maritalStatus" value={personal.maritalStatus} onChange={handleState(setPersonal)} options={["Single", "Married", "Divorced", "Widowed"]} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Contact Information                                              */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={Mail} text="Contact Information" className="mt-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Email*" name="email" placeholder="Enter email address" value={contact.email} onChange={handleState(setContact)} type="email" />
        <Input label="Phone*" name="phone" placeholder="Enter phone number" value={contact.phone} onChange={handleState(setContact)} />
        <Input label="Emergency Contact" name="emergencyContact" placeholder="Emergency contact number" value={contact.emergencyContact} onChange={handleState(setContact)} />
        <Textarea className="md:col-span-3" label="Address" name="address" placeholder="Enter full address" value={contact.address} onChange={handleState(setContact)} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Education Details                                                */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={GraduationCap} text="Education Details" className="mt-10" />

      {educations.map((edu, index) => (
        <div key={index} className="relative border rounded-xl p-5 mb-6 space-y-4">
          <h4 className="font-medium mb-2">Education #{index + 1}</h4>

          {/* Delete button */}
          {educations.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
            >
              <Trash size={18} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select label="Highest Qualification*" name="qualification" value={edu.qualification} onChange={(e) => handleEducationChange(index, e)} options={["High School", "Diploma", "Bachelor's", "Master's", "PhD"]} />
            <Input label="Field of Study*" name="field" placeholder="Enter field of study" value={edu.field} onChange={(e) => handleEducationChange(index, e)} />
            <Input label="Institution*" name="institution" placeholder="Enter institution name" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
            <Input label="Year of Completion*" name="yearOfCompletion" placeholder="Enter completion year" value={edu.yearOfCompletion} onChange={(e) => handleEducationChange(index, e)} />
            <Input label="Grade/CGPA" name="grade" placeholder="Enter grade or CGPA" value={edu.grade} onChange={(e) => handleEducationChange(index, e)} />
          </div>

          <FileDropzone
            label="Upload Certificate"
            accept=".pdf,.png,.jpg,.jpeg"
            file={edu.certificateFile}
            onFileChange={(e) => handleEducationFile(index, e)}
          />
        </div>
      ))}

      <AddAnotherButton label="Add Another Education" onClick={handleAddEducation} />

      {/* ---------------------------------------------------------------- */}
      {/* Previous Organization Details                                    */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={RotateCcw} text="Previous Organization Details" className="mt-10" />

      {organisations.map((org, index) => (
        <div key={index} className="relative border rounded-xl p-5 mb-6 space-y-4">
          <h4 className="font-medium mb-2">Previous Organization #{index + 1}</h4>

          {organisations.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveOrganisation(index)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800"
            >
              <Trash size={18} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Company Name" name="companyName" placeholder="Enter previous company name" value={org.companyName} onChange={(e) => handleOrgChange(index, e)} />
            <Input label="Position" name="position" placeholder="Enter previous position" value={org.position} onChange={(e) => handleOrgChange(index, e)} />
            <Input label="Experience (Years)" name="experienceYears" placeholder="Enter years of experience" value={org.experienceYears} onChange={(e) => handleOrgChange(index, e)} />
            <Input type="date" label="Start Date" name="startDate" value={org.startDate} onChange={(e) => handleOrgChange(index, e)} />
            <Input type="date" label="End Date" name="endDate" value={org.endDate} onChange={(e) => handleOrgChange(index, e)} />
            <Textarea label="Responsibilities" name="responsibilities" placeholder="Describe your key responsibilities" value={org.responsibilities} onChange={(e) => handleOrgChange(index, e)} />
          </div>

          <FileDropzone
            label="Upload Experience Letter"
            accept=".pdf,.png,.jpg,.jpeg"
            file={org.experienceLetter}
            onFileChange={(e) => handleOrgFile(index, e)}
          />
        </div>
      ))}

      <AddAnotherButton label="Add Another Organization" onClick={handleAddOrganisation} />

      {/* ---------------------------------------------------------------- */}
      {/* Bank Details & Documents                                         */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={Banknote} text="Bank Details & Documents" className="mt-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Bank Name*" name="bankName" placeholder="Enter bank name" value={bank.bankName} onChange={handleState(setBank)} />
        <Input label="Account Number*" name="accountNumber" placeholder="Enter account number" value={bank.accountNumber} onChange={handleState(setBank)} />
        <Input label="IFSC Code*" name="ifsc" placeholder="Enter IFSC code" value={bank.ifsc} onChange={handleState(setBank)} />
      </div>

      <FileDropzone
        label="Upload Passbook/Cancelled Cheque*"
        accept=".pdf,.png,.jpg,.jpeg"
        file={bank.passbookFile}
        onFileChange={handleFile(setBank, 'passbookFile')}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Employment Details                                               */}
      {/* ---------------------------------------------------------------- */}
      <SectionHeader Icon={Briefcase} text="Employment Details" className="mt-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Employee ID*" name="employeeId" placeholder="Enter employee ID" value={employment.employeeId} onChange={handleState(setEmployment)} />
        <Input type="date" label="Join Date*" name="joinDate" value={employment.joinDate} onChange={handleState(setEmployment)} />
        <Select label="Employment Type*" name="employmentType" value={employment.employmentType} onChange={handleState(setEmployment)} options={["Full-time", "Intern", "Contractor"]} />
        <Input label="Department*" name="department" placeholder="Enter department" value={employment.department} onChange={handleState(setEmployment)} />
        <Input label="Position*" name="position" placeholder="Enter position" value={employment.position} onChange={handleState(setEmployment)} />
        <Select label="Status*" name="status" value={employment.status} onChange={handleState(setEmployment)} options={["Active", "Inactive"]} />
        <Input label="Manager" name="manager" placeholder="Select manager" value={employment.manager} onChange={handleState(setEmployment)} />
        <Input label="Work Location" name="workLocation" placeholder="Enter work location" value={employment.workLocation} onChange={handleState(setEmployment)} />
        <Input label="Work Schedule" name="workSchedule" placeholder="Select schedule" value={employment.workSchedule} onChange={handleState(setEmployment)} />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Action buttons                                                   */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex justify-between items-center mt-12 flex-wrap gap-4">
        <p className="text-gray-500"><span className="font-medium">*</span> Fields marked with * are required</p>

        <div className="flex gap-3 ml-auto">
          <button
            type="button"
            onClick={() => navigate('/employees')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Save Employee
          </button>
        </div>
      </div>
    </form>
  );
};

/* ====================================================================== */
/* 🧩  Reusable small components                                          */
/* ====================================================================== */
const SectionHeader = ({ Icon, text, className = '' }) => (
  <h3 className={`text-lg font-semibold flex items-center gap-2 ${className}`}>
    <Icon size={18} className="text-blue-600" />
    {text}
  </h3>
);

const Input = ({ label, name, value, onChange, placeholder = '', type = 'text', className = '' }) => (
  <div className={className}>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options = [], className = '' }) => (
  <div className={className}>
    <label className="block text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, name, value, onChange, placeholder = '', className = '' }) => (
  <div className={className}>
    <label className="block text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
    />
  </div>
);

const FileDropzone = ({ label, accept, onFileChange, file }) => (
  <div className="mt-4">
    <p className="mb-2 text-gray-700 font-medium">{label}</p>
    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v-9A2.25 2.25 0 0 1 5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h.008v.008H3V12Zm18 0h.008v.008H21V12Zm-9 8.25h.008v.008H12v-.008Z" />
        </svg>
        {file ? (
          <span className="text-gray-600">{file.name}</span>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Upload file</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
          </>
        )}
      </div>
      <input type="file" accept={accept} className="hidden" onChange={onFileChange} />
    </label>
  </div>
);

const AddAnotherButton = ({ label, onClick }) => (
  <div className="flex justify-center my-4">
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
    >
      <Plus size={18} /> {label}
    </button>
  </div>
);

export default AddEmployeeForm;
