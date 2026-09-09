import React, { useState, useEffect } from 'react';

export default function Withdrawals() {
  const [customers, setCustomers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    amount: '',
    mode: 'Cash Handover',
    remark: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCustomers();
    fetchLogs();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customers');
      const data = await res.json();
      if (res.ok) setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/withdrawals/history');
      const data = await res.json();
      if (res.ok) setLogs(data);
    } catch (err) {
      console.error('Error fetching withdrawal logs:', err);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/withdrawals/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ customerId: '', amount: '', mode: 'Cash Handover', remark: '' });
        fetchCustomers();
        fetchLogs();
      } else {
        setMessage({ type: 'error', text: data.message || 'Withdrawal failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Savings Withdrawal & Payouts</h1>
        <p className="text-xs text-slate-500 mt-0.5">Process member balance cash/payout withdrawals securely</p>
      </div>

      {message.text && (
        <div className={`p-3 text-xs rounded-xl font-medium text-center ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <form onSubmit={handleWithdrawal} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Select Customer</label>
              <select
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
              >
                <option value="">-- Select Customer --</option>
                {customers.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.accountNumber || c.phone}) - Bal: ₹{c.balance || 0}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">Withdrawal Amount (₹)</label>
              <input
                type="number"
                required
                min="1"
                placeholder="Amount to debit"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Payout Mode</label>
              <select
                value={formData.mode}
                onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
              >
                <option value="Cash Handover">Cash Handover</option>
                <option value="Bank Transfer">Bank Transfer / UPI</option>
                <option value="Cheque">Cheque Payout</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">Remark / Reference</label>
              <input
                type="text"
                placeholder="e.g. Account Close, Personal Withdrawal"
                value={formData.remark}
                onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Processing Debit...' : 'Approve & Process Withdrawal'}
          </button>
        </form>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h2 className="text-sm font-bold text-slate-800 mb-3">Recent Withdrawal Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Customer</th>
                <th className="p-2.5">Payout Mode</th>
                <th className="p-2.5">Remark</th>
                <th className="p-2.5">Date</th>
                <th className="p-2.5 text-right">Debited Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length === 0 ? (
                <tr><td colSpan="5" className="p-3 text-center text-slate-400">No withdrawal records found</td></tr>
              ) : (
                logs.map((log, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-semibold text-slate-800">
                      {log.customerName}
                      <span className="block text-[10px] font-normal text-slate-400">{log.accountNumber}</span>
                    </td>
                    <td className="p-2.5 text-slate-600">{log.mode}</td>
                    <td className="p-2.5 text-slate-500">{log.remark || 'N/A'}</td>
                    <td className="p-2.5 text-slate-400">{new Date(log.date).toLocaleString()}</td>
                    <td className="p-2.5 text-right font-bold text-rose-600">- ₹ {log.amount?.toLocaleString('en-IN')}</td>
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