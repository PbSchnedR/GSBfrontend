import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/GSB_logo.png';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // États pour le formulaire de connexion
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // États pour le formulaire d'inscription
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gsbbackend-jw66.onrender.com/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if(!data.token){
        alert('Email ou mot de passe incorrect');
        return;
      }
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  const handlesignup = async (e) => {
    e.preventDefault();
    if(signupPassword !== signupPasswordConfirm){
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    try {   
      const response = await fetch('https://gsbbackend-jw66.onrender.com/api/users', {
        method: 'POST',
        body: JSON.stringify({ 
          email: signupEmail, 
          password: signupPassword, 
          name: signupName, 
          role: "user" 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if(data){
        try {
          const response = await fetch('https://gsbbackend-jw66.onrender.com/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: signupEmail, password: signupPassword }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if(!data.token){
            alert('Email ou mot de passe incorrect');
            return;
          }
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
          navigate(0);
        } catch (error) {
          console.log(error);
        }
      }else{
        alert('Inscription échouée');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col items-center mb-10 space-y-4">
          {/* Logo ou icône ici */}
          <img src={logo} alt="GSB_logo" className="w-50 h-40" />
          <h2 className="text-2xl font-semibold mb-1 text-center">
            {isSignUp ? "Inscription" : "Connexion à votre compte"}
          </h2>
          <p className="text-gray-500 text-sm text-center">
            {isSignUp ? "Consultez vos notes de frais en toute simplicité !" : "Ravi de vous revoir ! Veuillez entrer vos informations."}
          </p>
        </div>
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-md border border-gray-200 ${isSignUp ? 'bg-white text-purple-600' : 'bg-gray-100 text-gray-500'} font-medium`}
            onClick={() => setIsSignUp(true)}
            type="button"
          >
            S'inscrire
          </button>
          <button
            className={`flex-1 py-2 rounded-r-md border border-gray-200 ${!isSignUp ? 'bg-white text-purple-600' : 'bg-gray-100 text-gray-500'} font-medium`}
            onClick={() => setIsSignUp(false)}
            type="button"
          >
            Se connecter
          </button>
        </div>
        {isSignUp ? (
          <form className="space-y-4" onSubmit={handlesignup}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input 
                type="text" 
                placeholder="Entrez votre nom complet" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input 
                type="password" 
                placeholder="Créez un mot de passe" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
              <span className="text-xs text-gray-400">Doit contenir au moins 8 caractères.</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmez le mot de passe</label>
              <input 
                type="password" 
                placeholder="Confirmez le mot de passe" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={signupPasswordConfirm}
                onChange={(e) => setSignupPasswordConfirm(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition"
            >
              S'inscrire
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Se souvenir pendant 30 jours
              </label>
              <a href="#" className="text-purple-600 hover:underline">Mot de passe oublié</a>
            </div>
            <button 
              type="submit" 
              className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition"
            >
              Se connecter
            </button>
          </form>
        )}
       
      </div>
    </div>
  );
};

export default Login; 