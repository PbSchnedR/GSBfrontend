import React from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';
import StatCard from '../Components/Statistics/StatCard';
import ChartsSection from '../Components/Statistics/ChartsSection';

const stats = [
  {
    icon: <HiOutlineDocumentText className="w-7 h-7 text-purple-500" />,
    title: 'Total notes de frais',
    value: '128',
    change: '+8%',
    changeText: 'ce mois',
    changeColor: 'text-green-600',
  },
  {
    icon: <HiOutlineCurrencyEuro className="w-7 h-7 text-yellow-500" />,
    title: 'Montant total',
    value: '3 240 €',
    change: '+12%',
    changeText: 'ce mois',
    changeColor: 'text-green-600',
  },
  {
    icon: <HiOutlineClock className="w-7 h-7 text-blue-500" />,
    title: 'Notes en attente',
    value: '7',
    change: '⏳',
    changeText: 'à valider',
    changeColor: 'text-yellow-600',
  },
];

const Statistics = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
          
          {/* Résumé chiffré */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Graphiques */}
          <ChartsSection />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Statistics; 