import React, { useState, useEffect } from 'react';

export default function Deposits() {
  const [customers, setCustomers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerId: '',
    depositType: 'FD',
    amount: '',
    interestRate: '7.5',
    tenureMonths: '12'
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCustomers();
    fetchDeposits();
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

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/deposits');
      const data = await res.json();
      if (res.ok) setDeposits(data);
    } catch (err) {
      console.error('Error fetching deposits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/deposits/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ customerId: '', depositType: 'FD', amount: '', interestRate: '7.5', tenureMonths: '12' });
        setShowModal(false);
        fetchDeposits();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to open account' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server error' });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fixed & Recurring Deposits</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage member savings, FD/RD accounts and interest calculations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
        >
          + Open FD / RD Account
        </button>
      </div>

      {message.text && (
        <div className={`p-3 text-xs rounded-xl font-medium text-center ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Deposits Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Type</th>
                <th className="p-3">Principal Amount</th>
                <th className="p-3">Interest Rate</th>
                <th className="p-3">Tenure</th>
                <th className="p-3">Est. Maturity Amount</th>
                <th className="p-3">Maturity Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="8" className="p-4 text-center text-slate-400">Loading deposits...</td></tr>
              ) : deposits.length === 0 ? (
                <tr><td colSpan="8" className="p-4 text-center text-slate-400">No deposit accounts found</td></tr>
              ) : (
                deposits.map((dep) => (
                  <tr key={dep._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      {dep.customerId?.name || 'N/A'}
                      <div className="text-[10px] font-normal text-slate-400">{dep.customerId?.accountNumber}</div>
                    </td>
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 text-[10px] rounded-md ${dep.depositType === 'FD' ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'}`}>
                        {dep.depositType}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-800">₹ {dep.amount?.toLocaleString('en-IN')}</td>
                    <td className="p-3">{dep.interestRate}% p.a.</td>
                    <td className="p-3">{dep.tenureMonths} Months</td>
                    <td className="p-3 font-bold text-emerald-600">₹ {dep.maturityAmount?.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-500">{new Date(dep.maturityDate).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                        {dep.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Account Opening */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Open Deposit Account</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600">Customer</label>
                <select
                  required
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
                >
                  <option value="">-- Select Customer --</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c._id}>{c.name} ({c.accountNumber || c.phone})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Deposit Type</label>
                  <select
                    value={formData.depositType}
                    onChange={(e) => setFormData({ ...formData, depositType: e.target.value })}
                    className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
                  >
                    <option value="FD">Fixed Deposit (FD)</option>
                    <option value="RD">Recurring Deposit (RD)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder={formData.depositType === 'FD' ? 'Total Amount' : 'Monthly Deposit'}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600">Tenure (Months)</label>
                  <input
                    type="number"
                    required
                    value={formData.tenureMonths}
                    onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
                    className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}