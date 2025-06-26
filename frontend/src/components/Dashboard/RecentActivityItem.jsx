import React from 'react';

const RecentActivityItem = ({ icon, iconBg, title, subtitle, timestamp }) => {
  return (
    <li className="flex justify-between items-start">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}>
          {React.cloneElement(icon, { size: 16 })}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">{timestamp}</span>
    </li>
  );
};

export default RecentActivityItem;
