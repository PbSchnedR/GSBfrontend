import React, { useState } from 'react';

const ProfileModal = ({ isOpen = true, onClose = () => {} }) => {
  // Données fictives
  const [email, setEmail] = useState('pablo.smith@email.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [notesCount] = useState(17);
  const name = 'Pablo S.';
  const avatar = 'https://randomuser.me/api/portraits/men/32.jpg';

  const handleSaveEmail = () => {
    setEmail(newEmail);
    setIsEditingEmail(false);
  };

  const handleSavePassword = () => {
    // Ici tu pourrais ajouter la logique d'appel API
    setIsEditingPassword(false);
    setNewPassword('');
    alert('Mot de passe modifié !');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 relative animate-fadeIn">
        {/* Bouton fermer */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold">×</button>
        {/* Haut du modal */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 pb-4 gap-6">
          <div className="flex-1 flex flex-col items-start gap-3">
            <div className="text-2xl font-semibold text-gray-900">{name}</div>
            <button className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition">
              <span>Voir mes notes de frais</span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              <img src={avatar} alt="avatar" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
        {/* Ligne de séparation */}
        <hr className="my-2 border-gray-200" />
        {/* Infos */}
        <div className="px-8 pb-8 flex flex-col gap-6">
          {/* Email */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700 w-24">Email :</span>
            {isEditingEmail ? (
              <>
                <input
                  type="email"
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                />
                <button onClick={handleSaveEmail} className="text-green-600 font-semibold text-sm ml-2">Enregistrer</button>
                <button onClick={() => setIsEditingEmail(false)} className="text-gray-400 text-sm ml-1">Annuler</button>
              </>
            ) : (
              <>
                <span className="text-gray-800 text-sm">{email}</span>
                <button onClick={() => setIsEditingEmail(true)} className="text-purple-600 text-xs ml-2 hover:underline">Modifier</button>
              </>
            )}
          </div>
          {/* Nombre de notes de frais */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700 w-24">Notes :</span>
            <span className="text-gray-800 text-sm">{notesCount} notes de frais</span>
          </div>
          {/* Changement de mot de passe */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700 w-24">Mot de passe :</span>
            {isEditingPassword ? (
              <>
                <input
                  type="password"
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-purple-400"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                />
                <button onClick={handleSavePassword} className="text-green-600 font-semibold text-sm ml-2">Enregistrer</button>
                <button onClick={() => setIsEditingPassword(false)} className="text-gray-400 text-sm ml-1">Annuler</button>
              </>
            ) : (
              <button onClick={() => setIsEditingPassword(true)} className="text-purple-600 text-xs hover:underline">Changer le mot de passe</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
