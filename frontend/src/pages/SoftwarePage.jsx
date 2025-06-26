// pages/SoftwarePage.jsx
import React from 'react';
import SoftwareTable from '../components/Software/SoftwareTable';

const SoftwarePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Software & Applications</h1>
      <SoftwareTable />
    </div>
  );
};

export default SoftwarePage;
