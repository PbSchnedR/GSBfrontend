import React from 'react';
import CreateBillModal from '../modals/CreateBillModal';  
import { useState } from 'react';

const DashboardCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
  <>
  <div className="flex justify-center mb-6">
    <button
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md shadow"
      onClick={() => setIsModalOpen(true)}
    >
      + Nouvelle note de frais
    </button>
  </div>
  <CreateBillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default DashboardCTA; 