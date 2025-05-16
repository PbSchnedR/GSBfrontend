import React from 'react';
import { HiPencil, HiCheck, HiX } from 'react-icons/hi';

const ProfileActions = ({ isEditing, handleEdit, handleSave, handleCancel }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Mon compte</h1>
      {!isEditing ? (
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <HiPencil className="w-5 h-5" />
          <span>Modifier</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <HiCheck className="w-5 h-5" />
            <span>Enregistrer</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            <HiX className="w-5 h-5" />
            <span>Annuler</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileActions; 