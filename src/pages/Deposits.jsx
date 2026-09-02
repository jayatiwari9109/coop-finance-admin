import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function Deposits() {
  const [deposits, setDeposits] = useState([
    { id: 'DEP-801', customer: 'Ramesh Kumar', agent: 'Rahul Sharma', amount: 1500, type: 'Daily Deposit', status: 'Verified' },
    { id: 'DEP-802', customer: 'Priya Sharma', agent: 'Vikas Gupta', amount: 5000, type: 'Pigmy Deposit', status: 'Pending' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ customer: '', agent: '', amount: '', type: 'Daily Deposit' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `DEP-${801 + deposits.length}`,
      customer: formData.customer,
      agent: formData.agent,
      amount: Number(formData.amount),
      type: formData.type,
      status: 'Pending',
    };
    setDeposits([...deposits, newEntry]);
    setIsModalOpen(false);
    setFormData({ customer: '', agent: '', amount: '', type: 'Daily Deposit' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Daily Deposits</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track and confirm collection entries</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Record Deposit
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Ref ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Agent</th>
                <th className="p-3">Deposit Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deposits.map((dep) => (
                <tr key={dep.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{dep.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{dep.customer}</td>
                  <td className="p-3">{dep.agent}</td>
                  <td className="p-3">{dep.type}</td>
                  <td className="p-3 font-bold text-emerald-600">₹ {dep.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                      dep.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {dep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Record New Deposit">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Customer Name</label>
            <input required type="text" placeholder="Ramesh Kumar" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Collecting Agent</label>
            <input required type="text" placeholder="Rahul Sharma" value={formData.agent} onChange={(e) => setFormData({...formData, agent: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Amount (₹)</label>
              <input required type="number" placeholder="1000" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Deposit Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500">
                <option>Daily Deposit</option>
                <option>Pigmy Deposit</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer">Save Deposit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}