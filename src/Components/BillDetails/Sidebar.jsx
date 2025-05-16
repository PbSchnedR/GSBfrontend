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
      <button className="w-full mb-2 py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition">
        Modifier
      </button>
      <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition">
        Supprimer
      </button>
    </div>
  );
};

export default BillDetailsSidebar; 