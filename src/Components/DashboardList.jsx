import React, { useState, useEffect } from 'react';
import heart from '../assets/heart-svgrepo-com.svg';
import { HiEye } from 'react-icons/hi';
import BillDetailsModal from '../modals/BillDetailsModal';
import Pagination from './Pagination';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


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


const statusColors = {
  'Validée': 'text-green-600 bg-green-50',
  'En attente': 'text-yellow-700 bg-yellow-50',
  'Refusée': 'text-red-600 bg-red-50',
};

// Hauteur approximative d'une note de frais en pixels
const BILL_HEIGHT = 80;
// Marge en bas de la liste
const BOTTOM_MARGIN = 100;

const DashboardList = ({sortedBills}) => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try{
        const response = await fetch('https://gsbbackend-jw66.onrender.com/api/bills',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          setNotes(data);
        }
        else {
          setNotes([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des notes de frais:', error);
      }
    })();
  }, []);

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

  const getSortedNotes = () => {
    if (!sortedBills) return notes;
    
    return [...notes].sort((a, b) => {
      if (sortedBills === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortedBills === 'amount') {
        return a.amount - b.amount;
      }
      return 0;
    });
  };

  const sortedNotes = getSortedNotes();
  const totalPages = Math.ceil(sortedNotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotes = sortedNotes.slice(startIndex, endIndex);

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