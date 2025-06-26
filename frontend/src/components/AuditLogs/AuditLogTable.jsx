import React from 'react';

const dummyLogs = [
    { id: 1, user: 'Sawan Khanna', action: 'Created new employee', timestamp: '2025-06-18 10:32 AM' },
    { id: 2, user: 'Vijay Ramanan', action: 'Updated asset details', timestamp: '2025-06-18 09:45 AM' },
    { id: 3, user: 'Admin', action: 'Deleted license', timestamp: '2025-06-17 04:15 PM' },
];

const AuditLogTable = () => {
    return (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">User</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Action</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {dummyLogs.map(log => (
                        <tr key={log.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-800">{log.user}</td>
                            <td className="px-6 py-4 text-gray-700">{log.action}</td>
                            <td className="px-6 py-4 text-gray-500">{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditLogTable;