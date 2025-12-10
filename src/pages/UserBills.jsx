import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineClock } from 'react-icons/hi';
import { ThemeProvider } from '../common/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '../common/Sidebar';

const UserBills = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState([{
    id: 1,
    title: 'Note de frais 1',
    amount: 100,
    status: 'pending',
    date: '2021-01-01'
  }]);
  const [isLoading, setIsLoading] = useState(true);
  const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

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

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response_user = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data_user = await response_user.json();
        setUser(data_user);

        const response_bills = await fetch(`${import.meta.env.VITE_API_URL}/api/bills/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data_bills = await response_bills.json();
       setBills(data_bills);
       console.log(data_bills);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="text-gray-600 font-medium">Chargement des données...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Utilisateur non trouvé
          </div>
        </main>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
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
                    src={user.avatar || defaultAvatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultAvatar;
                    }}
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