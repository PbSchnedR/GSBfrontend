import React from 'react';

const DashboardAdminList = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {users.map((user, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-5 flex flex-col items-center border border-gray-100">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">{user.name}</h3>
          <a href={user.link} className="text-sm text-purple-600 font-medium hover:underline mb-1">{user.linkLabel}</a>
          <p className="text-xs text-gray-500 text-center mb-2">{user.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardAdminList; 