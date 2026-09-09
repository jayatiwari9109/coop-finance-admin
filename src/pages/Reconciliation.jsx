import React, { useState, useEffect } from 'react';

export default function Reconciliation() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [auditData, setAuditData] = useState({
    totalDoorstepDeposits: 0,
    totalWithdrawals: 0,
    netSystemCash: 0,
    transactionLogs: []
  });
  const [physicalCash, setPhysicalCash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDailyAudit();
  }, [selectedDate]);

  const fetchDailyAudit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/reconciliation/daily-closing?date=${selectedDate}`);
      const data = await res.json();
      if (res.ok) setAuditData(data);
    } catch (err) {
      console.error('Error fetching audit data:', err);
    } finally {
      setLoading(false);
    }
  };

  const cashDifference = physicalCash ? Number(physicalCash) - auditData.netSystemCash : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">EOD Cash Reconciliation & Audit</h1>
          <p className="text-xs text-slate-500 mt-0.5">Match physical agent handovers against system collection ledger</p>
        </div>
        <input 
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="text-xs border border-slate-200 p-2 rounded-xl focus:outline-sky-500 bg-white"
        />
      </div>

      {/* Summary Audit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Doorstep Cash Collected</span>
          <h2 className="text-2xl font-extrabold text-emerald-600 mt-1">₹ {auditData.totalDoorstepDeposits.toLocaleString('en-IN')}</h2>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Payouts / Withdrawals</span>
          <h2 className="text-2xl font-extrabold text-rose-600 mt-1">- ₹ {auditData.totalWithdrawals.toLocaleString('en-IN')}</h2>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Expected Vault Cash</span>
          <h2 className="text-2xl font-extrabold text-sky-600 mt-1">₹ {auditData.netSystemCash.toLocaleString('en-IN')}</h2>
        </div>
      </div>

      {/* Cash Matching Tool */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800">Physical Cash Verification Tool</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Enter Actual Cash Received (Vault Count)</label>
            <input 
              type="number"
              placeholder="e.g. 15000"
              value={physicalCash}
              onChange={(e) => setPhysicalCash(e.target.value)}
              className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-semibold text-slate-600">Reconciliation Status</span>
            {physicalCash === '' ? (
              <p className="text-xs text-slate-400 mt-1">Enter vault cash count to calculate variance</p>
            ) : cashDifference === 0 ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-2 rounded-xl mt-1 text-center">
                ✓ Perfect Match! Zero Variance
              </span>
            ) : cashDifference > 0 ? (
              <span className="text-xs font-bold text-sky-600 bg-sky-50 border border-sky-200 p-2 rounded-xl mt-1 text-center">
                + ₹{cashDifference.toLocaleString('en-IN')} Surplus Cash Recorded
              </span>
            ) : (
              <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 p-2 rounded-xl mt-1 text-center">
                - ₹{Math.abs(cashDifference).toLocaleString('en-IN')} Cash Shortage Alert
              </span>
            )}
          </div>
        </div>
      </div>

      {/* EOD Transaction Log Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Day's Detailed Transaction Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Customer</th>
                <th className="p-2.5">Type</th>
                <th className="p-2.5">Agent / Mode</th>
                <th className="p-2.5">Time</th>
                <th className="p-2.5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="p-3 text-center text-slate-400">Loading day's audit logs...</td></tr>
              ) : auditData.transactionLogs.length === 0 ? (
                <tr><td colSpan="5" className="p-3 text-center text-slate-400">No transactions recorded for this date</td></tr>
              ) : (
                auditData.transactionLogs.map((tx, i) => (
                  <tr key={i}>
                    <td className="p-2.5 font-semibold text-slate-800">{tx.customerName}</td>
                    <td className="p-2.5 font-medium">
                      <span className={`px-2 py-0.5 text-[10px] rounded-md ${tx.type === 'Withdrawal' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-500">{tx.agentOrMode}</td>
                    <td className="p-2.5 text-slate-400">{new Date(tx.time).toLocaleTimeString()}</td>
                    <td className={`p-2.5 text-right font-bold ${tx.type === 'Withdrawal' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {tx.type === 'Withdrawal' ? `- ₹${tx.amount}` : `+ ₹${tx.amount}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}