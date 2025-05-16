import React from 'react';

const BillImage = ({ image }) => {
  return (
    <div className="w-full aspect-square bg-gray-200 rounded-3xl overflow-hidden flex items-center justify-center mb-8">
      <img src={image} alt="Preuve" className="object-cover w-full h-full" />
    </div>
  );
};

export default BillImage; 