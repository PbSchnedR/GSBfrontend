import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import FileUploadZone from '../Components/Attachments/FileUploadZone';
import FileList from '../Components/Attachments/FileList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Attachments = () => {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/attachment/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setFiles(data || []);

      } catch (error) {
        console.error('Erreur lors de la récupération des pièces jointes:', error);
      }
    })();
  }, [token]);

  const handleFileUpload = (event) => {
    const formData = new FormData();
    const selectedFiles = Array.from(event.target.files);
  
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
    }));
    setFiles([...files, ...newFiles]);
  
    selectedFiles.forEach(file => {
      formData.append('proof', file);         
      formData.append('name', file.name);
    });
  
    fetch(`${import.meta.env.VITE_API_URL}/api/users/attachment/create`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Upload success:', data);
        navigate(0);
      })
      .catch(error => {
        console.error('Upload error:', error);
      });
  };
  

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <h1 className="text-2xl font-bold mb-6">Justificatifs</h1>
          <FileUploadZone onFileUpload={handleFileUpload} />
          <FileList files={files} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Attachments; 