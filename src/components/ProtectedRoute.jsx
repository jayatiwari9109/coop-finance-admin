import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  // Agar user logged in nahi hai, toh direct Login page par redirect karein
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}