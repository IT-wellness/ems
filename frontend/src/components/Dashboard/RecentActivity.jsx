import React from 'react';
import RecentActivityItem from './RecentActivityItem';
import { Plus, Monitor, AlertTriangle } from 'lucide-react';

const activityData = [
    {
        icon: <Plus size={16} />,
        iconBg: 'bg-green-100 text-green-600',
        title: 'New employee added',
        subtitle: 'Mayur joined the Marketing team',
        timestamp: '2 hours ago',
    },
    {
        icon: <Monitor size={16} />,
        iconBg: 'bg-blue-100 text-blue-600',
        title: 'Asset assigned',
        subtitle: 'MacBook Pro assigned to Neeraj',
        timestamp: '4 hours ago',
    },
    {
        icon: <AlertTriangle size={16} />,
        iconBg: 'bg-yellow-100 text-yellow-600',
        title: 'License expiring soon',
        subtitle: 'Adobe Creative Suite expires in 15 days',
        timestamp: '1 day ago',
    },
];

const RecentActivity = () => {
    return (
        <div className='bg-white p-6 rounded-lg shadow'>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
            </h2>
                {activityData.length === 0 ? (
                    <p className='text-sm text-gray-500'>No recent activity.</p>
                ) : (
                    <ul className='space-y-5'>
                    {activityData.map((item, index) => (
                    <RecentActivityItem
                        key={index}
                        icon={item.icon}
                        iconBg={item.iconBg}
                        title={item.title}
                        subtitle={item.subtitle}
                        timestamp={item.timestamp}
            />
                ))}
            </ul>
                )}
        </div>
    )
};

export default RecentActivity;