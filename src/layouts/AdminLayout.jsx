import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-2">
        <h2 className="text-xl font-bold text-blue-400 mb-6">CoOp Admin</h2>
        <nav className="space-y-1 text-sm flex flex-col">
          <Link to="/" className="p-2 hover:bg-slate-800 rounded">Dashboard</Link>
          <Link to="/customers" className="p-2 hover:bg-slate-800 rounded">Customers</Link>
          <Link to="/rd" className="p-2 hover:bg-slate-800 rounded">RD Accounts</Link>
          <Link to="/fd" className="p-2 hover:bg-slate-800 rounded">FD Accounts</Link>
          <Link to="/loans" className="p-2 hover:bg-slate-800 rounded">Loans</Link>
          <Link to="/withdrawals" className="p-2 hover:bg-slate-800 rounded">Withdrawals</Link>
          <Link to="/agents" className="p-2 hover:bg-slate-800 rounded">Agents</Link>
          <Link to="/reconciliation" className="p-2 hover:bg-slate-800 rounded">Reconciliation</Link>
          <Link to="/reports" className="p-2 hover:bg-slate-800 rounded">Reports</Link>
        </nav>
      </div>

      {/* Dynamic Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}