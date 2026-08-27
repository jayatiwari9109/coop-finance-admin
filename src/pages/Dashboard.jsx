import React from 'react';

export default function Dashboard() {
  const stats = [
    { label: "Total Customers", value: "1,248", change: "+12%", color: "text-blue-400" },
    { label: "Total RD Deposits", value: "₹ 14,25,000", change: "+8%", color: "text-emerald-400" },
    { label: "Total FD Deposits", value: "₹ 48,50,000", change: "+15%", color: "text-indigo-400" },
    { label: "Active Loans Out", value: "₹ 22,10,000", change: "-3%", color: "text-purple-400" },
  ];

  const recentTransactions = [
    { id: "TXN-9081", customer: "Ramesh Sharma", type: "RD Installment", amount: "₹ 1,000", status: "Success", date: "Today" },
    { id: "TXN-9082", customer: "Suresh Verma", type: "Loan EMI", amount: "₹ 4,500", status: "Success", date: "Today" },
    { id: "TXN-9083", customer: "Anita Gupta", type: "FD Creation", amount: "₹ 50,000", status: "Completed", date: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Cooperative Finance & Collection System Summary</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase">{item.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className={`text-2xl font-bold ${item.color}`}>{item.value}</span>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4">
        <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="p-3 font-mono text-xs text-blue-400">{txn.id}</td>
                  <td className="p-3 font-semibold text-white">{txn.customer}</td>
                  <td className="p-3">{txn.type}</td>
                  <td className="p-3 font-bold text-emerald-400">{txn.amount}</td>
                  <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-xs">{txn.status}</span></td>
                  <td className="p-3 text-slate-400">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}