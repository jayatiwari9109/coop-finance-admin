import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function Loans() {
  const [loanList, setLoanList] = useState([
    { loanId: 'LN-5501', borrower: 'Amit Patel', sanctioned: 50000, emi: 4500, recovered: 18000, status: 'Active' },
    { loanId: 'LN-5502', borrower: 'Ramesh Kumar', sanctioned: 150000, emi: 12000, recovered: 150000, status: 'Closed' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ borrower: '', sanctioned: '', emi: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      loanId: `LN-${5501 + loanList.length}`,
      borrower: formData.borrower,
      sanctioned: Number(formData.sanctioned),
      emi: Number(formData.emi),
      recovered: 0,
      status: 'Active',
    };
    setLoanList([...loanList, newEntry]);
    setIsModalOpen(false);
    setFormData({ borrower: '', sanctioned: '', emi: '' });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Loan Accounts</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track active micro-loans, EMIs, and default risks</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + New Loan Application
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Loan Account ID</th>
                <th className="p-3">Borrower Name</th>
                <th className="p-3">Sanctioned Loan</th>
                <th className="p-3">Monthly EMI</th>
                <th className="p-3">Amount Recovered</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loanList.map((loan) => (
                <tr key={loan.loanId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{loan.loanId}</td>
                  <td className="p-3 font-semibold text-slate-900">{loan.borrower}</td>
                  <td className="p-3 font-bold text-slate-900">₹ {loan.sanctioned.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-semibold text-slate-700">₹ {loan.emi.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-bold text-emerald-600">₹ {loan.recovered.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                      loan.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-[#0284c7] font-semibold hover:underline cursor-pointer">Ledger</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Loan Application">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Borrower Name</label>
            <input required type="text" placeholder="Amit Patel" value={formData.borrower} onChange={(e) => setFormData({...formData, borrower: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Sanctioned Loan (₹)</label>
              <input required type="number" placeholder="50000" value={formData.sanctioned} onChange={(e) => setFormData({...formData, sanctioned: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Monthly EMI (₹)</label>
              <input required type="number" placeholder="4500" value={formData.emi} onChange={(e) => setFormData({...formData, emi: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#10b981] hover:bg-emerald-600 text-white font-semibold rounded-xl cursor-pointer">Approve Loan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}