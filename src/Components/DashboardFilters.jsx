import React from 'react';

const DashboardFilters = ({ onSort}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex gap-2">
      <button onClick={() => onSort('date')} className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trier par date</button>
      <button onClick={() => onSort('amount')} className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trier par montant</button>
    </div>
  </div>
);

export default DashboardFilters; 