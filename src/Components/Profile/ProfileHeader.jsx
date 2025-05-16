import React from 'react';

const ProfileHeader = ({ profile }) => {
  return (
    <div className="flex items-center gap-6">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <div>
        <h2 className="text-xl font-semibold">{profile.name}</h2>
        <p className="text-gray-500">{profile.role}</p>
        <p className="text-gray-500">{profile.department}</p>
      </div>
    </div>
  );
};

export default ProfileHeader; 