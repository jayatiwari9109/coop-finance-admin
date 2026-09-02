import React, { useState } from 'react';

export default function AddAgentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    assignedArea: '',
    dailyTarget: 5000,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: `AGT-0${Math.floor(Math.random() * 90 + 10)}`,
      ...formData,
      assignedCustomers: 0,
      todayCollected: 0,
      status: 'Active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-100">Add Collection Agent (SOW Sec 9)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Agent Name *</label>
              <input
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
                placeholder="Rahul Sharma"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Mobile Number *</label>
              <input
                type="text" required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Assigned Route/Area</label>
              <input
                type="text" required
                value={formData.assignedArea}
                onChange={(e) => setFormData({ ...formData, assignedArea: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
                placeholder="Zone A - Sector 4"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Daily Target Amount (₹)</label>
              <input
                type="number" required
                value={formData.dailyTarget}
                onChange={(e) => setFormData({ ...formData, dailyTarget: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold">Register Agent</button>
          </div>
        </form>
      </div>
    </div>
  );
}