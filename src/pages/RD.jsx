import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function RD() {
  const [rdList, setRdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassbookModalOpen, setIsPassbookModalOpen] = useState(false);
  const [selectedRd, setSelectedRd] = useState(null);
  const [formData, setFormData] = useState({ customer: '', emi: '', tenure: '12', dueDate: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRDs();
  }, []);

  // Fetch all RDs from Backend API
  const fetchRDs = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/rds');
      const data = await res.json();
      if (res.ok) setRdList(data);
    } catch (err) {
      console.error('Error fetching RDs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Submit New RD to Database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/rds/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchRDs();
        setIsModalOpen(false);
        setFormData({ customer: '', emi: '', tenure: '12', dueDate: '' });
      }
    } catch (err) {
      console.error('Error creating RD:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenPassbook = (rd) => {
    setSelectedRd(rd);
    setIsPassbookModalOpen(true);
  };

  // Record Installment Payment via API
  const handlePayInstallment = async (rdId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/rds/pay-installment/${rdId}`, {
        method: 'POST'
      });
      const updatedRd = await res.json();
      if (res.ok) {
        setSelectedRd(updatedRd);
        fetchRDs();
      }
    } catch (err) {
      console.error('Error paying installment:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Recurring Deposit (RD) Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track installments & active RD plans</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Create New RD
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">RD Acc No</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Monthly EMI</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Next Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="7" className="p-4 text-center text-slate-400">Loading RD Accounts...</td></tr>
              ) : rdList.length === 0 ? (
                <tr><td colSpan="7" className="p-4 text-center text-slate-400">No RD Accounts found</td></tr>
              ) : (
                rdList.map((rd) => (
                  <tr key={rd._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono text-slate-500">{rd.rdNo}</td>
                    <td className="p-3 font-semibold text-slate-900">{rd.customer}</td>
                    <td className="p-3 font-bold text-emerald-600">₹ {rd.emi?.toLocaleString('en-IN')}</td>
                    <td className="p-3">{`${rd.paidCount}/${rd.totalTenure} Paid`}</td>
                    <td className="p-3">{rd.dueDate}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                        rd.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {rd.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleOpenPassbook(rd)}
                        className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                      >
                        Passbook
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Create New RD Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New RD Account">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Customer Name</label>
            <input required type="text" placeholder="Suresh Verma" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Monthly EMI (₹)</label>
            <input required type="number" placeholder="1000" value={formData.emi} onChange={(e) => setFormData({...formData, emi: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Tenure (Months)</label>
              <input required type="number" value={formData.tenure} onChange={(e) => setFormData({...formData, tenure: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">First Due Date</label>
              <input required type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer disabled:opacity-50">
              {submitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: RD Digital Passbook */}
      <Modal isOpen={isPassbookModalOpen} onClose={() => setIsPassbookModalOpen(false)} title={`RD Digital Passbook - ${selectedRd?.rdNo || ''}`}>
        {selectedRd && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-500">Holder: <strong className="text-slate-900">{selectedRd.customer}</strong></p>
                <p className="text-slate-500">Monthly Deposit: <strong className="text-emerald-600">₹ {selectedRd.emi?.toLocaleString('en-IN')}</strong></p>
              </div>
              <div className="text-right">
                <p className="text-slate-500">Progress: <strong className="text-slate-900">{`${selectedRd.paidCount}/${selectedRd.totalTenure} Paid`}</strong></p>
                <span className={`text-[10px] font-bold ${selectedRd.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {selectedRd.status}
                </span>
              </div>
            </div>

            <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-500 text-[10px] uppercase sticky top-0 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Inst. #</th>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Amount Paid</th>
                    <th className="p-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedRd.transactions && selectedRd.transactions.length > 0 ? (
                    selectedRd.transactions.map((tx) => (
                      <tr key={tx.installmentNo}>
                        <td className="p-2.5 font-mono">#{tx.installmentNo}</td>
                        <td className="p-2.5">{new Date(tx.date).toLocaleDateString()}</td>
                        <td className="p-2.5 font-bold text-slate-900">₹ {tx.amount?.toLocaleString('en-IN')}</td>
                        <td className="p-2.5 text-right font-semibold text-emerald-600">{tx.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-slate-400">No installments paid yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              {selectedRd.status === 'Active' ? (
                <button 
                  onClick={() => handlePayInstallment(selectedRd._id)}
                  className="px-3.5 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl cursor-pointer"
                >
                  + Record Installment Payment
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-semibold">RD Plan Completed</span>
              )}
              <button onClick={() => setIsPassbookModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}