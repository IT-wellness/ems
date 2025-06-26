import React from 'react';
import AuditLogTable from '../components/AuditLogs/AuditLogTable';

const AuditLogsPage = () => {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Audit Logs</h2>
            <AuditLogTable />
        </div>
    )
};

export default AuditLogsPage;