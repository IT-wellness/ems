import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from '../layouts/AppLayout';
import DetailLayout from '../layouts/DetailLayout';
import Dashboard from '../pages/Dashboard'
import EmployeePage from '../pages/EmployeePage'
import AssetPage from '../pages/AssetsPage'
import EmployeeDetailsPage from '../pages/EmployeeDetailPage';
import AssignedAssets from '../components/Employees/EmployeeDetails/AssignedAssets';
import EmployeeLicenses from '../components/Employees/EmployeeDetails/Licenses'
import EmployeeTickets from '../components/Employees/EmployeeDetails/Tickets'
import Licenses from '../components/Employees/EmployeeDetails/Licenses';
import Tickets from '../components/Employees/EmployeeDetails/Tickets';
import LoginPage from '../components/LoginPage';
import SoftwarePage from '../pages/SoftwarePage';
import AuditLogsPage from '../pages/AuditLogsPage';
import IntegrationsPage from '../pages/IntegrationsPage';
import SettingsPage from '../pages/SettingsPage';
import AddEmployeePage from '../pages/AddEmployeePage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />

                <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employees" element={<EmployeePage />} />
                    <Route path="/employees/add" element={<AddEmployeePage />} />
                    <Route path="/assets" element={<AssetPage />} />
                    <Route path="/software" element={<SoftwarePage />} />
                    <Route path="/licenses" element={<Licenses />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/audit-logs" element={<AuditLogsPage />} />
                    <Route path="integrations" element={<IntegrationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    
                </Route>

                <Route element={<DetailLayout />}>
                    <Route path="/employees/:id" element={<EmployeeDetailsPage />} >
                        <Route index element={<Navigate to="assets" replace />} />
                        <Route path="assets" element={<AssignedAssets />} />
                        <Route path="licenses" element={<EmployeeLicenses />} />
                        <Route path="tickets" element={<EmployeeTickets />} />
                    </Route>
                </Route>

                <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;