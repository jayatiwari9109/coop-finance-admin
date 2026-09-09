import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', balance: '' });

  // 1. Fetch Customers from MongoDB
  const fetchCustomers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/customers');
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 2. Create Customer in MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullName: formData.name,
      phone: formData.phone,
      address: formData.city,
      balance: Number(formData.balance || 0),
    };

    try {
      const res = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchCustomers(); // Reload latest list from DB
        setIsModalOpen(false);
        setFormData({ name: '', phone: '', city: '', balance: '' });
      }
    } catch (err) {
      console.error('Failed to add customer:', err);
    }
  };

  const handleOpenLedger = (customer) => {
    setSelectedCustomer(customer);
    setIsLedgerModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Customers Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage customer accounts and daily ledger profiles</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Add New Customer
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-xs text-slate-500 text-center py-4">Loading real-time customers from database...</p>
          ) : (
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Customer ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">City / Address</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => (
                  <tr key={c._id || c.accountNumber} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono text-slate-500">{c.accountNumber}</td>
                    <td className="p-3 font-semibold text-slate-900">{c.fullName}</td>
                    <td className="p-3">{c.phone}</td>
                    <td className="p-3">{c.address}</td>
                    <td className="p-3 font-bold text-slate-900">₹ {(c.balance || 0).toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                        {c.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleOpenLedger(c)}
                        className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                      >
                        View Ledger
                      </button>
                    </td>
                  </tr>
                ))}

                {customers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-slate-400">No customers found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal 1: Add New Customer */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Full Name</label>
            <input required type="text" placeholder="Ramesh Kumar" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Phone</label>
              <input required type="text" placeholder="+91 98765..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">City / Address</label>
              <input required type="text" placeholder="Indore" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Initial Deposit (₹)</label>
            <input type="number" placeholder="0" value={formData.balance} onChange={(e) => setFormData({...formData, balance: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer">Save Customer</button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Customer Financial Ledger */}
      <Modal isOpen={isLedgerModalOpen} onClose={() => setIsLedgerModalOpen(false)} title={`Account Statement Ledger - ${selectedCustomer?.fullName || ''}`}>
        {selectedCustomer && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-500">Customer ID: <strong className="font-mono text-slate-900">{selectedCustomer.accountNumber}</strong></p>
                <p className="text-slate-500">Contact: <strong className="text-slate-900">{selectedCustomer.phone}</strong></p>
              </div>
              <div className="text-right">
                <p className="text-slate-500">Total Net Balance</p>
                <p className="text-sm font-bold text-emerald-600">₹ {(selectedCustomer.balance || 0).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-500 text-[10px] uppercase sticky top-0 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCustomer.ledger && selectedCustomer.ledger.length > 0 ? (
                    selectedCustomer.ledger.map((tx, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5">{tx.date}</td>
                        <td className="p-2.5 font-semibold text-slate-900">{tx.desc}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 text-[9px] rounded-full font-bold ${
                            tx.type === 'Credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className={`p-2.5 text-right font-bold ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {tx.type === 'Credit' ? '+' : '-'} ₹ {tx.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-slate-400">No transaction records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setIsLedgerModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer">Close Ledger</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}