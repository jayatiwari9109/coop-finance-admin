import React from 'react';

export default function Customers() {
  const customerList = [
    { id: "CUST-001", name: "Ramesh Sharma", phone: "+91 9876543210", status: "Active" },
    { id: "CUST-002", name: "Suresh Verma", phone: "+91 9876543211", status: "Active" },
    { id: "CUST-003", name: "Anita Gupta", phone: "+91 9876543212", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers Management</h1>
          <p className="text-sm text-slate-400 mt-1">Manage all registered account holders</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg font-medium">
          + Add Customer
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
            <tr>
              <th className="p-3">Customer ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((cust) => (
              <tr key={cust.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="p-3 font-mono text-xs text-blue-400">{cust.id}</td>
                <td className="p-3 font-semibold text-white">{cust.name}</td>
                <td className="p-3">{cust.phone}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    cust.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {cust.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}