import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Deposits from './pages/Deposits';
import RD from './pages/RD';
import FD from './pages/FD';
import Loans from './pages/Loans';
import Withdrawals from './pages/Withdrawals';
import Agents from './pages/Agents';
import Reconciliation from './pages/Reconciliation';
import Reports from './pages/Reports';
import Unauthorized from './pages/Unauthorized';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Unprotected Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes Block */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="rd" element={<RD />} />
              <Route path="fd" element={<FD />} />
              <Route path="loans" element={<Loans />} />
              <Route path="withdrawals" element={<Withdrawals />} />
              <Route path="agents" element={<Agents />} />
              <Route path="reconciliation" element={<Reconciliation />} />
              <Route path="reports" element={<Reports />} />
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}