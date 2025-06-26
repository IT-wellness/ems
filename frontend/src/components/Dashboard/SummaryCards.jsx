import React from 'react';
import SummaryCard from './SummaryCard';
import {
    Users,
    Box,
    BadgeAlert,
    LifeBuoy
} from 'lucide-react';

const cardData = [
    {
        title: 'Total Employees',
        value: 247,
        icon: <Users />,
        label: 'Total',
        color: { bg: 'bg-blue-500' },
        breakdowns: [
            { text: '235 Active', color: 'text-green-600', dot: 'bg-green-500' },
            { text: '12 Inactive', color: 'text-gray-500', dot: 'bg-gray-400' },
        ],
    },
    {
        title: 'Total Assets',
        value: 1342,
        icon: <Box />,
        label: 'Assets',
        color: { bg: 'bg-purple-500' },
        breakdowns: [
            { text: '892 Available', color: 'text-green-600', dot: 'bg-green-500' },
            { text: '450 Assigned', color: 'text-blue-600', dot: 'bg-blue-500' },
        ],
    },
    {
        title: 'Expiring Licenses',
        value: 23,
        icon: <BadgeAlert />,
        label: 'Urgent',
        color: { bg: 'bg-yellow-500' },
        breakdowns: [
            { text: 'Next 30 days', color: 'text-red-500', dot: 'bg-red-500' },
            { text: 'Action needed', color: 'text-gray-500', dot: 'bg-gray-400' },
        ],
    },
    {
        title: 'Open Tickets',
        value: 47,
        icon: <LifeBuoy />,
        label: 'Active',
        color: { bg: 'bg-rose-300' },
        breakdowns: [
            { text: '8 Critical', color: 'text-red-600', dot: 'bg-red-500' },
            { text: '39 Normal', color: 'text-orange-500', dot: 'bg-orange-400' },
        ],
    },
];

const SummaryCards = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {cardData.map((card, index) => (
                <SummaryCard
                    key={index}
                    {...card}
                />
            ))}
        </div>
    );
};

export default SummaryCards;
