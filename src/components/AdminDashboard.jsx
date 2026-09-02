import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('reconciliation');

  // SOW Section 2.1 Core Operational Metrics
  const [metrics] = useState({
    totalCustomers: 142,
    totalDeposits: 1245000,
    totalRDAccounts: 48,
    totalFDAccounts: 22,
    totalActiveLoans: 38,
    totalWithdrawals: 185000,
    todayCollection: 14200,
    pendingCollection: 3500,
  });

  const [reconciliationList, setReconciliationList] = useState([
    { id: 'REC-101', agent: 'Rahul Agent', totalCollected: 3500, cashSubmitted: 3500, status: 'Balanced' },
    { id: 'REC-102', agent: 'Amit Kumar', totalCollected: 5000, cashSubmitted: 4800, status: 'Discrepancy' },
    { id: 'REC-103', agent: 'Vikram Singh', totalCollected: 2700, cashSubmitted: 2700, status: 'Balanced' },
  ]);

  const [reports] = useState([
    { txId: 'TXN-901', date: '2026-09-02', agent: 'Rahul Agent', customer: 'Ramesh Sharma', type: 'RD Collection', amount: 1000 },
    { txId: 'TXN-902', date: '2026-09-02', agent: 'Amit Kumar', customer: 'Suresh Verma', type: 'Loan Installment', amount: 2500 },
    { txId: 'TXN-903', date: '2026-09-01', agent: 'Vikram Singh', customer: 'Aniket Patel', type: 'FD Deposit', amount: 5000 },
  ]);

  const handleSettleCash = (id) => {
    setReconciliationList(reconciliationList.map(item =>
      item.id === id ? { ...item, status: 'Balanced', cashSubmitted: item.totalCollected } : item
    ));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* 1. Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">Proprietor Executive Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Cooperative Finance & Doorstep Collection Real-time Operations
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
          >
            🔄 Sync Live Data
          </button>
        </div>
      </div>

      {/* 2. SOW Section 2.1 Complete 8-Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Customers</span>
            <h2 className="text-2xl font-extrabold text-slate-100 mt-1">{metrics.totalCustomers}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">👥</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Deposits</span>
            <h2 className="text-2xl font-extrabold text-emerald-400 mt-1">₹ {metrics.totalDeposits.toLocaleString()}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">💰</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">RD Accounts</span>
            <h2 className="text-2xl font-extrabold text-indigo-400 mt-1">{metrics.totalRDAccounts}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">📈</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">FD Accounts</span>
            <h2 className="text-2xl font-extrabold text-purple-400 mt-1">{metrics.totalFDAccounts}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">🏦</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Active Loans</span>
            <h2 className="text-2xl font-extrabold text-blue-400 mt-1">{metrics.totalActiveLoans}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">💳</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Total Withdrawals</span>
            <h2 className="text-2xl font-extrabold text-rose-400 mt-1">₹ {metrics.totalWithdrawals.toLocaleString()}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">💸</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Today's Collection</span>
            <h2 className="text-2xl font-extrabold text-amber-400 mt-1">₹ {metrics.todayCollection.toLocaleString()}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">✨</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Pending Collection</span>
            <h2 className="text-2xl font-extrabold text-orange-400 mt-1">₹ {metrics.pendingCollection.toLocaleString()}</h2>
          </div>
          <span className="text-2xl p-2.5 bg-slate-950 rounded-lg border border-slate-800">⏳</span>
        </div>

      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('reconciliation')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'reconciliation'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          ⚖️ Daily Cash Reconciliation (SOW Sec 13)
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          📄 Live Audit Logs & Reports (SOW Sec 15)
        </button>
      </div>

      {/* 4. Daily Reconciliation Module */}
      {activeTab === 'reconciliation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm md:text-base font-semibold text-slate-200">
              Collection Agent Cash Reconciliation Management
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare mobile app collected entries with physical cash submitted by doorstep agents.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm text-slate-300 border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Agent Name</th>
                  <th className="p-3">App Entry Total</th>
                  <th className="p-3">Physical Cash Submitted</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reconciliationList.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/50">
                    <td className="p-3 font-mono text-slate-400">{rec.id}</td>
                    <td className="p-3 font-semibold text-slate-100">{rec.agent}</td>
                    <td className="p-3 font-bold text-emerald-400">₹{rec.totalCollected}</td>
                    <td className="p-3 font-bold text-blue-400">₹{rec.cashSubmitted}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          rec.status === 'Balanced'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {rec.status !== 'Balanced' ? (
                        <button
                          onClick={() => handleSettleCash(rec.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg transition-colors shadow-sm font-medium"
                        >
                          Settle Cash
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Transaction Audit Module */}
      {activeTab === 'reports' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm md:text-base font-semibold text-slate-200">
                Centralized System Transaction Audit Log
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time collection entries submitted across all doorstep agents.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors"
            >
              🖨️ Export PDF Audit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm text-slate-300 border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="p-3">Txn ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Agent</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Transaction Type</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {reports.map((rpt) => (
                  <tr key={rpt.txId} className="hover:bg-slate-800/50">
                    <td className="p-3 font-mono text-blue-400">{rpt.txId}</td>
                    <td className="p-3">{rpt.date}</td>
                    <td className="p-3">{rpt.agent}</td>
                    <td className="p-3 font-semibold text-slate-100">{rpt.customer}</td>
                    <td className="p-3">{rpt.type}</td>
                    <td className="p-3 text-right font-bold text-emerald-400">₹{rpt.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}