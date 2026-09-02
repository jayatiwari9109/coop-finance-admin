import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/customers', label: 'Customers' },
    { path: '/deposits', label: 'Deposits' },
    { path: '/rd', label: 'Recurring Deposits' },
    { path: '/fd', label: 'Fixed Deposits' },
    { path: '/loans', label: 'Loans' },
    { path: '/withdrawals', label: 'Withdrawals' },
    { path: '/agents', label: 'Agents' },
    { path: '/reconciliation', label: 'Reconciliation' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800 font-sans relative">
      
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden transition-opacity"
        />
      )}

      {/* 1. Responsive Sidebar Drawer */}
      <aside 
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-64 bg-[#0284c7] text-white flex flex-col justify-between p-4 transform transition-transform duration-300 ease-in-out shadow-md ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Mobile Close Button + Logo */}
          <div className="flex items-center justify-between px-2 py-3 mb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white text-[#0284c7] rounded-xl flex items-center justify-center font-bold text-base shadow-sm">
                CF
              </div>
              <div>
                <h1 className="text-base font-bold leading-none tracking-wide text-white">CoOp Finance</h1>
                <span className="text-[10px] text-sky-100 font-medium">Doorstep Admin</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 p-1 rounded-lg text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#0284c7] shadow-sm font-bold'
                      : 'text-sky-100 hover:bg-sky-500/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profile */}
        <div className="border-t border-white/20 pt-3 px-2 flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white shrink-0">
            AU
          </div>
          <div className="leading-tight overflow-hidden">
            <span className="font-bold text-white block truncate">Admin User</span>
            <span className="text-[10px] text-sky-200 truncate block">admin@coopfinance.com</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Light Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        
        {/* Responsive Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg text-lg font-bold"
            >
              ☰
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Dashboard</h2>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden xs:block">Manage your finance operations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 lg:w-64 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0284c7] font-bold text-xs flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Inner Page */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}