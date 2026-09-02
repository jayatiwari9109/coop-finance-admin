export const initialMetrics = {
  totalCustomers: 142,
  totalDeposits: 1245000,
  totalRD: 48,
  totalFD: 22,
  activeLoans: 38,
  totalWithdrawals: 185000,
  todayCollection: 14200,
  pendingCollection: 3500,
};

export const initialCustomers = [
  { id: 'CUST-101', name: 'Ramesh Sharma', phone: '9876543210', type: 'Daily Deposit', agent: 'Rahul Sharma', status: 'Active', balance: 25000 },
  { id: 'CUST-102', name: 'Suresh Verma', phone: '9812345678', type: 'RD Account', agent: 'Amit Kumar', status: 'Active', balance: 12000 },
  { id: 'CUST-103', name: 'Aniket Patel', phone: '9711223344', type: 'Loan Account', agent: 'Rahul Sharma', status: 'Active', balance: 50000 },
];

export const initialAgents = [
  { id: 'AGT-01', name: 'Rahul Sharma', phone: '9988776655', assignedCustomers: 45, todayCollected: 8500, status: 'Active' },
  { id: 'AGT-02', name: 'Amit Kumar', phone: '9877665544', assignedCustomers: 38, todayCollected: 5700, status: 'Active' },
];

export const initialTransactions = [
  { id: 'TXN-901', date: '2026-09-02', customer: 'Ramesh Sharma', agent: 'Rahul Sharma', type: 'Deposit', amount: 500, status: 'Completed' },
  { id: 'TXN-902', date: '2026-09-02', customer: 'Suresh Verma', agent: 'Amit Kumar', type: 'RD Installment', amount: 1000, status: 'Completed' },
];