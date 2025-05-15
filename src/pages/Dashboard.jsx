import React from 'react';
import Header from '../common/Header';
import DashboardHeader from '../Components/DashboardHeader';
import DashboardStats from '../Components/DashboardStats';
import DashboardCTA from '../Components/DashboardCTA';
import DashboardFilters from '../Components/DashboardFilters';
import DashboardList from '../Components/DashboardList';
import { ThemeProvider } from '../common/ThemeContext';

const Dashboard = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-6">
          <DashboardStats />
          <DashboardCTA />
          <DashboardFilters />
          <DashboardList />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard; 