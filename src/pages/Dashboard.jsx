import React from 'react';
import Sidebar from '../common/Sidebar';
import DashboardCTA from '../Components/DashboardCTA';
import DashboardFilters from '../Components/DashboardFilters';
import DashboardList from '../Components/DashboardList';
import { ThemeProvider } from '../common/ThemeContext';

const Dashboard = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-bold mb-6">Notes de frais</h1>
          <DashboardCTA />
          <DashboardFilters />
          <DashboardList />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard; 