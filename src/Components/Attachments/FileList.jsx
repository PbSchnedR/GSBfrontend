import React from 'react';
import { HiDocument, HiTrash } from 'react-icons/hi';

const FileList = ({ files, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Fichiers téléversés</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {files.map((file) => (
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
              onClick={() => onDelete(file.id)}
              className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
            >
              <HiTrash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList; 