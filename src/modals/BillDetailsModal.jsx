import React, { useState, useContext, useEffect } from 'react';
import { HiX, HiDocumentText, HiCalendar, HiClock } from 'react-icons/hi';
import BillDetailsSidebar from '../Components/BillDetails/Sidebar';
import BillImage from '../Components/BillDetails/BillImage';
import BillInfo from '../Components/BillDetails/BillInfo';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BillDetailsModal = ({ isOpen, onClose, bill }) => {
  const { token, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amount: bill?.montant?.replace(' €', '') || '',
    date: bill?.dateNote || '',
    type: bill?.type || 'Repas',
    description: bill?.description || '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    };

    setFormData({
      amount: bill?.montant?.replace(' €', '') || '',
      date: formatDateForInput(bill?.dateNote) || '',
      type: bill?.type || 'Repas',
      description: bill?.description || '',
    });
  }, [bill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setFormData({
      amount: bill?.montant?.replace(' €', '') || '',
      date: bill?.dateNote || '',
      type: bill?.type || 'Repas',
      description: bill?.description || '',
    });
    (async () => {
      try{
        const response = await fetch(`https://gsbbackend-jw66.onrender.com/api/bills/${bill?._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          }
        );
        const data = await response.json();
        console.log(data);
        onClose();
        navigate(0);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes de frais:', error);
      }
    })();
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    (async () => {
      try{
        const response = await fetch(`https://gsbbackend-jw66.onrender.com/api/bills/${bill?._id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        console.log(data);
        onClose();
        navigate(0);
      } catch (error) {
        console.error('Erreur lors de la suppression de la note de frais:', error);
      }
    })();
  };

  const handleValidate = () => {
    (async () => {
      try {
        const response = await fetch(`https://gsbbackend-jw66.onrender.com/api/bills/${bill?._id}/validate`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        console.log(data);
        onClose();
        navigate(0);
      } catch (error) {
        console.error('Erreur lors de la validation de la note de frais:', error);
      }
    })();
  };

  const handleReject = () => {
    (async () => {
      try {
        const response = await fetch(`https://gsbbackend-jw66.onrender.com/api/bills/${bill?._id}/reject`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        console.log(data);
        onClose();
        navigate(0);
      } catch (error) {
        console.error('Erreur lors du refus de la note de frais:', error);
      }
    })();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header - Toujours visible */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <HiDocumentText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Détails de la note de frais</h2>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <HiCalendar className="w-4 h-4" />
                  <span>{bill?.dateNote || '12/06/2024'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiClock className="w-4 h-4" />
                  <span>Créée le {bill?.dateCreation || '13/06/2024'}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Image */}
              <div className="lg:w-1/2">
                <div className="lg:sticky lg:top-6">
                  <BillImage image={bill?.proof} />
                </div>
              </div>

              {/* Right Column - Info and Actions */}
              <div className="lg:w-1/2 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Montant (€)
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          step="0.01"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        >
                          <option value="Repas">Repas</option>
                          <option value="Transport">Transport</option>
                          <option value="Hôtel">Hôtel</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ) : (
                    <BillInfo 
                      montant={bill?.montant} 
                      type={bill?.type} 
                      description={bill?.description} 
                    />
                  )}
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    {isEditing ? (
                      <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Valider
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Modifier
                        </button>
                        <button className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                          Télécharger
                        </button>
                        <button 
                          onClick={handleDelete}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Supprimer
                        </button>
                        {user?.role === 'admin' && bill?.status === 'En attente' && (
                          <>
                            <button 
                              onClick={handleValidate}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Valider
                            </button>
                            <button 
                              onClick={handleReject}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Refuser
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetailsModal; 