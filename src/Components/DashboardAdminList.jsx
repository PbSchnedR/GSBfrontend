import React, { useState, useEffect } from 'react';
import heart from '../assets/heart-svgrepo-com.svg';
import { HiEye } from 'react-icons/hi';
import BillDetailsModal from '../modals/BillDetailsModal';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';
import ConfirmationModal from '../modals/ConfirmatioModal';
import EditUserModal from '../modals/EditUserModal';

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

const DashboardAdminList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [userBills, setUserBills] = useState([]);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    if (selectedUser) {
      fetchUserBills(selectedUser._id);
    }
  }, [selectedUser]);

  const fetchUserBills = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/bills/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUserBills(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notes de frais:', error);
    }
  };

  const handleViewDetails = (note) => {
    setSelectedBill({
      ...note,
      dateNote: formatDate(note.date),
      dateCreation: formatDateTime(note.createdAt),
      montant: `${note.amount.toFixed(2)} €`
    });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const totalPages = Math.ceil(userBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBills = userBills.slice(startIndex, endIndex);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        /*setIsModalDeleteOpen(false);
        navigate(0);*/
        const bill_response = await fetch(`http://127.0.0.1:3000/api/bills/user/${selectedUser._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (bill_response.ok) {
          setIsModalDeleteOpen(false);
          navigate(0);
        }
        else{
          alert('Erreur lors de la suppression des notes de frais ou aucune note de frais trouvée');
          setIsModalDeleteOpen(false);
          navigate(0);
        }

      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };


  return (
    <div className="mt-8">
      {!selectedUser ? (
        // Liste des utilisateurs
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 sm:px-0">
          {users.map((user, idx) => (
            <div
              key={idx}
              onClick={() => handleUserClick(user)}
              className="bg-white rounded-lg shadow p-4 sm:p-5 flex flex-col items-center border border-gray-100 
                       cursor-pointer transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:scale-[1.02] hover:border-purple-200
                       active:scale-[0.98] w-full max-w-xs mx-auto"
            >
              <img 
                src={user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
                alt={user.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 sm:mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                }}
              />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center mb-1">{user.name}</h3>
              <p className="text-xs text-gray-500 text-center mb-2">{user.description}</p>
            </div>
          ))}
        </div>
      ) : (
        // Liste des notes de frais de l'utilisateur sélectionné
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Notes de frais de {selectedUser.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsEditUserModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 flex items-center gap-2"
              >
                Modifier
              </button>
              <button
                onClick={() => setIsModalDeleteOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2"
              >
                Supprimer
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Retour aux utilisateurs
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {currentBills.map((note) => (
              <div key={note.id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden items-start sm:items-center px-3 sm:px-4 py-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 items-center w-full">
                  <div>
                    <span className="block text-xs text-gray-400">Date</span>
                    <span className="font-medium text-sm sm:text-base">{formatDate(note.date)}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Montant</span>
                    <span className="font-medium text-sm sm:text-base">{note.amount.toFixed(2)} €</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Type</span>
                    <span className="font-medium text-sm sm:text-base">{note.type}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Statut</span>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[note.status]}`}>{note.status}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Créé le</span>
                    <span className="font-medium text-xs sm:text-base">{formatDateTime(note.createdAt)}</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center gap-2 ml-0 sm:ml-2 mt-2 sm:mt-0">
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
        </>
      )}

      <BillDetailsModal 
        isOpen={!!selectedBill} 
        onClose={() => setSelectedBill(null)} 
        bill={selectedBill}
      />

<ConfirmationModal
    isOpen={isModalDeleteOpen}
    message="Voulez-vous vraiment supprimer cet utilisateur ?"
    onConfirm={handleDeleteUser}
    onCancel={() => setIsModalDeleteOpen(false)}
  />

  <EditUserModal
    isOpen={isEditUserModalOpen}
    user={selectedUser}
    onClose={() => setIsEditUserModalOpen(false)}
  />
    </div>
  );
};

export default DashboardAdminList; 