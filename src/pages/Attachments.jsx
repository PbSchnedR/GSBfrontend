import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import FileUploadZone from '../Components/Attachments/FileUploadZone';
import FileList from '../Components/Attachments/FileList';
import { AuthContext } from '../context/AuthContext';

const Attachments = () => {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/users/attachment/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data);
        setFiles(data || []);

      } catch (error) {
        console.error('Erreur lors de la récupération des pièces jointes:', error);
      }
    })();
  }, [token]);

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
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Justificatifs</h1>
          <FileUploadZone onFileUpload={handleFileUpload} />
          <FileList files={files} onDelete={handleDelete} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Attachments; 