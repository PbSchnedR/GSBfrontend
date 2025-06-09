import React from 'react';
import DashboardAdminStats from '../Components/DashboardAdminStats';
import DashboardAdminList from '../Components/DashboardAdminList';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import { useContext, useEffect, useState } from 'react';

const DashboardAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([
    {
      label: 'Utilisateurs totaux',
      value: '0',
      change: '+0%',
      changeLabel: 'vs le mois dernier',
      icon: '👥',
    },
    {
      label: 'Membres',
      value: '0',
      change: '+0%',
      changeLabel: 'vs le mois dernier',
      icon: '🧑‍💼',
    },
    {
      label: 'Actifs maintenant',
      value: '0',
      icon: '✅',
      avatars: [
        'https://randomuser.me/api/portraits/women/1.jpg',
        'https://randomuser.me/api/portraits/men/2.jpg',
        'https://randomuser.me/api/portraits/women/3.jpg',
        'https://randomuser.me/api/portraits/men/4.jpg',
      ],
    },
  ]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    (async () => {
      try{
        const response = await fetch('https://gsbbackend-jw66.onrender.com/api/users',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        setUsers(data);
        
        // Mise à jour des stats avec la longueur du tableau users
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[0].value = data.length.toString();
          newStats[1].value = data.length.toString();
          newStats[2].value = data.length.toString();
          return newStats;
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    })();
  }, []);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Utilisateurs</h1>
          <DashboardAdminStats stats={stats} />
          <DashboardAdminList users={users} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardAdminUsers; 