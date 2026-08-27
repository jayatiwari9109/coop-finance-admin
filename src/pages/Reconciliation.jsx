import React from 'react';
import DataTable from '../components/DataTable';

export default function Reconciliation() {
  const columns = [
    { header: 'Agent Name', accessor: 'agent' },
    { header: 'Collected Amount', accessor: 'collected' },
    { header: 'System Record', accessor: 'system' },
    { header: 'Status', accessor: 'status' },
  ];

  const data = [
    { agent: 'Rahul Agent', collected: '₹ 12,500', system: '₹ 12,500', status: 'Matched' },
    { agent: 'Amit Collection', collected: '₹ 8,000', system: '₹ 7,500', status: 'Mismatch' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Daily Cash Reconciliation Engine</h1>
      <DataTable columns={columns} data={data} searchParam="agent" />
    </div>
  );
}