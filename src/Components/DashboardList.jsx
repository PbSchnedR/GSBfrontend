import React, { useState, useEffect } from 'react';
import heart from '../assets/heart-svgrepo-com.svg';
import { HiEye } from 'react-icons/hi';
import BillDetailsModal from '../modals/BillDetailsModal';
import Pagination from './Pagination';

// Fonction pour formater la date en français
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Fonction pour formater la date et l'heure en français
const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const notes = [
  {
    id: 1,
    date: '2024-06-01',
    amount: 120.50,
    type: 'Repas',
    status: 'Validée',
    createdAt: '2024-06-01 09:12',
    description: "Déjeuner d'équipe au restaurant Le Gourmet, Paris, le 12/06/2024.",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 2,
    date: '2024-05-28',
    amount: 340.00,
    type: 'Transport',
    status: 'En attente',
    createdAt: '2024-05-28 14:30',
    description: "Trajet en train Paris-Lyon pour réunion client",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 3,
    date: '2024-05-20',
    amount: 58.90,
    type: 'Hébergement',
    status: 'Refusée',
    createdAt: '2024-05-20 18:45',
    description: "Nuitée à l'hôtel Mercure pour déplacement professionnel",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 4,
    date: '2024-05-15',
    amount: 75.00,
    type: 'Repas',
    status: 'Validée',
    createdAt: '2024-05-15 12:30',
    description: "Dîner avec le client ABC Corp",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 5,
    date: '2024-05-10',
    amount: 45.00,
    type: 'Transport',
    status: 'Validée',
    createdAt: '2024-05-10 08:15',
    description: "Taxi pour rendez-vous client",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 6,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 7,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 8,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 9,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 10,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  },
  {
    id: 11,
    date: '2024-05-05',
    amount: 200.00,
    type: 'Hébergement',
    status: 'En attente',
    createdAt: '2024-05-05 16:45',
    description: "Hôtel pour conférence annuelle",
    image: 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0'
  }
];

const statusColors = {
  'Validée': 'text-green-600 bg-green-50',
  'En attente': 'text-yellow-700 bg-yellow-50',
  'Refusée': 'text-red-600 bg-red-50',
};

// Hauteur approximative d'une note de frais en pixels
const BILL_HEIGHT = 80;
// Marge en bas de la liste
const BOTTOM_MARGIN = 100;

const DashboardList = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      const windowHeight = window.innerHeight;
      const availableHeight = windowHeight - BOTTOM_MARGIN;
      const calculatedItems = Math.floor(availableHeight / BILL_HEIGHT);
      setItemsPerPage(Math.max(1, calculatedItems));
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);

    return () => {
      window.removeEventListener('resize', calculateItemsPerPage);
    };
  }, []);

  const handleViewDetails = (note) => {
    setSelectedBill({
      ...note,
      dateNote: formatDate(note.date),
      dateCreation: formatDateTime(note.createdAt),
      montant: `${note.amount.toFixed(2)} €`
    });
  };

  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotes = notes.slice(startIndex, endIndex);

  return (
    <>
      <div className="space-y-4">
        {currentNotes.map((note) => (
          <div key={note.id} className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden items-center px-4 py-3">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 items-center w-full">
              <div>
                <span className="block text-xs text-gray-400">Date</span>
                <span className="font-medium">{formatDate(note.date)}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Montant</span>
                <span className="font-medium">{note.amount.toFixed(2)} €</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Type</span>
                <span className="font-medium">{note.type}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Statut</span>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[note.status]}`}>{note.status}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400">Créé le</span>
                <span className="font-medium">{formatDateTime(note.createdAt)}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 ml-2">
              <button 
                onClick={() => handleViewDetails(note)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-purple-600 transition-colors"
                title="Voir les détails"
              >
                <HiEye className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100" title="Favori">
                <img src={heart} alt="heart" className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <BillDetailsModal 
        isOpen={!!selectedBill} 
        onClose={() => setSelectedBill(null)} 
        bill={selectedBill}
      />
    </>
  );
};

export default DashboardList; 