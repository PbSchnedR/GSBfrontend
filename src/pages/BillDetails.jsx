import React from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import BillDetailsSidebar from '../Components/BillDetails/Sidebar';
import BillImage from '../Components/BillDetails/BillImage';
import BillInfo from '../Components/BillDetails/BillInfo';

const BillDetails = ({
  image = 'https://media.licdn.com/dms/image/v2/D4E22AQGkIabYnbPs4A/feedshare-shrink_800/B4EZZdpcgAHEAo-/0/1745327869954?e=1750291200&v=beta&t=dalnK2apyb6O36wKLkYgDoXbfGrcvx7FtBOB1gJ-6H0',
  montant = '124,50 €',
  type = 'Repas',
  description = "Déjeuner d'équipe au restaurant Le Gourmet, Paris, le 12/06/2024.",
  dateNote = '12/06/2024',
  dateCreation = '13/06/2024'
}) => {
  return (
    <ThemeProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <div className="flex flex-col md:flex-row items-start w-full max-w-4xl mx-auto py-10 gap-8">
            <BillDetailsSidebar dateNote={dateNote} dateCreation={dateCreation} />
            <div className="flex-1 flex flex-col items-center w-full max-w-xl mx-auto">
              <BillImage image={image} />
              <BillInfo montant={montant} type={type} description={description} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default BillDetails; 