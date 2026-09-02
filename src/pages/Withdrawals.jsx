import React from 'react';

export default function Withdrawals() {
  const withdrawalList = [
    { reqId: 'WTH-301', customer: 'Priya Sharma', amount: '₹ 10,000', type: 'Savings Payout', date: '2026-09-02', status: 'Approved' },
    { reqId: 'WTH-302', customer: 'Amit Patel', amount: '₹ 5,000', type: 'Loan Disbursement', date: '2026-09-02', status: 'Pending Approval' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Withdrawal Requests</h1>
          <p className="text-xs text-slate-500">Review payout and doorstep withdrawal authorizations</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Request ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Withdrawal Amount</th>
                <th className="p-3">Account Category</th>
                <th className="p-3">Date Requested</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {withdrawalList.map((wth) => (
                <tr key={wth.reqId} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-500">{wth.reqId}</td>
                  <td className="p-3 font-semibold text-slate-900">{wth.customer}</td>
                  <td className="p-3 font-bold text-rose-600">{wth.amount}</td>
                  <td className="p-3">{wth.type}</td>
                  <td className="p-3">{wth.date}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${
                      wth.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {wth.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button className="text-emerald-600 font-semibold hover:underline">Approve</button>
                    <button className="text-rose-500 hover:underline">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}