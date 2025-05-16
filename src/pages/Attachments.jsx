import React, { useState } from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import FileUploadZone from '../Components/Attachments/FileUploadZone';
import FileList from '../Components/Attachments/FileList';

const Attachments = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'facture_restaurant.pdf', size: '2.4 MB', date: '12/06/2024', type: 'PDF' },
    { id: 2, name: 'ticket_train.jpg', size: '1.8 MB', date: '10/06/2024', type: 'Image' },
    { id: 3, name: 'hotel_invoice.pdf', size: '3.2 MB', date: '08/06/2024', type: 'PDF' },
  ]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      id: Date.now(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toLocaleDateString(),
      type: file.type.split('/')[1].toUpperCase(),
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <h1 className="text-2xl font-bold mb-6">Justificatifs</h1>
          <FileUploadZone onFileUpload={handleFileUpload} />
          <FileList files={files} onDelete={handleDelete} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Attachments; 