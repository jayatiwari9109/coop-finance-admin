import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function Agents() {
  const [agentList, setAgentList] = useState([
    { 
      code: 'AGT-01', 
      name: 'Rahul Sharma', 
      area: 'Zone A - Vijay Nagar', 
      todayCollection: 15400, 
      status: 'Active',
      route: [
        { stop: 'Sector A, Plot 12', customer: 'Ramesh Kumar', status: 'Completed', amount: 5000 },
        { stop: 'Sch. 54, House 88', customer: 'Anjali Mehta', status: 'Completed', amount: 10400 },
        { stop: 'Scheme 78, Flat 302', customer: 'Sunil Rao', status: 'Pending', amount: 3000 }
      ]
    },
    { 
      code: 'AGT-02', 
      name: 'Vikas Gupta', 
      area: 'Zone B - Palasia', 
      todayCollection: 8900, 
      status: 'Active',
      route: [
        { stop: 'Old Palasia, Rd 4', customer: 'Priya Sharma', status: 'Completed', amount: 8900 },
        { stop: 'New Palasia, Sq 2', customer: 'Karan Singh', status: 'Pending', amount: 4500 }
      ]
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [selectedAgentRoute, setSelectedAgentRoute] = useState(null);
  const [formData, setFormData] = useState({ name: '', area: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      code: `AGT-0${agentList.length + 1}`,
      name: formData.name,
      area: formData.area,
      todayCollection: 0,
      status: 'Active',
      route: [
        { stop: 'Main Square - Stop 1', customer: 'Unassigned', status: 'Pending', amount: 0 }
      ]
    };
    setAgentList([...agentList, newEntry]);
    setIsModalOpen(false);
    setFormData({ name: '', area: '' });
  };

  const handleOpenRoute = (agent) => {
    setSelectedAgentRoute(agent);
    setIsRouteModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Doorstep Collection Agents</h1>
          <p className="text-xs text-slate-500 mt-0.5">Monitor agent field activity and live cash handovers</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#0284c7] hover:bg-[#026aa7] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          + Onboard New Agent
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Agent Code</th>
                <th className="p-3">Agent Name</th>
                <th className="p-3">Assigned Region</th>
                <th className="p-3">Today Collections</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentList.map((agent) => (
                <tr key={agent.code} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{agent.code}</td>
                  <td className="p-3 font-semibold text-slate-900">{agent.name}</td>
                  <td className="p-3">{agent.area}</td>
                  <td className="p-3 font-bold text-emerald-600">₹ {agent.todayCollection.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                      {agent.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleOpenRoute(agent)}
                      className="text-[#0284c7] font-semibold hover:underline cursor-pointer"
                    >
                      View Route
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Onboard New Agent */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard New Collection Agent">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Agent Full Name</label>
            <input required type="text" placeholder="Rahul Sharma" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-600">Assigned Region / Zone</label>
            <input required type="text" placeholder="Zone A - Vijay Nagar" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} className="w-full mt-1 text-xs border border-slate-200 p-2.5 rounded-xl focus:outline-sky-500" />
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs bg-[#0284c7] hover:bg-[#026aa7] text-white font-semibold rounded-xl cursor-pointer">Save Agent</button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: View Route Map Details */}
      <Modal isOpen={isRouteModalOpen} onClose={() => setIsRouteModalOpen(false)} title={`Assigned Route - ${selectedAgentRoute?.name || ''}`}>
        {selectedAgentRoute && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2">
              <span className="text-slate-500">Region: <strong className="text-slate-800">{selectedAgentRoute.area}</strong></span>
              <span className="text-slate-500">Agent Code: <strong className="font-mono text-slate-800">{selectedAgentRoute.code}</strong></span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <p className="text-[11px] font-bold text-slate-500 uppercase">Today's Scheduled Stops</p>
              {selectedAgentRoute.route.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-900">{item.stop}</p>
                    <p className="text-[11px] text-slate-500">Customer: {item.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">₹ {item.amount.toLocaleString('en-IN')}</p>
                    <span className={`text-[10px] font-bold ${item.status === 'Completed' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setIsRouteModalOpen(false)} className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer">Close Route</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}