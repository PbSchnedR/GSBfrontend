import React, { useState } from 'react';
import moon from '../assets/moon-svgrepo-com.svg';
import { useTheme } from './ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { HiDocumentText, HiChartBar, HiPaperClip, HiUser, HiQuestionMarkCircle, HiMenu, HiX, HiLogout } from 'react-icons/hi';

const Sidebar = () => {
  const { toggleDarkMode } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <HiDocumentText className="w-6 h-6" />, label: 'Notes de frais' },
    { path: '/statistics', icon: <HiChartBar className="w-6 h-6" />, label: 'Statistiques' },
    { path: '/attachments', icon: <HiPaperClip className="w-6 h-6" />, label: 'Justificatifs' },
    { path: '/profile', icon: <HiUser className="w-6 h-6" />, label: 'Mon compte' },
    { path: '/support', icon: <HiQuestionMarkCircle className="w-6 h-6" />, label: 'Support / Aide' },
  ];

  // Version mobile/tablette
  const mobileSidebar = (
    <>
      {/* Menu Burger pour Mobile */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        {isOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
      </button>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar mobile/tablette */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col shadow-lg z-50
          transition-transform duration-300 ease-in-out
          w-72 max-w-full
          rounded-none
          ${isOpen ? 'translate-x-0 rounded-l-3xl' : '-translate-x-full'}
          lg:hidden
        `}
        style={{ minWidth: '18rem' }}
      >
        <div className="flex flex-col items-center py-8 border-b border-gray-700 bg-gray-800">
          <img
            src="/src/assets/Dylans_life_matter.png"
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-3"
          />
          <span className="text-lg font-semibold">Dylanette</span>
        </div>
        <nav className="flex-grow flex flex-col gap-2 py-8 px-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                location.pathname === item.path ? 'bg-purple-600 text-white' : 'text-gray-200 hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-8 pt-4 border-t border-gray-700 flex flex-col gap-3">
          <button 
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 rounded-xl text-base"
            onClick={toggleDarkMode}
          >
            <img src={moon} alt="moon" className="w-6 h-6" />
            <span>Changer thème</span>
          </button>
          <button
            className="w-full flex items-center gap-3 p-3 hover:bg-red-100 hover:text-red-700 rounded-xl text-base transition-colors bg-transparent text-white border border-transparent hover:border-red-200"
            onClick={() => alert('Déconnexion')}
          >
            <HiLogout className="w-6 h-6" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );

  // Version desktop
  const desktopSidebar = (
    <aside
      className="hidden lg:flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg fixed top-0 left-0 z-40"
      style={{ minWidth: '16rem' }}
    >
      <div className="p-4 border-b border-gray-700 flex flex-col items-center">
        <img src="/src/assets/GSB_logo_white.png" alt="GSB_logo" className="w-auto h-20 mb-2" />
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
          className="w-full flex items-center gap-3 p-2 hover:bg-red-100 hover:text-red-700 rounded text-sm transition-colors bg-transparent text-white border border-transparent hover:border-red-200"
          onClick={() => alert('Déconnexion')}
        >
          <HiLogout className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
};

export default Sidebar; 