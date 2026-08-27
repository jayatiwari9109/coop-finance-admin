export const initialCustomers = [
  { id: 1, name: 'Ramesh Sharma', accountNo: 'ACC-1001', mobile: '9876543210', agent: 'Rahul Agent', status: 'Active' },
  { id: 2, name: 'Suresh Verma', accountNo: 'ACC-1002', mobile: '9876543211', agent: 'Amit Collection', status: 'Active' },
  { id: 3, name: 'Priya Singh', accountNo: 'ACC-1003', mobile: '9876543212', agent: 'Rahul Agent', status: 'Active' },
];

export const initialTransactions = [
  { id: 'TXN-9901', customer: 'Ramesh Sharma', agent: 'Rahul Agent', type: 'RD Collection', amount: 1000, date: '2026-08-25 10:30 AM', status: 'Synced' },
  { id: 'TXN-9902', customer: 'Suresh Verma', agent: 'Amit Collection', type: 'Loan EMI', amount: 2500, date: '2026-08-25 11:15 AM', status: 'Synced' },
  { id: 'TXN-9903', customer: 'Priya Singh', agent: 'Rahul Agent', type: 'Deposit', amount: 5000, date: '2026-08-25 12:00 PM', status: 'Pending Audit' },
];

export const initialDashboardStats = {
  totalCustomers: 142,
  totalDeposits: 1245000,
  activeRDCount: 86,
  activeFDCount: 34,
  activeLoansAmount: 830000,
  todayCollection: 45200,
  pendingReconciliations: 3,
};