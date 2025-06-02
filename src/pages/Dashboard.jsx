import React from 'react';
import Sidebar from '../common/Sidebar';
import DashboardCTA from '../Components/DashboardCTA';
import DashboardFilters from '../Components/DashboardFilters';
import DashboardList from '../Components/DashboardList';
import { ThemeProvider } from '../common/ThemeContext';
import { useState } from 'react';

const Dashboard = () => {
  const [sortedBills, setSortedBills] = useState(null);
  
  const handleSort = (field) => {
    setSortedBills(prev => prev === field ? null : field);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Notes de frais</h1>
          <div className="space-y-4 sm:space-y-6">
            <DashboardCTA />
            <DashboardFilters onSort={handleSort} />
            <DashboardList sortedBills={sortedBills} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard; 