import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function Reconciliation() {
  const [recList, setRecList] = useState([
    { id: 'REC-101', agent: 'Rahul Sharma', collection: 15400, deposited: 15400, variance: 0, status: 'Matched', date: '2026-09-02' },
    { id: 'REC-102', agent: 'Vikas Gupta', collection: 9500, deposited: 8900, variance: 600, status: 'Mismatch', date: '2026-09-02' },
  ]);

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);

  const [auditFormData, setAuditFormData] = useState({ agent: '', date: '', collection: '', deposited: '' });

  const handleAuditRun = (e) => {
    e.preventDefault();
    const collection = Number(auditFormData.collection);
    const deposited = Number(auditFormData.deposited);
    const variance = Math.max(0, collection - deposited);

    const newEntry = {
      id: `REC-${101 + recList.length}`,
      agent: auditFormData.agent,
      collection: collection,
      deposited: deposited,
      variance: variance,
      status: variance === 0 ? 'Matched' : 'Mismatch',
      date: auditFormData.date || new Date().toISOString().split('T')[0],
    };

    setRecList([newEntry, ...recList]);
    setIsAuditModalOpen(false);
    setAuditFormData({ agent: '', date: '', collection: '', deposited: '' });
  };

  const handleOpenSlip = (item) => {
    setSelectedSlip(item);
    setIsSlipModalOpen(true);
  };

  const handleResolveVariance = (id) => {
    setRecList(recList.map(item => 
      item.id === id ? { ...item, variance: 0, status: 'Matched' } : item
    ));
    setIsSlipModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Daily Cash Reconciliation</h1>
          <p className="text-xs text-slate-500 mt-0.5">Verify agent cash collections against bank deposits</p>
        </div>
        <button 
          onClick={() => setIsAuditModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Run Audit Match
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Rec ID</th>
                <th className="p-3">Agent Name</th>
                <th className="p-3">Collected Cash</th>
                <th className="p-3">Bank Deposited</th>
                <th className="p-3">Variance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recList.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{rec.id}</td>
                  <td className="p-3 font-semibold text-slate-900">{rec.agent}</td>
                  <td className="p-3 font-bold text-slate-900">₹ {rec.collection.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-bold text-emerald-600">₹ {rec.deposited.toLocaleString('en-IN')}</td>
                  <td className={`p-3 font-bold ${rec.variance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                    ₹ {rec.variance.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                      rec.status === 'Matched' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleOpenSlip(rec)}
                      className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                    >
                      Verify Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Run Audit Form */}
      <Modal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} title="Run Cash Audit Match">
        <form onSubmit={handleAuditRun} className="space-y-4">
          <p className="text-xs text-slate-500">Manual tally verification for daily agent handovers.</p>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Agent Name</label>
            <input required type="text" placeholder="e.g. Rahul Sharma" value={auditFormData.agent} onChange={(e) => setAuditFormData({...auditFormData, agent: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Audit Date</label>
            <input required type="date" value={auditFormData.date} onChange={(e) => setAuditFormData({...auditFormData, date: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Total Collected (₹)</label>
              <input required type="number" placeholder="10000" value={auditFormData.collection} onChange={(e) => setAuditFormData({...auditFormData, collection: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Bank Deposited (₹)</label>
              <input required type="number" placeholder="10000" value={auditFormData.deposited} onChange={(e) => setAuditFormData({...auditFormData, deposited: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsAuditModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer">Submit Audit</button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Verify Slip Viewer & Action */}
      <Modal isOpen={isSlipModalOpen} onClose={() => setIsSlipModalOpen(false)} title={`Deposit Voucher Slip #${selectedSlip?.id || ''}`}>
        {selectedSlip && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between"><span className="text-slate-500">Agent Name:</span> <span className="font-semibold text-slate-900">{selectedSlip.agent}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Date:</span> <span className="font-semibold text-slate-900">{selectedSlip.date}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Collected Amount:</span> <span className="font-semibold text-slate-900">₹ {selectedSlip.collection.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Bank Deposited:</span> <span className="font-semibold text-emerald-600">₹ {selectedSlip.deposited.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-2"><span className="text-slate-500">Variance Unaccounted:</span> <span className={`font-bold ${selectedSlip.variance > 0 ? 'text-rose-600' : 'text-slate-400'}`}>₹ {selectedSlip.variance}</span></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {selectedSlip.variance > 0 && (
                <button 
                  onClick={() => handleResolveVariance(selectedSlip.id)} 
                  className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl cursor-pointer"
                >
                  Clear Variance Match
                </button>
              )}
              <button onClick={() => setIsSlipModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}