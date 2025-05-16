import React from 'react';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi2';
import ExpenseTypePieChart from './ExpenseTypePieChart';

const stats = [
  {
    icon: <HiOutlineDocumentText className="w-7 h-7 text-purple-500" />, // Total notes de frais
    title: 'Total notes de frais',
    value: '128',
    change: '+8%',
    changeText: 'ce mois',
    changeColor: 'text-green-600',
  },
  {
    icon: <HiOutlineCurrencyEuro className="w-7 h-7 text-yellow-500" />, // Montant total
    title: 'Montant total',
    value: '3 240 €',
    change: '+12%',
    changeText: 'ce mois',
    changeColor: 'text-green-600',
  },
  {
    icon: <HiOutlineClock className="w-7 h-7 text-blue-500" />, // Notes en attente
    title: 'Notes en attente',
    value: '7',
    change: '⏳',
    changeText: 'à valider',
    changeColor: 'text-yellow-600',
  },
];

const DashboardStats = () => (
  <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Colonne pour les 3 cartes de stats empilées */}
    <div className="lg:col-span-1 flex flex-col gap-4">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between min-h-[100px] relative"
        >
          {/* Icône + menu */}
          <div className="flex items-start justify-between mb-2">
            <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center">
              {stat.icon}
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
          </div>
          <div className="mb-1 text-sm text-gray-500">{stat.title}</div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="flex items-center text-xs">
            <span className={`${stat.changeColor} font-semibold mr-1`}>{stat.change}</span>
            <span className="text-gray-400">{stat.changeText}</span>
          </div>
        </div>
      ))}
    </div>
    
    {/* Pie chart à droite */}
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center min-h-[332px]">
      <ExpenseTypePieChart />
    </div>
  </div>
);

export default DashboardStats; 