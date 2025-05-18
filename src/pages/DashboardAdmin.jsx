import React from 'react';
import DashboardAdminStats from '../Components/DashboardAdminStats';
import DashboardAdminList from '../Components/DashboardAdminList';
import Sidebar from '../common/Sidebar';
import SidebarAdmin from '../common/SidebarAdmin';
import { ThemeProvider } from '../common/ThemeContext';

const stats = [
  {
    label: 'Utilisateurs totaux',
    value: '2 420',
    change: '+20%',
    changeLabel: 'vs le mois dernier',
    icon: '👥',
  },
  {
    label: 'Membres',
    value: '1 210',
    change: '+15%',
    changeLabel: 'vs le mois dernier',
    icon: '🧑‍💼',
  },
  {
    label: 'Actifs maintenant',
    value: '316',
    icon: '✅',
    avatars: [
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/men/4.jpg',
    ],
  },
];

const users = [
  {
    name: 'Amélie Laurent',
    role: 'Fondatrice & CEO',
    specialty: 'Produit',
    description: 'Ancienne co-fondatrice de Opendoor. Expérience chez Spotify et Clearbit.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    link: '#',
    linkLabel: 'Fondatrice & CEO',
  },
  {
    name: 'Nikolas Gibbons',
    role: 'Engineering Manager',
    specialty: 'Ingénierie',
    description: 'Lead des équipes techniques chez Figma, Pitch et Protocol Labs.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    link: '#',
    linkLabel: 'Engineering Manager',
  },
  {
    name: 'Sienna Hewitt',
    role: 'Product Manager',
    specialty: 'Produit',
    description: 'Ancienne PM chez Linear, Lambda School et On Deck.',
    avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
    link: '#',
    linkLabel: 'Product Manager',
  },
  {
    name: 'Lily-Rose Chedjou',
    role: 'Développeuse Frontend',
    specialty: 'Frontend',
    description: 'Ancienne développeuse front chez Linear, Coinbase et Postscript.',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    link: '#',
    linkLabel: 'Développeuse Frontend',
  },
  {
    name: 'Zahra Christensen',
    role: 'Développeuse Backend',
    specialty: 'Backend',
    description: 'Lead backend chez Clearbit. Ancienne de Clearbit et Loom.',
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    link: '#',
    linkLabel: 'Développeuse Backend',
  },
  {
    name: 'Caitlyn King',
    role: 'Product Designer',
    specialty: 'Design',
    description: 'Lead design chez Figma. Ancienne de Pleo, Stripe et Tile.',
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
    link: '#',
    linkLabel: 'Product Designer',
  },
  {
    name: 'Zaid Schwartz',
    role: 'UX Researcher',
    specialty: 'UX',
    description: 'Lead recherche utilisateur pour Slack. Consultant Netflix et Udacity.',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    link: '#',
    linkLabel: 'UX Researcher',
  },
  {
    name: 'Marco Kelly',
    role: 'Customer Success',
    specialty: 'Support',
    description: 'Lead CX chez Wealthsimple. Ancien PagerDuty et Sqreen.',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    link: '#',
    linkLabel: 'Customer Success',
  },
];

const DashboardAdmin = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        
        <SidebarAdmin />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Utilisateurs</h1>
          <DashboardAdminStats stats={stats} />
          <DashboardAdminList users={users} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardAdmin; 