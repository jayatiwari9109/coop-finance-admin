import React, { useState } from 'react';

export default function AddLoanModal({ isOpen, onClose, onSave }) {
  const [loan, setLoan] = useState({
    customer: '',
    type: 'Gold Loan',
    amount: 50000,
    tenureMonths: 12,
    interestRate: 12,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: `LN-${Math.floor(Math.random() * 900 + 100)}`,
      ...loan,
      outstanding: loan.amount,
      status: 'Active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-100">Disburse New Loan (SOW Sec 7)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Customer Name / ID *</label>
            <input
              type="text" required
              value={loan.customer}
              onChange={(e) => setLoan({ ...loan, customer: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              placeholder="Search or enter customer..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Loan Type</label>
              <select
                value={loan.type}
                onChange={(e) => setLoan({ ...loan, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              >
                <option value="Gold Loan">Gold Loan</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Mortgage Loan">Mortgage Loan</option>
                <option value="Personal Loan">Personal Loan</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Sanctioned Amount (₹)</label>
              <input
                type="number" required
                value={loan.amount}
                onChange={(e) => setLoan({ ...loan, amount: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Interest Rate (% p.a)</label>
              <input
                type="number" required
                value={loan.interestRate}
                onChange={(e) => setLoan({ ...loan, interestRate: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Tenure (Months)</label>
              <input
                type="number" required
                value={loan.tenureMonths}
                onChange={(e) => setLoan({ ...loan, tenureMonths: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold">Sanction & Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}