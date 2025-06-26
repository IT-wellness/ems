import React from 'react';

const SummaryCard = ({ title, value, icon, label, breakdowns = [], color }) => {
  return (
    <div className="bg-white rounded-xl border p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${color.bg}`}>
          {React.cloneElement(icon, { size: 20, className: 'text-white' })}
        </div>
        {label && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
            {label}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>

        {breakdowns.length > 0 && (
          <div className="flex justify-between mt-3 text-sm">
            {breakdowns.map((b, i) => (
              <span key={i} className={`flex items-center gap-1 text-xs ${b.color}`}>
                <span className={`w-2 h-2 rounded-full ${b.dot}`}></span>
                {b.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
