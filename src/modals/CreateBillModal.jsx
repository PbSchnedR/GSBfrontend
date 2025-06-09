import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateBillModal = ({ isOpen = false, onClose = () => {} }) => {
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Repas');
  const [attachments, setAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [uploadType, setUploadType] = useState(null); // 'new' ou 'existing'
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await fetch('https://gsbbackend-jw66.onrender.com/api/users/attachment/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAttachments(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des pièces jointes:', error);
      }
    };

    if (isOpen && uploadType === 'existing') {
      fetchAttachments();
    }
  }, [isOpen, token, uploadType]);

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

  const handleSubmitNewFile = async (e) => {
    e.preventDefault();
    if (!montant || !description || !file || !date) {
      setError('Veuillez remplir tous les champs et sélectionner un fichier.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('proof', file);
      
      const metadata = {
        amount: montant,
        description: description,
        date: date,
        type: type
      };
      formData.append('metadata', JSON.stringify(metadata));
  
      const response = await fetch('https://gsbbackend-jw66.onrender.com/api/bills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      const data = await response.json();
      console.log("data :", data);
      navigate(0);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      setError('Une erreur est survenue lors de l\'envoi du formulaire.');
    }
  };

  const handleSubmitExistingAttachment = async (e) => {
    e.preventDefault();
    if (!montant || !description || !selectedAttachment || !date) {
      setError('Veuillez remplir tous les champs et sélectionner une pièce jointe.');
      return;
    }

    try {
      const response = await fetch('https://gsbbackend-jw66.onrender.com/api/bills/withAttachment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: montant,
          description: description,
          date: date,
          type: type,
          proof: selectedAttachment.url
        })
      });
  
      const data = await response.json();
      console.log("data :", data);
      navigate(0);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire :', error);
      setError('Une erreur est survenue lors de l\'envoi du formulaire.');
    }
  };

  if (!isOpen) return null;

  if (!uploadType) {
    return (
      <div className="fixed inset-0 min-h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative animate-fadeIn">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
          <div className="p-8 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Choisir le type de justificatif</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setUploadType('new')}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Nouveau fichier
              </button>
              <button
                onClick={() => setUploadType('existing')}
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-semibold transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                Pièce jointe existante
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 min-h-screen bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 relative animate-fadeIn max-h-screen overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        <form onSubmit={uploadType === 'new' ? handleSubmitNewFile : handleSubmitExistingAttachment} className="p-8 flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Nouvelle note de frais</h2>
            <button
              type="button"
              onClick={() => setUploadType(null)}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Changer le type
            </button>
          </div>
          
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
              required
            />
          </div>

          {/* Preuve */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preuve</label>
            {uploadType === 'new' ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 p-4"
                />
                {preview && (
                  <img src={preview} alt="Aperçu" className="mt-3 w-32 h-32 object-cover rounded-lg border mx-auto" />
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <select
                  value={selectedAttachment?._id || ''}
                  onChange={(e) => {
                    const attachment = attachments.find(a => a._id === e.target.value);
                    setSelectedAttachment(attachment);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">Sélectionner une pièce jointe</option>
                  {attachments.map((att) => (
                    <option key={att._id} value={att._id}>
                      {att.fileName}
                    </option>
                  ))}
                </select>

                {selectedAttachment && (
                  <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-700">{selectedAttachment.fileName}</span>
                      </div>
                    </div>
                  </div>
                )}

                {attachments.length === 0 && (
                  <div className="text-sm text-gray-500 italic">
                    Aucune pièce jointe disponible
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!montant || !description || !date || (uploadType === 'new' ? !file : !selectedAttachment)}
          >
            Créer la note de frais
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBillModal; 