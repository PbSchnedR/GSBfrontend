import React from 'react';

const BillInfo = ({ montant, type, description }) => {
  return (
    <>
      {/* Montant & Type */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow p-5 mb-6 border border-gray-100">
        <span className="text-2xl font-bold text-gray-900">{montant}</span>
        <span className="text-purple-600 font-medium text-lg mt-2 sm:mt-0">{type}</span>
      </div>
      {/* Description */}
      <div className="w-full bg-white rounded-xl shadow p-5 border border-gray-100">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Description</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </>
  );
};

export default BillInfo; 