import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';
import SidebarAdmin from '../common/SidebarAdmin';
import { ThemeProvider } from '../common/ThemeContext';

const UserBills = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  // Simuler les données de l'utilisateur (à remplacer par un appel API)
  const user = {
    name: 'Amélie Laurent',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Fondatrice & CEO',
  };

  // Simuler les notes de frais (à remplacer par un appel API)
  const bills = [
    {
      id: 1,
      title: 'Restaurant avec client',
      date: '12/06/2024',
      amount: '85,50 €',
      status: 'pending',
      type: 'restaurant',
    },
    {
      id: 2,
      title: 'Transport en taxi',
      date: '10/06/2024',
      amount: '45,00 €',
      status: 'approved',
      type: 'transport',
    },
    {
      id: 3,
      title: 'Hôtel déplacement',
      date: '08/06/2024',
      amount: '320,00 €',
      status: 'rejected',
      type: 'hotel',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Validée';
      case 'rejected':
        return 'Refusée';
      default:
        return status;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* En-tête */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Retour
                </button>
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'pending'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                En attente
              </button>
              <button
                onClick={() => setActiveFilter('approved')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'approved'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Validées
              </button>
              <button
                onClick={() => setActiveFilter('rejected')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'rejected'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Refusées
              </button>
            </div>

            {/* Liste des notes de frais */}
            <div className="space-y-4">
              {bills
                .filter(bill => activeFilter === 'all' || bill.status === activeFilter)
                .map(bill => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <HiOutlineDocumentText className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{bill.title}</h3>
                        <p className="text-sm text-gray-500">{bill.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold">{bill.amount}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(bill.status)}`}>
                        {getStatusText(bill.status)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default UserBills; 