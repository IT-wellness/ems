// components/Software/SoftwareRow.jsx
import React from 'react';

const SoftwareRow = ({ software }) => {
  const { name, users, permissions, description } = software;

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 font-medium">{name}</td>
      <td className="px-4 py-2">{users.join(', ')}</td>
      <td className="px-4 py-2">{permissions.join(', ')}</td>
      <td className="px-4 py-2">{description}</td>
    </tr>
  );
};

export default SoftwareRow;
