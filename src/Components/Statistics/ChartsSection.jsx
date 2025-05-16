import React from 'react';
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel';
import SimpleBarChart from './SimpleBarChart';

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique par catégorie */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Répartition par catégorie</h2>
        <div className="h-80">
          <PieChartWithCustomizedLabel />
        </div>
      </div>

      {/* Graphique par mois */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Évolution mensuelle</h2>
        <div className="h-80">
          <SimpleBarChart />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection; 