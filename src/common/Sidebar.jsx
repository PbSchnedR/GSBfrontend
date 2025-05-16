import React, { useState } from 'react';
import moon from '../assets/moon-svgrepo-com.svg';
import { useTheme } from './ThemeContext';
import ProfileModal from '../modals/ProfileModal';

const Sidebar = () => {
  const { toggleDarkMode } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg fixed left-0 top-0 z-50">
        <div className="p-4 border-b border-gray-700 flex justify-center">
          {/* Logo */}
          <img src="/src/assets/GSB_logo_white.png" alt="GSB_logo" className="w-auto h-27" />
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700 text-sm font-medium">Accueil</a>
          <a href="#" className="block py-2 px-3 rounded bg-purple-600 text-white text-sm font-medium">Notes de frais</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700 text-sm font-medium">Statistiques</a>
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
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-700 rounded" 
            onClick={() => setProfileOpen(true)}
          >
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
            />
            <span className="text-sm font-medium">Profil</span>
          </div>
        </div>
      </aside>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default Sidebar; 