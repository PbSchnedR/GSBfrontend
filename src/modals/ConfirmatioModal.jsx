import React from 'react';

const ConfirmationModal = ({
  isOpen = false,
  message = "Êtes-vous sûr ?",
  onConfirm = () => {},
  onCancel = () => {},
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-8 relative animate-fadeIn">
        <p className="text-lg text-gray-800 mb-6 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 font-medium"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;