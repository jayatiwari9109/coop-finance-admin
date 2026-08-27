import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('reconciliation');

  // State for Reconciliation Module
  const [reconciliationList, setReconciliationList] = useState([
    { id: 'REC-01', agent: 'Rahul Agent', totalCollected: 3500, cashSubmitted: 3500, status: 'Balanced' },
    { id: 'REC-02', agent: 'Amit Kumar', totalCollected: 5000, cashSubmitted: 4800, status: 'Discrepancy' },
  ]);

  // State for Reports Module
  const [reports] = useState([
    { txId: 'TXN-901', date: '2026-08-25', agent: 'Rahul Agent', customer: 'Ramesh Sharma', type: 'RD', amount: 1000 },
    { txId: 'TXN-902', date: '2026-08-25', agent: 'Amit Kumar', customer: 'Suresh Verma', type: 'Loan EMI', amount: 2500 },
    { txId: 'TXN-903', date: '2026-08-24', agent: 'Rahul Agent', customer: 'Aniket Patel', type: 'Deposit', amount: 5000 },
  ]);

  // Handle Cash Verification Action
  const handleVerifyCash = (id) => {
    setReconciliationList(reconciliationList.map(item => 
      item.id === id ? { ...item, status: 'Balanced', cashSubmitted: item.totalCollected } : item
    ));
    alert(`Reconciliation ${id} Verified & Settled!`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      {/* Top Bar Header */}
      <header className="flex justify-between items-center pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-blue-400">CoOp Finance Admin</h1>
          <p className="text-xs text-slate-400">SOW Modules: Cash Reconciliation & Reports</p>
        </div>
      </header>

      {/* Module Switcher Tabs */}
      <div className="flex gap-4 my-6">
        {['reconciliation', 'reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {tab === 'reconciliation' ? 'Cash Settlement' : 'Reports & Audits'}
          </button>
        ))}
      </div>

      {/* MODULE 1: RECONCILIATION & CASH SETTLEMENT */}
      {activeTab === 'reconciliation' && (
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <h2 className="text-lg font-bold mb-4">Agent Daily Cash Reconciliation</h2>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Agent Name</th>
                <th className="p-3">App Total Collection</th>
                <th className="p-3">Physical Cash Recd</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reconciliationList.map((rec) => (
                <tr key={rec.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-3 font-mono text-xs">{rec.id}</td>
                  <td className="p-3 font-semibold text-white">{rec.agent}</td>
                  <td className="p-3 text-emerald-400 font-bold">₹{rec.totalCollected}</td>
                  <td className="p-3 text-blue-400 font-bold">₹{rec.cashSubmitted}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      rec.status === 'Balanced' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {rec.status !== 'Balanced' && (
                      <button 
                        onClick={() => handleVerifyCash(rec.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs font-semibold"
                      >
                        Settle & Match
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODULE 2: REPORTS & AUDIT LOGS */}
      {activeTab === 'reports' && (
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Transaction History Reports</h2>
            <button 
              onClick={() => window.print()} 
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              🖨️ Print / Save PDF
            </button>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">Txn ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rpt) => (
                <tr key={rpt.txId} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-3 font-mono text-xs text-blue-400">{rpt.txId}</td>
                  <td className="p-3 text-xs">{rpt.date}</td>
                  <td className="p-3">{rpt.agent}</td>
                  <td className="p-3 font-semibold text-white">{rpt.customer}</td>
                  <td className="p-3">{rpt.type}</td>
                  <td className="p-3 text-emerald-400 font-bold">₹{rpt.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}