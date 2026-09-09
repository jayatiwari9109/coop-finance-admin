import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Session restore hone tak blank space ya loader render karein
  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">Loading portal...</div>;
  }

  // Agar user null hai toh hi /login bhejega
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}