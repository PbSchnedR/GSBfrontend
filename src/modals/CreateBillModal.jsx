import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreateBillModal = ({ isOpen = false, onClose = () => {} }) => {
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Repas');
const { token } = useContext(AuthContext);



  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!montant || !description || !file) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    (async () => {
      try {
        const formData = new FormData();
    
        // Ajout du fichier
        formData.append('proof', file); 
    
        // Création des métadonnées en JSON
        const metadata = {
          amount: montant,
          description: description,
          date: date,
          type: type
        };
        formData.append('metadata', JSON.stringify(metadata));
    
        // Envoi de la requête
        const response = await fetch('http://127.0.0.1:3000/api/bills', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` // PAS de Content-Type ici
          },
          body: formData
        });
    
        const data = await response.json();
        console.log("data :", data);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
      }
    })();
    
    onClose();
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative animate-fadeIn">
        {/* Bouton fermer */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nouvelle note de frais</h2>
          {/* Montant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={montant}
              onChange={e => setMontant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Saisir le montant"
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Décrivez la dépense..."
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de note de frais</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="Repas">Repas</option>
              <option value="Transport">Transport</option>
              <option value="Hébergement">Hébergement</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Décrivez la dépense..."
              required
            />
          </div>
          {/* Preuve */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preuve (image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 p-4"
              required
            />
            {preview && (
              <img src={preview} alt="Aperçu" className="mt-3 w-32 h-32 object-cover rounded-lg border mx-auto" />
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!montant || !description || !file || !date}
          >
            Créer la note de frais
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBillModal; 