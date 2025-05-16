import React from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';

const BillDetails = ({
  image = 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0',
  montant = '124,50 €',
  type = 'Repas',
  description = 'Déjeuner d’équipe au restaurant Le Gourmet, Paris, le 12/06/2024.',
  dateNote = '12/06/2024',
  dateCreation = '13/06/2024'
}) => {
  return (
    <ThemeProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="flex flex-col md:flex-row items-start w-full max-w-4xl mx-auto py-10 gap-8">
            {/* Cadre latéral */}
            <div className="w-full md:w-64 bg-white rounded-xl shadow p-6 border border-gray-100 mb-6 md:mb-0 flex flex-col items-center">
              <div className="mb-4 w-full">
                <div className="text-gray-500 text-xs mb-1">Date de la note</div>
                <div className="text-md font-semibold text-gray-800 mb-3">{dateNote}</div>
                <div className="text-gray-500 text-xs mb-1">Date de création</div>
                <div className="text-md font-semibold text-gray-800">{dateCreation}</div>
              </div>
              <button className="w-full mb-2 py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition">Modifier</button>
              <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition">Supprimer</button>
            </div>
            {/* Contenu principal */}
            <div className="flex-1 flex flex-col items-center w-full max-w-xl mx-auto">
              {/* Preuve */}
              <div className="w-full aspect-square bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center mb-8">
                <img src={image} alt="Preuve" className="object-cover w-full h-full" />
              </div>
              {/* Montant & Type */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow p-5 mb-6 border border-gray-100">
                <span className="text-2xl font-bold text-gray-900">{montant}</span>
                <span className="text-purple-600 font-medium text-lg mt-2 sm:mt-0">{type}</span>
              </div>
              {/* Description */}
              <div className="w-full bg-white rounded-xl shadow p-5 border border-gray-100">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default BillDetails; 