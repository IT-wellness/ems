import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmployeeTabs from '../components/Employees/EmployeeDetails/EmployeeTabs';
import EmployeeInfoCard from '../components/Employees/EmployeeDetails/EmployeeInfoCard';

const EmployeeDetailsPage = () => {
    const { id } = useParams();
    const employees = useSelector((state) => state.employees.list)

    const employee = employees.find((emp) => emp.id === id)

    if (!employee) {
        return (
            <div className='p-6 text-red-600'>
                Employee with ID <strong>{id}</strong> not found.
            </div>
        )
    }

    return (
        <div className='flex flex-col md:flex-row gap-6 bg-gray-50 min-h-screen'>
            <EmployeeInfoCard employee={employee} />
            <div className='flex-1'>
                <div className='mb-4'>
                    <h1 className="text-2xl font-semibold">Employee Details - ID: {employee.id}</h1>
                </div>
                <EmployeeTabs />
                <div className='mt-4'>
                    <Outlet />
                </div>
                </div>
        </div>
    );
};

export default EmployeeDetailsPage;
