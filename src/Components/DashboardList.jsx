import React from 'react';
import heart from '../assets/heart-svgrepo-com.svg'
const notes = [
  {
    id: 1,
    date: '2024-06-01',
    amount: 120.50,
    type: 'Repas',
    status: 'Validée',
    createdAt: '2024-06-01 09:12',
  },
  {
    id: 2,
    date: '2024-05-28',
    amount: 340.00,
    type: 'Transport',
    status: 'En attente',
    createdAt: '2024-05-28 14:30',
  },
  {
    id: 3,
    date: '2024-05-20',
    amount: 58.90,
    type: 'Hébergement',
    status: 'Refusée',
    createdAt: '2024-05-20 18:45',
  },
];

const statusColors = {
  'Validée': 'text-green-600 bg-green-50',
  'En attente': 'text-yellow-700 bg-yellow-50',
  'Refusée': 'text-red-600 bg-red-50',
};

const DashboardList = () => (
  <div className="space-y-4">
    {notes.map((note) => (
      <div key={note.id} className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden items-center px-4 py-3">
        <div className="flex-1 grid grid-cols-5 gap-4 items-center">
          <div>
            <span className="block text-xs text-gray-400">Date</span>
            <span className="font-medium">{note.date}</span>
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
            <span className="font-medium">{note.createdAt}</span>
          </div>
        </div>
        <button className="ml-4 p-2 rounded-full hover:bg-gray-100" title="Favori">
          <img src={heart} alt="heart" className="w-6 h-6" />
          
        </button>
      </div>
    ))}
  </div>
);

export default DashboardList; 