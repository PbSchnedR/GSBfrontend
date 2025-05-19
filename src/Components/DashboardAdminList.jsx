import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';

const DashboardAdminList = ({ users }) => {
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    navigate(`/admin/users/${user.name}/bills`);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user, idx) => (
          <div
            key={idx}
            onClick={() => handleUserClick(user)}
            className="bg-white rounded-lg shadow p-5 flex flex-col items-center border border-gray-100 
                     cursor-pointer transition-all duration-300 ease-in-out
                     hover:shadow-lg hover:scale-[1.02] hover:border-purple-200
                     active:scale-[0.98]"
          >
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-1">{user.name}</h3>
            <a href={user.link} className="text-sm text-purple-600 font-medium hover:underline mb-1">{user.linkLabel}</a>
            <p className="text-xs text-gray-500 text-center mb-2">{user.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardAdminList; 