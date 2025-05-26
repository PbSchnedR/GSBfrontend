import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  // const { token, user } = useContext(AuthContext);
  const token = localStorage.getItem('token');


  // Vérifie si le token ET l'utilisateur existent
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
