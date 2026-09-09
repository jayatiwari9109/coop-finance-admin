import React, { useState, useEffect } from 'react';

export default function Agents() {
  const [agentList, setAgentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/collections/agents');
      const data = await res.json();
      if (res.ok) {
        setAgentList(data);
      }
    } catch (err) {
      console.error('Failed to fetch agent collection data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Doorstep Collection Agents</h1>
          <p className="text-xs text-slate-500 mt-0.5">Monitor agent field activity and live cash handovers</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Agent Name</th>
                <th className="p-3">Assigned Region</th>
                <th className="p-3">Today Collections</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-400">Loading live agent data...</td>
                </tr>
              ) : agentList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-slate-400">No agent collections logged today</td>
                </tr>
              ) : (
                agentList.map((agent, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">{agent.agentName}</td>
                    <td className="p-3 text-slate-500">{agent.region}</td>
                    <td className="p-3 font-bold text-emerald-600">
                      ₹ {agent.todayCollection?.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 text-[10px] rounded-full font-bold bg-emerald-100 text-emerald-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}