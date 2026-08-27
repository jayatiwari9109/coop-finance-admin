import React from 'react';
import DataTable from './DataTable';

export const Deposits = () => {
  const columns = [
    { header: 'Account No', accessor: 'accountNo' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Type', accessor: 'type' },
    { header: 'Balance (₹)', accessor: 'balance' },
    { header: 'Maturity Date', accessor: 'maturityDate' },
  ];

  const depositData = [
    { accountNo: 'RD-9012', customerName: 'Ramesh Sharma', type: 'Recurring Deposit', balance: '₹ 24,000', maturityDate: '15-12-2027' },
    { accountNo: 'FD-4011', customerName: 'Suresh Verma', type: 'Fixed Deposit', balance: '₹ 1,50,000', maturityDate: '10-08-2028' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">RD / FD & Deposit Tracking</h1>
      <DataTable columns={columns} data={depositData} searchParam="customerName" />
    </div>
  );
};

export default Deposits;