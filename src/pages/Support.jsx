import React from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import FAQ from '../Components/Support/FAQ';
import ContactSection from '../Components/Support/ContactSection';

const Support = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Support / Aide</h1>
            <FAQ />
            <ContactSection />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Support; 