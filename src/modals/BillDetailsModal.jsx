import React from 'react';
import { HiX, HiDocumentText, HiCalendar, HiClock } from 'react-icons/hi';
import BillDetailsSidebar from '../Components/BillDetails/Sidebar';
import BillImage from '../Components/BillDetails/BillImage';
import BillInfo from '../Components/BillDetails/BillInfo';

const BillDetailsModal = ({ isOpen, onClose, bill }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
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
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <div className="sticky top-6">
                <BillImage image={bill?.image} />
              </div>
            </div>

            {/* Right Column - Info and Actions */}
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <BillInfo 
                  montant={bill?.montant} 
                  type={bill?.type} 
                  description={bill?.description} 
                />
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Modifier
                  </button>
                  <button className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                    Télécharger
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                    Supprimer
                  </button>
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