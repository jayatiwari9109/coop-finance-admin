import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Loans() {
  const [loanList, setLoanList] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null); // For Ledger Modal

  const [formData, setFormData] = useState({ 
    customerId: '', 
    sanctioned: '', 
    interestRate: '12', 
    tenureMonths: '12' 
  });

  useEffect(() => {
    fetchLoans();
    fetchCustomers();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      setError('');
      // Relative Path `/api/loans` (Vite Proxy compatible)
      const res = await fetch('/api/loans');
      const data = await res.json();
      if (res.ok) {
        setLoanList(data);
        // Sync selected loan ledger if open
        if (selectedLoan) {
          const updated = data.find(l => l._id === selectedLoan._id);
          if (updated) setSelectedLoan(updated);
        }
      } else {
        setError(data.message || 'Failed to load loans');
      }
    } catch (err) {
      setError('Server connection error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      // Relative Path `/api/customers`
      const res = await fetch('/api/customers');
      const data = await res.json();
      if (res.ok) setCustomers(data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  // Pay EMI Action
  const handlePayEMI = async (loanId, installmentNo) => {
    try {
      // Relative Path `/api/loans/:id/pay-emi`
      const res = await fetch(`/api/loans/${loanId}/pay-emi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ installmentNo })
      });

      const data = await res.json();

      if (res.ok) {
        fetchLoans(); // Refresh main list & modal state
      } else {
        alert(data.message || 'Payment failed');
      }
    } catch (err) {
      alert('Error updating EMI status');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Relative Path `/api/loans/apply`
      const res = await fetch('/api/loans/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: formData.customerId,
          loanAmount: Number(formData.sanctioned),
          interestRate: Number(formData.interestRate),
          tenureMonths: Number(formData.tenureMonths),
        }),
      });

      if (res.ok) {
        fetchLoans();
        setIsModalOpen(false);
        setFormData({ customerId: '', sanctioned: '', interestRate: '12', tenureMonths: '12' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Loan Accounts</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track active micro-loans, EMIs, and repayment ledgers</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#10b981] hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          + New Loan Application
        </button>
      </div>

      {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium text-center">{error}</div>}

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Loan ID</th>
                <th className="p-3">Borrower Name</th>
                <th className="p-3">Sanctioned</th>
                <th className="p-3">Monthly EMI</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center text-slate-400">Loading...</td></tr>
              ) : loanList.length === 0 ? (
                <tr><td colSpan="6" className="p-4 text-center text-slate-400">No active loan records found</td></tr>
              ) : loanList.map((loan) => (
                <tr key={loan._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{loan._id?.slice(-6).toUpperCase()}</td>
                  <td className="p-3 font-semibold text-slate-900">{loan.customerId?.name || 'N/A'}</td>
                  <td className="p-3 font-bold text-slate-900">₹ {loan.loanAmount?.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-semibold text-emerald-600">₹ {loan.emiAmount?.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                      loan.status === 'Closed' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => setSelectedLoan(loan)}
                      className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                    >
                      View Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ledger Modal */}
      {selectedLoan && (
        <Modal isOpen={!!selectedLoan} onClose={() => setSelectedLoan(null)} title={`Loan Ledger - ${selectedLoan.customerId?.name || 'Customer'}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border text-xs text-center">
              <div><p className="text-[10px] text-slate-400">Total Amount</p><p className="font-bold text-slate-800">₹{selectedLoan.loanAmount}</p></div>
              <div><p className="text-[10px] text-slate-400">Monthly EMI</p><p className="font-bold text-emerald-600">₹{selectedLoan.emiAmount}</p></div>
              <div><p className="text-[10px] text-slate-400">Tenure</p><p className="font-bold text-slate-800">{selectedLoan.tenureMonths} Months</p></div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {selectedLoan.emiSchedule?.map((emi) => (
                <div key={emi.installmentNo} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">EMI #{emi.installmentNo}</p>
                    <p className="text-[10px] text-slate-400">Due: {new Date(emi.dueDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700">₹{emi.amount}</span>
                    {emi.status === 'Paid' ? (
                      <span className="px-2 py-1 text-[10px] bg-emerald-100 text-emerald-700 font-bold rounded-lg">Paid</span>
                    ) : (
                      <button 
                        onClick={() => handlePayEMI(selectedLoan._id, emi.installmentNo)}
                        className="px-2.5 py-1 text-[10px] bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg cursor-pointer"
                      >
                        Collect EMI
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* New Loan Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Loan Application">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Select Customer</label>
            <select required value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} className="w-full mt-1 text-xs border p-2.5 rounded-xl bg-white">
              <option value="">-- Choose Customer --</option>
              {customers.map((cust) => <option key={cust._id} value={cust._id}>{cust.name} ({cust.accountNumber || cust.phone})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Amount (₹)</label>
              <input required type="number" value={formData.sanctioned} onChange={(e) => setFormData({ ...formData, sanctioned: e.target.value })} className="w-full mt-1 text-xs border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Interest (%)</label>
              <input required type="number" value={formData.interestRate} onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })} className="w-full mt-1 text-xs border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Tenure (Mo)</label>
              <input required type="number" value={formData.tenureMonths} onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })} className="w-full mt-1 text-xs border p-2.5 rounded-xl" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-2 text-xs text-slate-600 rounded-xl">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#10b981] text-white font-semibold rounded-xl cursor-pointer">Approve Loan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}