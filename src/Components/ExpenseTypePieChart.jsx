import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Repas', 'Transport', 'Hébergement', 'Autre'],
  datasets: [
    {
      label: 'Types de notes de frais',
      data: [12, 7, 5, 3],
      backgroundColor: [
        '#a78bfa', // violet
        '#fbbf24', // jaune
        '#34d399', // vert
        '#60a5fa', // bleu
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        color: '#374151',
        font: { size: 14 },
      },
    },
  },
  maintainAspectRatio: false,
};

const ExpenseTypePieChart = () => (
  <div className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto" style={{ height: 440 }}>
    <h2 className="text-lg font-semibold mb-4 text-center">Répartition des types de notes de frais</h2>
    <Pie data={data} options={options} width={300} height={220} />
  </div>
);

export default ExpenseTypePieChart; 