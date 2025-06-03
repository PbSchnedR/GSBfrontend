import React from 'react';
import { HiDocument, HiTrash } from 'react-icons/hi';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FileList = ({ files }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleDelete = async (file) => {
    const response = await fetch(`http://127.0.0.1:3000/api/users/attachment/delete/delete?attachmentId=${file._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  
    const data = await response.json();
    console.log(data);
  
    if (response.status === 200) {
      navigate(0);
    } else {
      console.error('Erreur lors de la suppression de la pièce jointe:', data);
    }
  };
  

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Fichiers téléversés</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <HiDocument className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.size} • {file.type} • Ajouté le {file.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(file)}
                className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 flex items-center justify-between hover:bg-gray-50">
            <p className="text-gray-500">Aucun fichier téléversé</p>
          </div>
        )}
      </div>
    </div>
  );
};





export default FileList; 