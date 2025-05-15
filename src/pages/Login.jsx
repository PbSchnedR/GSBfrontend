import React, { useState } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col items-center mb-10 space-y-4">
          {/* Logo ou icône ici */}
          <img src="/src/assets/GSB_logo.png" alt="GSB_logo" className="w-50 h-40" />
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
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input type="text" placeholder="Entrez votre nom complet" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="Entrez votre email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" placeholder="Créez un mot de passe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
              <span className="text-xs text-gray-400">Doit contenir au moins 8 caractères.</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmez le mot de passe</label>
              <input type="password" placeholder="Confirmez le mot de passe" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <button type="submit" className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition">S'inscrire</button>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="Entrez votre email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Se souvenir pendant 30 jours
              </label>
              <a href="#" className="text-purple-600 hover:underline">Mot de passe oublié</a>
            </div>
            <button type="submit" className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-semibold transition">Se connecter</button>
          </form>
        )}
        <div className="my-4 flex items-center">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">ou</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          {isSignUp ? "S'inscrire avec Google" : "Se connecter avec Google"}
        </button>
        <p className="mt-6 text-center text-sm text-gray-500">
          {isSignUp ? (
            <>Vous avez déjà un compte ?{' '}
              <button className="text-purple-600 hover:underline" onClick={() => setIsSignUp(false)}>Se connecter</button>
            </>
          ) : (
            <>Vous n'avez pas de compte ?{' '}
              <button className="text-purple-600 hover:underline" onClick={() => setIsSignUp(true)}>S'inscrire</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login; 