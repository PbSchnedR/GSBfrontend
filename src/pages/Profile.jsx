import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../common/Sidebar';
import { ThemeProvider } from '../common/ThemeContext';
import ProfileHeader from '../Components/Profile/ProfileHeader';
import PersonalInfoForm from '../Components/Profile/PersonalInfoForm';
import ProfileActions from '../Components/Profile/ProfileActions';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    rib: '',
    role: '',
    department: '',
  });
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/users/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
      console.log(data);  
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 lg:p-8">
          <div className="max-w-3xl mx-auto">
            <ProfileActions
              isEditing={isEditing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="space-y-6">
                <ProfileHeader profile={profile} />
                <PersonalInfoForm
                  isEditing={isEditing}
                  formData={formData}
                  handleChange={handleChange}
                  profile={profile}
                />

                {/* Sécurité */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Sécurité</h3>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Changer le mot de passe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Profile; 