import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth ? useAuth() : { user: true }; // Fallback for dev

  return user ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}