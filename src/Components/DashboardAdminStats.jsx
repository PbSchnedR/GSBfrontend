import React from 'react';

const DashboardAdminStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">{stat.label}</span>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <span className="text-3xl font-bold">{stat.value}</span>
            {stat.change && (
              <span className="text-green-600 text-sm font-semibold">{stat.change} <span className="text-gray-400 font-normal">{stat.changeLabel}</span></span>
            )}
            {stat.avatars && (
              <div className="flex -space-x-2">
                {stat.avatars.map((avatar, i) => (
                  <img key={i} src={avatar} alt="avatar" className="w-7 h-7 rounded-full border-2 border-white" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdminStats; 