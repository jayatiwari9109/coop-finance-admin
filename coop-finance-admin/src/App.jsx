import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Can } from './components/Can';
import DataTable from './components/DataTable';
import { ROLES, MODULES, ACTIONS } from './config/roles';

// Mock Auth Context setup for quick initial state
const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

// --- Dummy UI Screens ---
const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-600 font-semibold">Total Deposits</p>
        <p className="text-2xl font-bold text-blue-900 mt-1">₹ 12,45,000</p>
      </div>
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-600 font-semibold">Active Loans</p>
        <p className="text-2xl font-bold text-green-900 mt-1">₹ 8,30,000</p>
      </div>
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm text-purple-600 font-semibold">Today's Collections</p>
        <p className="text-2xl font-bold text-purple-900 mt-1">₹ 45,200</p>
      </div>
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-600 font-semibold">Pending Reconciliation</p>
        <p className="text-2xl font-bold text-amber-900 mt-1">3 Accounts</p>
      </div>
    </div>
  </div>
);

const Customers = () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Account No', accessor: 'accountNo' },
    { header: 'Mobile', accessor: 'mobile' },
  ];

  const data = [
    { id: 1, name: 'Ramesh Sharma', accountNo: 'ACC-1001', mobile: '9876543210' },
    { id: 2, name: 'Suresh Verma', accountNo: 'ACC-1002', mobile: '9876543211' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <Can module={MODULES.CUSTOMERS} action={ACTIONS.CREATE}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            + Add Customer
          </button>
        </Can>
      </div>
      <DataTable columns={columns} data={data} searchParam="name" />
    </div>
  );
};

export default function App() {
  // Current user state for testing RBAC
  const [user, setUser] = useState({
    name: 'Admin User',
    role: ROLES.SUPER_ADMIN,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="min-h-screen flex bg-gray-100 font-sans">
          {/* Sidebar */}
          <div className="w-64 bg-slate-900 text-slate-100 flex flex-col">
            <div className="p-4 text-xl font-bold border-b border-slate-800">
              Coop Finance Admin
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link to="/" className="block px-3 py-2 rounded hover:bg-slate-800">Dashboard</Link>
              <Link to="/customers" className="block px-3 py-2 rounded hover:bg-slate-800">Customers</Link>
            </nav>
            <div className="p-4 border-t border-slate-800">
              <p className="text-xs text-slate-400">Logged in as:</p>
              <p className="text-sm font-semibold">{user.name} ({user.role})</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}