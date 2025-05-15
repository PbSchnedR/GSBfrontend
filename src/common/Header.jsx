import React, { useState } from 'react';
import moon from '../assets/moon-svgrepo-com.svg'
import { useTheme } from './ThemeContext';
import ProfileModal from '../modals/ProfileModal';

const Header = () => {
  const { toggleDarkMode } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <img src="/src/assets/GSB_logo.png" alt="GSB_logo" className="w-17 h-14" />
          <nav className="flex items-center gap-2 md:gap-4">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-black">Accueil</a>
            <a href="#" className="text-sm font-medium bg-gray-100 rounded px-2 py-1 text-black">Notes de frais</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-black">Statistiques</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={toggleDarkMode}>
            <img src={moon} alt="moon" className="w-6 h-6" />
          </button>
          {/* Avatar utilisateur */}
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-white cursor-pointer"
            onClick={() => setProfileOpen(true)}
          />
        </div>
      </header>
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default Header; 