// components/Software/SoftwareTable.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import SoftwareRow from './SoftwareRow';

const SoftwareTable = () => {
  const softwareList = useSelector(state => state.software.softwareList);

  return (
    <div className="bg-white rounded-xl shadow overflow-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Users/Departments</th>
            <th className="px-4 py-2">Permissions</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {softwareList.map(software => (
            <SoftwareRow key={software.id} software={software} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoftwareTable;
