import React from 'react';

const BillDetailsSidebar = ({ dateNote, dateCreation }) => {
  return (
    <div className="w-full md:w-64 bg-white rounded-xl shadow p-6 border border-gray-100 mb-6 md:mb-0 flex flex-col items-center">
      <div className="mb-4 w-full">
        <div className="text-gray-500 text-xs mb-1">Date de la note</div>
        <div className="text-md font-semibold text-gray-800 mb-3">{dateNote}</div>
        <div className="text-gray-500 text-xs mb-1">Date de création</div>
        <div className="text-md font-semibold text-gray-800">{dateCreation}</div>
      </div>
    </div>
  );
};

export default BillDetailsSidebar; 