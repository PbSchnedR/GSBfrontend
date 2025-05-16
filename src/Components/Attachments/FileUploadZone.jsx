import React from 'react';
import { HiUpload } from 'react-icons/hi';

const FileUploadZone = ({ onFileUpload }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <HiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">Téléverser des fichiers</h2>
        <p className="text-gray-500 mb-4">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
        <input
          type="file"
          multiple
          onChange={onFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 cursor-pointer inline-block"
        >
          Sélectionner des fichiers
        </label>
      </div>
    </div>
  );
};

export default FileUploadZone; 