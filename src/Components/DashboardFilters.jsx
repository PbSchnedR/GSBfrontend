import React from 'react';

const DashboardFilters = () => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex gap-2">
      <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trier par date</button>
      <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Trier par montant</button>
    </div>
    <div className="flex gap-2">
      <button className="p-2 bg-gray-100 rounded hover:bg-gray-200" title="Vue tableau">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
      </button>
      <button className="p-2 bg-gray-100 rounded hover:bg-gray-200" title="Vue liste">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="5" width="16" height="3" rx="1"/><rect x="4" y="10.5" width="16" height="3" rx="1"/><rect x="4" y="16" width="16" height="3" rx="1"/></svg>
      </button>
    </div>
  </div>
);

export default DashboardFilters; 