import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function FD() {
  const [fdList, setFdList] = useState([
    { fdNo: 'FD-301', customer: 'Vikram Singh', principal: 100000, rate: '8.5%', maturityDate: '2027-09-02', status: 'Active' },
    { fdNo: 'FD-302', customer: 'Sunita Sharma', principal: 50000, rate: '8.0%', maturityDate: '2026-12-10', status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedFd, setSelectedFd] = useState(null);
  const [formData, setFormData] = useState({ customer: '', principal: '', rate: '8.5%', maturityDate: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      fdNo: `FD-${301 + fdList.length}`,
      customer: formData.customer,
      principal: Number(formData.principal),
      rate: `${formData.rate}%`,
      maturityDate: formData.maturityDate,
      status: 'Active',
    };
    setFdList([...fdList, newEntry]);
    setIsModalOpen(false);
    setFormData({ customer: '', principal: '', rate: '8.5%', maturityDate: '' });
  };

  const handleOpenCertificate = (fd) => {
    setSelectedFd(fd);
    setIsCertModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Fixed Deposit (FD) Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Monitor maturity dates & long-term deposits</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Issue New FD
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">FD Acc No</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Principal Amount</th>
                <th className="p-3">Interest Rate</th>
                <th className="p-3">Maturity Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fdList.map((fd) => (
                <tr key={fd.fdNo} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{fd.fdNo}</td>
                  <td className="p-3 font-semibold text-slate-900">{fd.customer}</td>
                  <td className="p-3 font-bold text-emerald-600">₹ {fd.principal.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-semibold text-slate-700">{fd.rate}</td>
                  <td className="p-3">{fd.maturityDate}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                      {fd.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleOpenCertificate(fd)}
                      className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                    >
                      Certificate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Issue New FD */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Issue New Fixed Deposit">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Customer Name</label>
            <input required type="text" placeholder="Vikram Singh" value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Principal Amount (₹)</label>
            <input required type="number" placeholder="50000" value={formData.principal} onChange={(e) => setFormData({...formData, principal: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Interest Rate (%)</label>
              <input required type="text" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600">Maturity Date</label>
              <input required type="date" value={formData.maturityDate} onChange={(e) => setFormData({...formData, maturityDate: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer">Issue FD</button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: FD Certificate View */}
      <Modal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} title={`Fixed Deposit Certificate`}>
        {selectedFd && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Certificate No</p>
                  <p className="font-mono text-sm font-bold text-slate-900">{selectedFd.fdNo}</p>
                </div>
                <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                  {selectedFd.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="text-slate-500 text-[11px]">Account Holder</p>
                  <p className="font-semibold text-slate-900">{selectedFd.customer}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[11px]">Interest Rate</p>
                  <p className="font-semibold text-slate-900">{selectedFd.rate}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[11px]">Principal Amount</p>
                  <p className="font-bold text-emerald-600">₹ {selectedFd.principal.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[11px]">Maturity Date</p>
                  <p className="font-semibold text-slate-900">{selectedFd.maturityDate}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer"
              >
                Print Certificate
              </button>
              <button onClick={() => setIsCertModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}