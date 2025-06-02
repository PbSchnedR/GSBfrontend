import React from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';
import StatCard from '../Components/Statistics/StatCard';
import ChartsSection from '../Components/Statistics/ChartsSection';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Statistics = () => {
  const { token } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [stats, setStats] = useState([
    {
      icon: <HiOutlineDocumentText className="w-7 h-7 text-purple-500" />,
      title: 'Total notes de frais',
      value: '0',
      change: '+0%',
      changeText: 'ce mois',
      changeColor: 'text-green-600',
    },
    {
      icon: <HiOutlineCurrencyEuro className="w-7 h-7 text-yellow-500" />,
      title: 'Montant total',
      value: '0 €',
      change: '+0%',
      changeText: 'ce mois',
      changeColor: 'text-green-600',
    },
    {
      icon: <HiOutlineClock className="w-7 h-7 text-blue-500" />,
      title: 'Notes en attente',
      value: '0',
      change: '⏳',
      changeText: 'à valider',
      changeColor: 'text-yellow-600',
    },
  ]);

  const calculateTotalAmount = (bills) => {
    return bills.reduce((total, bill) => total + bill.amount, 0);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/bills/stats/byUser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBills(data);
        
        // Mise à jour des stats
        setStats(prevStats => {
          const newStats = [...prevStats];
          // Total notes de frais
          newStats[0].value = data.length.toString();
          // Montant total
          const totalAmount = calculateTotalAmount(data);
          newStats[1].value = `${totalAmount.toFixed(2)} €`;
          return newStats;
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
          
          {/* Résumé chiffré */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Graphiques */}
          <ChartsSection bills={bills} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Statistics; 