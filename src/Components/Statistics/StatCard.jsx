import React from 'react';

const StatCard = ({ icon, title, value, change, changeText, changeColor }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gray-100 rounded-lg p-2">
          {icon}
        </div>
        <span className={`text-sm font-medium ${changeColor}`}>
          {change} {changeText}
        </span>
      </div>
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard; 