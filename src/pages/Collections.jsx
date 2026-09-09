import React, { useState, useEffect } from 'react';

export default function Collections() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [agentName, setAgentName] = useState('Agent 01');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [agentLogs, setAgentLogs] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchAgentLogs();
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

  const fetchAgentLogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/collections/agents');
      const data = await res.json();
      if (res.ok) setAgentLogs(data);
    } catch (err) {
      console.error('Error fetching agent logs:', err);
    }
  };

  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/collections/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: selectedCustomer, amount, agentName })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: data.message });
        setAmount('');
        setSelectedCustomer('');
        fetchCustomers(); // Balance sync
        fetchAgentLogs(); // Agent total sync
      } else {
        setMessage({ type: 'error', text: data.message || 'Collection failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Doorstep Collection</h1>
        <p className="text-xs text-slate-500 mt-0.5">Log daily agent savings collection & update customer ledger</p>
      </div>

      {message.text && (
        <div className={`p-3 text-xs rounded-xl font-medium text-center ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Collection Form Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <form onSubmit={handleCollectionSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Agent Name / ID</label>
              <input 
                type="text" 
                required
                value={agentName} 
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600">Select Customer</label>
              <select
                required
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500 bg-white"
              >
                <option value="">-- Select Customer --</option>
                {customers.map((cust) => (
                  <option key={cust._id} value={cust._id}>
                    {cust.name} ({cust.accountNumber || cust.phone}) - Bal: ₹{cust.balance || 0}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600">Collected Deposit Amount (₹)</label>
            <input 
              type="number" 
              required
              min="1"
              placeholder="e.g. 100, 500" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Logging Entry...' : 'Submit Doorstep Collection'}
          </button>
        </form>
      </div>

      {/* Realtime Agent Summary Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h2 className="text-sm font-bold text-slate-800 mb-3">Live Agent Collection Totals</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Agent Name</th>
                <th className="p-2.5">Assigned Zone</th>
                <th className="p-2.5 text-right">Total Collected (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentLogs.length === 0 ? (
                <tr><td colSpan="3" className="p-3 text-center text-slate-400">No collection entries yet</td></tr>
              ) : (
                agentLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-semibold text-slate-800">{log.agentName}</td>
                    <td className="p-2.5 text-slate-500">{log.region}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">₹ {log.todayCollection?.toLocaleString('en-IN')}</td>
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