import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const tabs = [
    { name: 'Assets', path: 'assets' },
    { name: 'Licenses', path: 'licenses' },
    { name: 'Tickets', path: 'tickets' }
];

const EmployeeTabs = () => {
    const { id } = useParams();

    if (!id) return null; // defensive fallback

    return (
        <div className="border-b mb-4">
            <div className="overflow-x-auto">
                <nav className="flex space-x-4 min-w-max" aria-label="Employee sub navigation">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={`/employees/${id}/${tab.path}`}
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                                    isActive
                                        ? 'text-blue-600 border-blue-600'
                                        : 'text-gray-600 border-transparent hover:border-gray-300'
                                }`
                            }
                            end
                        >
                            {tab.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default EmployeeTabs;
