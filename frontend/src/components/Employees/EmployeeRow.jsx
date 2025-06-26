import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import classNames from "classnames";

const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Inactive: 'bg-gray-100 text-gray-500',
};

const EmployeeRow = ({ employee, onEdit, onDelete, onView, isSelected, onSelect }) => {
    const {
        id,
        name,
        email,
        department,
        role,
        status,
        avatar
    } = employee;

    const formattedStatus = status
        ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        : 'Unknown';

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                    aria-label={`Select ${name}`}
                />
            </td>
            <td className="px-4 py-3 flex items-center space-x-3">
                <img
                    src={avatar || '/default-avatar.png'}
                    alt={name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => { e.target.src = '/default-avatar.png'; }}
                />
                <span className="font-medium text-gray-800 whitespace-nowrap">{name}</span>
            </td>
            <td className="px-4 py-3 text-gray-700 truncate">{email}</td>
            <td className="px-4 py-3 text-gray-700">{department}</td>
            <td className="px-4 py-3 text-gray-700">{role}</td>

            <td className="px-4 py-3">
                <span
                    className={classNames(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        statusColors[status] || 'bg-gray-100 text-gray-500'
                    )}>
                    {formattedStatus}
                </span>
            </td>

            <td className="px-4 py-3 space-x-3 text-gray-500 flex items-center">
                <button
                    onClick={() => onView(employee)}
                    aria-label={`View ${name}`}
                    title="View"
                    className="hover:text-blue-600"
                >
                    <Eye size={16} />
                </button>
                <button
                    onClick={() => onEdit(employee)}
                    aria-label={`Edit ${name}`}
                    title="Edit"
                    className="hover:text-yellow-600"
                >
                    <Pencil size={16} />
                </button>
                <button
                    onClick={() => onDelete(employee)}
                    aria-label={`Delete ${name}`}
                    title="Delete"
                    className="hover:text-red-600"
                >
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default EmployeeRow;
