import React from 'react';

const DashboardHeader = () => (
  <div className="mb-6">
    <h1 className="text-lg font-semibold mb-2">Notes de frais</h1>
    <div className="flex gap-2 border-b border-gray-200">
      <button className="px-4 py-2 text-sm font-medium border-b-2 border-purple-600 text-purple-600">Vue d'ensemble</button>
      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-purple-600">Tableau</button>
      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-purple-600">Liste</button>
      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-purple-600">Statistiques</button>
    </div>
  </div>
);

export default DashboardHeader; 