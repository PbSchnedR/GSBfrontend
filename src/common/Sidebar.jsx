import React, { useState } from 'react';
import moon from '../assets/moon-svgrepo-com.svg';
import { useTheme } from './ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { HiDocumentText, HiChartBar, HiPaperClip, HiUser, HiQuestionMarkCircle } from 'react-icons/hi2';

const Sidebar = () => {
  const { toggleDarkMode } = useTheme();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: <HiDocumentText className="w-5 h-5" />, label: 'Notes de frais' },
    { path: '/statistics', icon: <HiChartBar className="w-5 h-5" />, label: 'Statistiques' },
    { path: '/attachments', icon: <HiPaperClip className="w-5 h-5" />, label: 'Justificatifs' },
    { path: '/profile', icon: <HiUser className="w-5 h-5" />, label: 'Mon compte' },
    { path: '/support', icon: <HiQuestionMarkCircle className="w-5 h-5" />, label: 'Support / Aide' },
  ];

  return (
    <>
      <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg fixed left-0 top-0 z-50">
        <div className="p-4 border-b border-gray-700 flex justify-center">
          {/* Logo */}
          <img src="/src/assets/GSB_logo_white.png" alt="GSB_logo" className="w-auto h-27" />
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-700 text-sm font-medium transition-colors ${
                location.pathname === item.path ? 'bg-purple-600 text-white' : 'text-gray-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 space-y-3">
          <button 
            className="w-full flex items-center justify-start gap-3 p-2 hover:bg-gray-700 rounded text-sm" 
            onClick={toggleDarkMode}
          >
            <img src={moon} alt="moon" className="w-5 h-5" />
            <span>Changer thème</span>
          </button>
          {/* Avatar utilisateur */}
          <div 
            className="flex items-center gap-3" 
          >
            <img
              src="/src/assets/Dylans_life_matter.png"
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
            />
            <span className="text-sm font-medium">Dylanette</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 