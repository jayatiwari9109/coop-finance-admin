
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

// // Dependency imports (Ensure these files exist in your project structure)
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { Can } from './components/Can';
// import DataTable from './components/DataTable';
// import { MODULES, ACTIONS } from './config/roles';

// // --- Global Modal Component ---
// const FormModal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg font-bold">✕</button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// // --- Helper function for CSV Export ---
// const exportToCSV = (filename, rows) => {
//   if (!rows || !rows.length) return;
//   const separator = ',';
//   const keys = Object.keys(rows[0]);
//   const csvContent =
//     keys.join(separator) +
//     '\n' +
//     rows.map(row => keys.map(k => `"${row[k] ?? ''}"`).join(separator)).join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.setAttribute('download', `${filename}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// // --- 1. Dashboard Module ---
// const Dashboard = () => (
//   <div className="p-6">
//     <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
//       <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <p className="text-sm text-blue-600 font-semibold">Total Deposits</p>
//         <p className="text-2xl font-bold text-blue-900 mt-1">₹ 12,45,000</p>
//       </div>
//       <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//         <p className="text-sm text-green-600 font-semibold">Active Loans</p>
//         <p className="text-2xl font-bold text-green-900 mt-1">₹ 8,30,000</p>
//       </div>
//       <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
//         <p className="text-sm text-purple-600 font-semibold">Today's Collection</p>
//         <p className="text-2xl font-bold text-purple-900 mt-1">₹ 45,200</p>
//       </div>
//       <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
//         <p className="text-sm text-amber-600 font-semibold">Pending Reconciliation</p>
//         <p className="text-2xl font-bold text-amber-900 mt-1">3 Accounts</p>
//       </div>
//     </div>
//   </div>
// );

// // --- 2. Customer Management Module ---
// const Customers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCust, setSelectedCust] = useState(null);
//   const [customerList, setCustomerList] = useState([
//     { id: 1, name: 'Ramesh Sharma', accountNo: 'ACC-1001', mobile: '9876543210', agent: 'Rahul Agent', status: 'Active' },
//     { id: 2, name: 'Suresh Verma', accountNo: 'ACC-1002', mobile: '9876543211', agent: 'Amit Collection', status: 'Active' },
//   ]);
//   const [formData, setFormData] = useState({ name: '', accountNo: '', mobile: '', agent: '' });

//   const columns = [
//     { header: 'ID', accessor: 'id' },
//     { header: 'Name', accessor: 'name' },
//     { header: 'Account No', accessor: 'accountNo' },
//     { header: 'Mobile', accessor: 'mobile' },
//     { header: 'Assigned Agent', accessor: 'agent' },
//     {
//       header: 'Actions',
//       accessor: 'actions',
//       render: (row) => (
//         <div className="flex space-x-2">
//           <button onClick={() => setSelectedCust(row)} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 font-medium">View Profile</button>
//           <button onClick={() => setCustomerList(customerList.filter(c => c.id !== row.id))} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 font-medium">Delete</button>
//         </div>
//       )
//     }
//   ];

//   const handleAddCustomer = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.accountNo) return;
//     setCustomerList([...customerList, { id: customerList.length + 1, ...formData, status: 'Active' }]);
//     setFormData({ name: '', accountNo: '', mobile: '', agent: '' });
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
//         <Can module={MODULES?.CUSTOMERS || 'CUSTOMERS'} action={ACTIONS?.CREATE || 'CREATE'}>
//           <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
//             + Add Customer
//           </button>
//         </Can>
//       </div>

//       <DataTable columns={columns} data={customerList} searchParam="name" />

//       {/* Add Customer Modal */}
//       <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
//         <form onSubmit={handleAddCustomer} className="space-y-4 text-slate-800">
//           <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full border rounded p-2 text-sm" />
//           <input type="text" placeholder="Account Number" value={formData.accountNo} onChange={e => setFormData({...formData, accountNo: e.target.value})} required className="w-full border rounded p-2 text-sm" />
//           <input type="text" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} required className="w-full border rounded p-2 text-sm" />
//           <input type="text" placeholder="Assigned Agent" value={formData.agent} onChange={e => setFormData({...formData, agent: e.target.value})} className="w-full border rounded p-2 text-sm" />
//           <div className="flex justify-end space-x-2 pt-2 border-t">
//             <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-sm text-gray-600">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Save Customer</button>
//           </div>
//         </form>
//       </FormModal>

//       {/* Complete Customer Profile View Modal */}
//       <FormModal isOpen={!!selectedCust} onClose={() => setSelectedCust(null)} title="Customer Detailed Profile">
//         {selectedCust && (
//           <div className="space-y-4 text-sm text-slate-700">
//             <div className="p-3 bg-slate-100 rounded-md">
//               <p><strong>Name:</strong> {selectedCust.name}</p>
//               <p><strong>Account ID:</strong> {selectedCust.accountNo}</p>
//               <p><strong>Mobile:</strong> {selectedCust.mobile}</p>
//               <p><strong>Assigned Agent:</strong> {selectedCust.agent}</p>
//             </div>
//             <div className="border-t pt-2">
//               <h3 className="font-bold text-gray-800 mb-2">Active Products Summary</h3>
//               <ul className="space-y-1 list-disc list-inside text-xs">
//                 <li><strong>RD Account:</strong> RD-9012 (₹ 1,000/Daily)</li>
//                 <li><strong>Loan Account:</strong> LN-2001 (Gold Loan - Outstanding: ₹ 45,000)</li>
//               </ul>
//             </div>
//           </div>
//         )}
//       </FormModal>
//     </div>
//   );
// };

// // --- 3. Deposits View ---
// const Deposits = () => {
//   const [deposits] = useState([
//     { depId: 'DEP-7001', customer: 'Ramesh Sharma', amount: '₹ 25,000', date: '2026-08-20', mode: 'Cash' },
//     { depId: 'DEP-7002', customer: 'Suresh Verma', amount: '₹ 50,000', date: '2026-08-22', mode: 'Cheque' },
//   ]);

//   const columns = [
//     { header: 'Deposit ID', accessor: 'depId' },
//     { header: 'Customer', accessor: 'customer' },
//     { header: 'Amount', accessor: 'amount' },
//     { header: 'Deposit Date', accessor: 'date' },
//     { header: 'Payment Mode', accessor: 'mode' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Deposit Management</h1>
//       <DataTable columns={columns} data={deposits} searchParam="customer" />
//     </div>
//   );
// };

// // --- 4. RD Management ---
// const RDManagement = () => {
//   const [rdList] = useState([
//     { rdNo: 'RD-9012', customer: 'Ramesh Sharma', installment: '₹ 1,000', frequency: 'Daily', paid: '24/30', status: 'Active' },
//     { rdNo: 'RD-9013', customer: 'Suresh Verma', installment: '₹ 2,000', frequency: 'Monthly', paid: '5/12', status: 'Active' },
//   ]);

//   const columns = [
//     { header: 'RD Account No', accessor: 'rdNo' },
//     { header: 'Customer', accessor: 'customer' },
//     { header: 'Installment (₹)', accessor: 'installment' },
//     { header: 'Frequency', accessor: 'frequency' },
//     { header: 'Paid Installments', accessor: 'paid' },
//     { header: 'Status', accessor: 'status' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Recurring Deposit (RD) Management</h1>
//       <DataTable columns={columns} data={rdList} searchParam="customer" />
//     </div>
//   );
// };

// // --- 5. FD Management View ---
// const FDManagement = () => {
//   const [fdList] = useState([
//     { fdNo: 'FD-401', customer: 'Ramesh Sharma', amount: '₹ 1,00,000', rate: '7.5%', maturityDate: '2027-08-25', status: 'Active' },
//   ]);

//   const columns = [
//     { header: 'FD Certificate No', accessor: 'fdNo' },
//     { header: 'Customer', accessor: 'customer' },
//     { header: 'Principal Amount', accessor: 'amount' },
//     { header: 'Interest Rate', accessor: 'rate' },
//     { header: 'Maturity Date', accessor: 'maturityDate' },
//     { header: 'Status', accessor: 'status' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Fixed Deposit (FD) Management</h1>
//       <DataTable columns={columns} data={fdList} searchParam="customer" />
//     </div>
//   );
// };

// // --- 6. Loan Management ---
// const LoanManagement = () => {
//   const [loans] = useState([
//     { loanId: 'LN-2001', customer: 'Ramesh Sharma', type: 'Gold Loan', loanAmount: '₹ 1,00,000', outstanding: '₹ 45,000', status: 'Active' },
//   ]);

//   const columns = [
//     { header: 'Loan ID', accessor: 'loanId' },
//     { header: 'Customer', accessor: 'customer' },
//     { header: 'Loan Type', accessor: 'type' },
//     { header: 'Total Loan (₹)', accessor: 'loanAmount' },
//     { header: 'Outstanding (₹)', accessor: 'outstanding' },
//     { header: 'Status', accessor: 'status' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Loan Management</h1>
//       <DataTable columns={columns} data={loans} searchParam="customer" />
//     </div>
//   );
// };

// // --- 7. Withdrawals View ---
// const Withdrawals = () => {
//   const [withdrawals] = useState([
//     { wId: 'WTH-301', customer: 'Ramesh Sharma', account: 'RD-9012', amount: '₹ 5,000', date: '2026-08-24' },
//   ]);

//   const columns = [
//     { header: 'Withdrawal ID', accessor: 'wId' },
//     { header: 'Customer Name', accessor: 'customer' },
//     { header: 'Source Account', accessor: 'account' },
//     { header: 'Amount Withdrawn', accessor: 'amount' },
//     { header: 'Date', accessor: 'date' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Withdrawal Log & Processing</h1>
//       <DataTable columns={columns} data={withdrawals} searchParam="customer" />
//     </div>
//   );
// };

// // --- 8. Collection Agents Module ---
// const Agents = () => {
//   const [agentList] = useState([
//     { id: 'AGT-10', name: 'Rahul Agent', phone: '9876500001', assignedCust: '14 Customers', status: 'Active' },
//     { id: 'AGT-11', name: 'Amit Collection', phone: '9876500002', assignedCust: '8 Customers', status: 'Active' },
//   ]);

//   const columns = [
//     { header: 'Agent Code', accessor: 'id' },
//     { header: 'Agent Name', accessor: 'name' },
//     { header: 'Phone Number', accessor: 'phone' },
//     { header: 'Assigned Portfolio', accessor: 'assignedCust' },
//     { header: 'Status', accessor: 'status' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Collection Agents Management</h1>
//       <DataTable columns={columns} data={agentList} searchParam="name" />
//     </div>
//   );
// };

// // --- 9. Transactions Module ---
// const Transactions = () => {
//   const transactions = [
//     { txId: 'TXN-9901', customer: 'Ramesh Sharma', agent: 'Rahul Agent', type: 'RD Collection', amount: '₹ 1,000', date: '2026-08-25 10:30 AM' },
//     { txId: 'TXN-9902', customer: 'Suresh Verma', agent: 'Amit Collection', type: 'Loan Installment', amount: '₹ 2,500', date: '2026-08-25 11:15 AM' },
//   ];

//   const columns = [
//     { header: 'Tx ID', accessor: 'txId' },
//     { header: 'Customer', accessor: 'customer' },
//     { header: 'Collected By', accessor: 'agent' },
//     { header: 'Type', accessor: 'type' },
//     { header: 'Amount', accessor: 'amount' },
//     { header: 'Date/Time', accessor: 'date' },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Unified Transaction Logs</h1>
//       <DataTable columns={columns} data={transactions} searchParam="customer" />
//     </div>
//   );
// };

// // --- 10. Reconciliation Engine ---
// const Reconciliation = () => {
//   const [data, setData] = useState([
//     { id: 1, agent: 'Rahul Agent', collected: '₹ 12,500', submitted: '₹ 12,500', status: 'Matched' },
//     { id: 2, agent: 'Amit Collection', collected: '₹ 8,000', submitted: '₹ 7,500', status: 'Mismatch' },
//   ]);

//   const handleApprove = (id) => {
//     setData(data.map(item => item.id === id ? { ...item, status: 'Reconciled', submitted: item.collected } : item));
//   };

//   const columns = [
//     { header: 'Agent Name', accessor: 'agent' },
//     { header: 'App Total Collection', accessor: 'collected' },
//     { header: 'Cash Submitted', accessor: 'submitted' },
//     { 
//       header: 'Verification Status', 
//       accessor: 'status',
//       render: (row) => (
//         <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Matched' || row.status === 'Reconciled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {row.status}
//         </span>
//       )
//     },
//     {
//       header: 'Actions',
//       accessor: 'actions',
//       render: (row) => row.status !== 'Reconciled' && (
//         <button onClick={() => handleApprove(row.id)} className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700">Approve Cash</button>
//       )
//     }
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">Daily Cash Reconciliation Engine</h1>
//       <DataTable columns={columns} data={data} searchParam="agent" />
//     </div>
//   );
// };

// // --- 11. Reports & Analytics Engine (COMPLETED) ---
// const Reports = () => {
//   const [reportData] = useState([
//     { date: '2026-08-25', agent: 'Rahul Agent', rdCollection: '₹ 5,000', loanCollection: '₹ 7,500', total: '₹ 12,500' },
//     { date: '2026-08-25', agent: 'Amit Collection', rdCollection: '₹ 3,000', loanCollection: '₹ 5,000', total: '₹ 8,000' },
//   ]);

//   const columns = [
//     { header: 'Date', accessor: 'date' },
//     { header: 'Agent Name', accessor: 'agent' },
//     { header: 'RD Collection', accessor: 'rdCollection' },
//     { header: 'Loan Collection', accessor: 'loanCollection' },
//     { header: 'Total Collected', accessor: 'total' },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics Engine</h1>
//         <button onClick={() => exportToCSV('Daily_Collection_Report', reportData)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
//           📥 Export CSV Report
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow mb-6 border flex gap-4">
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">Start Date</label>
//           <input type="date" className="border rounded p-2 text-sm" defaultValue="2026-08-01" />
//         </div>
//         <div>
//           <label className="block text-xs text-gray-500 mb-1">End Date</label>
//           <input type="date" className="border rounded p-2 text-sm" defaultValue="2026-08-25" />
//         </div>
//         <div className="flex items-end">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium">Apply Filter</button>
//         </div>
//       </div>

//       <DataTable columns={columns} data={reportData} searchParam="agent" />
//     </div>
//   );
// };

// // --- Main Layout ---
// const Layout = () => {
//   const authContext = useAuth ? useAuth() : null;
//   const user = authContext?.user || { name: 'Admin User' };

//   return (
//     <div className="min-h-screen flex bg-gray-100 font-sans">
//       <div className="w-64 bg-slate-900 text-slate-100 flex flex-col min-h-screen">
//         <div className="p-4 text-xl font-bold border-b border-slate-800 text-blue-400">Coop Finance Admin</div>
//         <nav className="flex-1 p-4 space-y-1 text-sm overflow-y-auto">
//           <Link to="/" className="block px-3 py-2 rounded hover:bg-slate-800">Dashboard</Link>
//           <Link to="/customers" className="block px-3 py-2 rounded hover:bg-slate-800">Customer Management</Link>
//           <Link to="/deposits" className="block px-3 py-2 rounded hover:bg-slate-800">Deposits</Link>
//           <Link to="/rd" className="block px-3 py-2 rounded hover:bg-slate-800">RD Accounts</Link>
//           <Link to="/fd" className="block px-3 py-2 rounded hover:bg-slate-800">FD Accounts</Link>
//           <Link to="/loans" className="block px-3 py-2 rounded hover:bg-slate-800">Loan Management</Link>
//           <Link to="/withdrawals" className="block px-3 py-2 rounded hover:bg-slate-800">Withdrawals</Link>
//           <Link to="/agents" className="block px-3 py-2 rounded hover:bg-slate-800">Collection Agents</Link>
//           <Link to="/transactions" className="block px-3 py-2 rounded hover:bg-slate-800">Transaction History</Link>
//           <Link to="/reconciliation" className="block px-3 py-2 rounded hover:bg-slate-800">Reconciliation</Link>
//           <Link to="/reports" className="block px-3 py-2 rounded hover:bg-slate-800">Reports</Link>
//         </nav>
//         <div className="p-4 border-t border-slate-800 text-sm bg-slate-950">
//           Logged in as: <strong className="text-emerald-400">{user?.name || 'Admin User'}</strong>
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/customers" element={<Customers />} />
//           <Route path="/deposits" element={<Deposits />} />
//           <Route path="/rd" element={<RDManagement />} />
//           <Route path="/fd" element={<FDManagement />} />
//           <Route path="/loans" element={<LoanManagement />} />
//           <Route path="/withdrawals" element={<Withdrawals />} />
//           <Route path="/agents" element={<Agents />} />
//           <Route path="/transactions" element={<Transactions />} />
//           <Route path="/reconciliation" element={<Reconciliation />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Layout />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

// Dependency imports (Ensure these files exist in your project structure)
import { AuthProvider, useAuth } from './context/AuthContext';
import { Can } from './components/Can';
import DataTable from './components/DataTable';
import { MODULES, ACTIONS } from './config/roles';

// --- Global Modal Component ---
const FormModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-lg font-bold">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- Helper function for CSV Export ---
const exportToCSV = (filename, rows) => {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows.map(row => keys.map(k => `"${row[k] ?? ''}"`).join(separator)).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- 1. Enhanced Dashboard Module ---
const Dashboard = () => (
  <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
    {/* Top Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Executive Dashboard</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Cooperative Finance & Doorstep Collection System Overview</p>
      </div>
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs font-bold text-emerald-700">Live System Sync Active</span>
      </div>
    </div>

    {/* Primary Metric Grid */}
    <div>
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Core Financial Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Customers</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">👥 Users</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">142</p>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <span>↑ 8.4%</span> <span className="text-slate-400 font-normal">from last month</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Deposits</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">💰 Vault</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">₹ 12,45,000</p>
          <p className="text-xs text-slate-400 font-normal mt-2">Cumulative portfolio value</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active RD Portfolio</span>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg text-xs font-bold">📈 RD</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">86 <span className="text-xs font-medium text-slate-400">Accounts</span></p>
          <p className="text-xs text-purple-600 font-semibold mt-2">₹ 4.2L Monthly Target</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active FD Portfolio</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">🔒 FD</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">34 <span className="text-xs font-medium text-slate-400">Accounts</span></p>
          <p className="text-xs text-indigo-600 font-semibold mt-2">7.8% Avg. Yield</p>
        </div>

      </div>
    </div>

    {/* Secondary Operational Grid */}
    <div>
      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Daily Operations & Loans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Loans</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">₹ 8,30,000</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[68%]"></div>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">68% Collection Recovered</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Withdrawals</span>
          <p className="text-2xl font-bold text-slate-900 mt-2">₹ 1,15,000</p>
          <p className="text-xs text-amber-600 font-semibold mt-3">12 Pending Approvals</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Today's Collection</span>
          <p className="text-2xl font-black text-indigo-950 mt-2">₹ 45,200</p>
          <p className="text-xs text-indigo-700 font-medium mt-3">22 Transactions Completed</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50/50 to-white shadow-sm">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Pending Reconciliation</span>
          <p className="text-2xl font-black text-rose-950 mt-2">3 Accounts</p>
          <p className="text-xs text-rose-700 font-medium mt-3">₹ 500 Variance Alert</p>
        </div>

      </div>
    </div>

    {/* Live Operations Detail Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Recent Transactions Module */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Recent Collections & Transactions</h3>
            <p className="text-xs text-slate-400">Real-time Doorstep App Sync Feed</p>
          </div>
          <Link to="/transactions" className="text-xs font-bold text-blue-600 hover:text-blue-700">View All Log →</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="pb-3 px-2">Transaction ID</th>
                <th className="pb-3 px-2">Customer Name</th>
                <th className="pb-3 px-2">Category</th>
                <th className="pb-3 px-2">Amount</th>
                <th className="pb-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-3 px-2 text-xs font-mono text-slate-500">TXN-9901</td>
                <td className="py-3 px-2 font-bold text-slate-800">Ramesh Sharma</td>
                <td className="py-3 px-2"><span className="bg-purple-100 text-purple-700 text-[11px] font-bold px-2 py-0.5 rounded-full">RD Payment</span></td>
                <td className="py-3 px-2 font-extrabold text-slate-900">₹ 1,000</td>
                <td className="py-3 px-2 text-right"><span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded">Synced</span></td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-xs font-mono text-slate-500">TXN-9902</td>
                <td className="py-3 px-2 font-bold text-slate-800">Suresh Verma</td>
                <td className="py-3 px-2"><span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">Loan EMI</span></td>
                <td className="py-3 px-2 font-extrabold text-slate-900">₹ 2,500</td>
                <td className="py-3 px-2 text-right"><span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded">Synced</span></td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-xs font-mono text-slate-500">TXN-9903</td>
                <td className="py-3 px-2 font-bold text-slate-800">Anil Kapoor</td>
                <td className="py-3 px-2"><span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">Deposit</span></td>
                <td className="py-3 px-2 font-extrabold text-slate-900">₹ 5,000</td>
                <td className="py-3 px-2 text-right"><span className="bg-amber-100 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded">Pending Audit</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Performance Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-800">Today's Agent Leaderboard</h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Live</span>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">Rahul Agent</p>
                <p className="text-xs text-slate-400 font-medium">14 Collections Done</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600 text-base">₹ 28,500</p>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">Reconciled</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800 text-sm">Amit Collection</p>
                <p className="text-xs text-slate-400 font-medium">8 Collections Done</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600 text-base">₹ 16,700</p>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Pending Cash</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link to="/reconciliation" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex justify-center items-center gap-2 transition">
            Go To Daily Reconciliation →
          </Link>
        </div>
      </div>

    </div>
  </div>
);

// --- 2. Customer Management Module ---
const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCust, setSelectedCust] = useState(null);
  const [customerList, setCustomerList] = useState([
    { id: 1, name: 'Ramesh Sharma', accountNo: 'ACC-1001', mobile: '9876543210', agent: 'Rahul Agent', status: 'Active' },
    { id: 2, name: 'Suresh Verma', accountNo: 'ACC-1002', mobile: '9876543211', agent: 'Amit Collection', status: 'Active' },
  ]);
  const [formData, setFormData] = useState({ name: '', accountNo: '', mobile: '', agent: '' });

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Account No', accessor: 'accountNo' },
    { header: 'Mobile', accessor: 'mobile' },
    { header: 'Assigned Agent', accessor: 'agent' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex space-x-2">
          <button onClick={() => setSelectedCust(row)} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 font-medium">View Profile</button>
          <button onClick={() => setCustomerList(customerList.filter(c => c.id !== row.id))} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 font-medium">Delete</button>
        </div>
      )
    }
  ];

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.accountNo) return;
    setCustomerList([...customerList, { id: customerList.length + 1, ...formData, status: 'Active' }]);
    setFormData({ name: '', accountNo: '', mobile: '', agent: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <Can module={MODULES?.CUSTOMERS || 'CUSTOMERS'} action={ACTIONS?.CREATE || 'CREATE'}>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            + Add Customer
          </button>
        </Can>
      </div>

      <DataTable columns={columns} data={customerList} searchParam="name" />

      {/* Add Customer Modal */}
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleAddCustomer} className="space-y-4 text-slate-800">
          <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full border rounded p-2 text-sm" />
          <input type="text" placeholder="Account Number" value={formData.accountNo} onChange={e => setFormData({...formData, accountNo: e.target.value})} required className="w-full border rounded p-2 text-sm" />
          <input type="text" placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} required className="w-full border rounded p-2 text-sm" />
          <input type="text" placeholder="Assigned Agent" value={formData.agent} onChange={e => setFormData({...formData, agent: e.target.value})} className="w-full border rounded p-2 text-sm" />
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-md text-sm text-gray-600">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Save Customer</button>
          </div>
        </form>
      </FormModal>

      {/* Complete Customer Profile View Modal */}
      <FormModal isOpen={!!selectedCust} onClose={() => setSelectedCust(null)} title="Customer Detailed Profile">
        {selectedCust && (
          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-3 bg-slate-100 rounded-md">
              <p><strong>Name:</strong> {selectedCust.name}</p>
              <p><strong>Account ID:</strong> {selectedCust.accountNo}</p>
              <p><strong>Mobile:</strong> {selectedCust.mobile}</p>
              <p><strong>Assigned Agent:</strong> {selectedCust.agent}</p>
            </div>
            <div className="border-t pt-2">
              <h3 className="font-bold text-gray-800 mb-2">Active Products Summary</h3>
              <ul className="space-y-1 list-disc list-inside text-xs">
                <li><strong>RD Account:</strong> RD-9012 (₹ 1,000/Daily)</li>
                <li><strong>Loan Account:</strong> LN-2001 (Gold Loan - Outstanding: ₹ 45,000)</li>
              </ul>
            </div>
          </div>
        )}
      </FormModal>
    </div>
  );
};

// --- 3. Deposits View ---
const Deposits = () => {
  const [deposits] = useState([
    { depId: 'DEP-7001', customer: 'Ramesh Sharma', amount: '₹ 25,000', date: '2026-08-20', mode: 'Cash' },
    { depId: 'DEP-7002', customer: 'Suresh Verma', amount: '₹ 50,000', date: '2026-08-22', mode: 'Cheque' },
  ]);

  const columns = [
    { header: 'Deposit ID', accessor: 'depId' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Deposit Date', accessor: 'date' },
    { header: 'Payment Mode', accessor: 'mode' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Deposit Management</h1>
      <DataTable columns={columns} data={deposits} searchParam="customer" />
    </div>
  );
};

// --- 4. RD Management ---
const RDManagement = () => {
  const [rdList] = useState([
    { rdNo: 'RD-9012', customer: 'Ramesh Sharma', installment: '₹ 1,000', frequency: 'Daily', paid: '24/30', status: 'Active' },
    { rdNo: 'RD-9013', customer: 'Suresh Verma', installment: '₹ 2,000', frequency: 'Monthly', paid: '5/12', status: 'Active' },
  ]);

  const columns = [
    { header: 'RD Account No', accessor: 'rdNo' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Installment (₹)', accessor: 'installment' },
    { header: 'Frequency', accessor: 'frequency' },
    { header: 'Paid Installments', accessor: 'paid' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Recurring Deposit (RD) Management</h1>
      <DataTable columns={columns} data={rdList} searchParam="customer" />
    </div>
  );
};

// --- 5. FD Management View ---
const FDManagement = () => {
  const [fdList] = useState([
    { fdNo: 'FD-401', customer: 'Ramesh Sharma', amount: '₹ 1,00,000', rate: '7.5%', maturityDate: '2027-08-25', status: 'Active' },
  ]);

  const columns = [
    { header: 'FD Certificate No', accessor: 'fdNo' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Principal Amount', accessor: 'amount' },
    { header: 'Interest Rate', accessor: 'rate' },
    { header: 'Maturity Date', accessor: 'maturityDate' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Fixed Deposit (FD) Management</h1>
      <DataTable columns={columns} data={fdList} searchParam="customer" />
    </div>
  );
};

// --- 6. Loan Management ---
const LoanManagement = () => {
  const [loans] = useState([
    { loanId: 'LN-2001', customer: 'Ramesh Sharma', type: 'Gold Loan', loanAmount: '₹ 1,00,000', outstanding: '₹ 45,000', status: 'Active' },
  ]);

  const columns = [
    { header: 'Loan ID', accessor: 'loanId' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Loan Type', accessor: 'type' },
    { header: 'Total Loan (₹)', accessor: 'loanAmount' },
    { header: 'Outstanding (₹)', accessor: 'outstanding' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Loan Management</h1>
      <DataTable columns={columns} data={loans} searchParam="customer" />
    </div>
  );
};

// --- 7. Withdrawals View ---
const Withdrawals = () => {
  const [withdrawals] = useState([
    { wId: 'WTH-301', customer: 'Ramesh Sharma', account: 'RD-9012', amount: '₹ 5,000', date: '2026-08-24' },
  ]);

  const columns = [
    { header: 'Withdrawal ID', accessor: 'wId' },
    { header: 'Customer Name', accessor: 'customer' },
    { header: 'Source Account', accessor: 'account' },
    { header: 'Amount Withdrawn', accessor: 'amount' },
    { header: 'Date', accessor: 'date' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Withdrawal Log & Processing</h1>
      <DataTable columns={columns} data={withdrawals} searchParam="customer" />
    </div>
  );
};

// --- 8. Collection Agents Module ---
const Agents = () => {
  const [agentList] = useState([
    { id: 'AGT-10', name: 'Rahul Agent', phone: '9876500001', assignedCust: '14 Customers', status: 'Active' },
    { id: 'AGT-11', name: 'Amit Collection', phone: '9876500002', assignedCust: '8 Customers', status: 'Active' },
  ]);

  const columns = [
    { header: 'Agent Code', accessor: 'id' },
    { header: 'Agent Name', accessor: 'name' },
    { header: 'Phone Number', accessor: 'phone' },
    { header: 'Assigned Portfolio', accessor: 'assignedCust' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Collection Agents Management</h1>
      <DataTable columns={columns} data={agentList} searchParam="name" />
    </div>
  );
};

// --- 9. Transactions Module ---
const Transactions = () => {
  const transactions = [
    { txId: 'TXN-9901', customer: 'Ramesh Sharma', agent: 'Rahul Agent', type: 'RD Collection', amount: '₹ 1,000', date: '2026-08-25 10:30 AM' },
    { txId: 'TXN-9902', customer: 'Suresh Verma', agent: 'Amit Collection', type: 'Loan Installment', amount: '₹ 2,500', date: '2026-08-25 11:15 AM' },
  ];

  const columns = [
    { header: 'Tx ID', accessor: 'txId' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Collected By', accessor: 'agent' },
    { header: 'Type', accessor: 'type' },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Date/Time', accessor: 'date' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Unified Transaction Logs</h1>
      <DataTable columns={columns} data={transactions} searchParam="customer" />
    </div>
  );
};

// --- 10. Reconciliation Engine ---
const Reconciliation = () => {
  const [data, setData] = useState([
    { id: 1, agent: 'Rahul Agent', collected: '₹ 12,500', submitted: '₹ 12,500', status: 'Matched' },
    { id: 2, agent: 'Amit Collection', collected: '₹ 8,000', submitted: '₹ 7,500', status: 'Mismatch' },
  ]);

  const handleApprove = (id) => {
    setData(data.map(item => item.id === id ? { ...item, status: 'Reconciled', submitted: item.collected } : item));
  };

  const columns = [
    { header: 'Agent Name', accessor: 'agent' },
    { header: 'App Total Collection', accessor: 'collected' },
    { header: 'Cash Submitted', accessor: 'submitted' },
    { 
      header: 'Verification Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Matched' || row.status === 'Reconciled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => row.status !== 'Reconciled' && (
        <button onClick={() => handleApprove(row.id)} className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700">Approve Cash</button>
      )
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Daily Cash Reconciliation Engine</h1>
      <DataTable columns={columns} data={data} searchParam="agent" />
    </div>
  );
};

// --- 11. Reports & Analytics Engine ---
const Reports = () => {
  const [reportData] = useState([
    { date: '2026-08-25', agent: 'Rahul Agent', rdCollection: '₹ 5,000', loanCollection: '₹ 7,500', total: '₹ 12,500' },
    { date: '2026-08-25', agent: 'Amit Collection', rdCollection: '₹ 3,000', loanCollection: '₹ 5,000', total: '₹ 8,000' },
  ]);

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Agent Name', accessor: 'agent' },
    { header: 'RD Collection', accessor: 'rdCollection' },
    { header: 'Loan Collection', accessor: 'loanCollection' },
    { header: 'Total Collected', accessor: 'total' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics Engine</h1>
        <button onClick={() => exportToCSV('Daily_Collection_Report', reportData)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
          📥 Export CSV Report
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6 border flex gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Start Date</label>
          <input type="date" className="border rounded p-2 text-sm" defaultValue="2026-08-01" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">End Date</label>
          <input type="date" className="border rounded p-2 text-sm" defaultValue="2026-08-25" />
        </div>
        <div className="flex items-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium">Apply Filter</button>
        </div>
      </div>

      <DataTable columns={columns} data={reportData} searchParam="agent" />
    </div>
  );
};

// --- Main Layout ---
const Layout = () => {
  const authContext = useAuth ? useAuth() : null;
  const user = authContext?.user || { name: 'Admin User' };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      <div className="w-64 bg-slate-900 text-slate-100 flex flex-col min-h-screen">
        <div className="p-4 text-xl font-bold border-b border-slate-800 text-blue-400">Coop Finance Admin</div>
        <nav className="flex-1 p-4 space-y-1 text-sm overflow-y-auto">
          <Link to="/" className="block px-3 py-2 rounded hover:bg-slate-800">Dashboard</Link>
          <Link to="/customers" className="block px-3 py-2 rounded hover:bg-slate-800">Customer Management</Link>
          <Link to="/deposits" className="block px-3 py-2 rounded hover:bg-slate-800">Deposits</Link>
          <Link to="/rd" className="block px-3 py-2 rounded hover:bg-slate-800">RD Accounts</Link>
          <Link to="/fd" className="block px-3 py-2 rounded hover:bg-slate-800">FD Accounts</Link>
          <Link to="/loans" className="block px-3 py-2 rounded hover:bg-slate-800">Loan Management</Link>
          <Link to="/withdrawals" className="block px-3 py-2 rounded hover:bg-slate-800">Withdrawals</Link>
          <Link to="/agents" className="block px-3 py-2 rounded hover:bg-slate-800">Collection Agents</Link>
          <Link to="/transactions" className="block px-3 py-2 rounded hover:bg-slate-800">Transaction History</Link>
          <Link to="/reconciliation" className="block px-3 py-2 rounded hover:bg-slate-800">Reconciliation</Link>
          <Link to="/reports" className="block px-3 py-2 rounded hover:bg-slate-800">Reports</Link>
        </nav>
        <div className="p-4 border-t border-slate-800 text-sm bg-slate-950">
          Logged in as: <strong className="text-emerald-400">{user?.name || 'Admin User'}</strong>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/rd" element={<RDManagement />} />
          <Route path="/fd" element={<FDManagement />} />
          <Route path="/loans" element={<LoanManagement />} />
          <Route path="/withdrawals" element={<Withdrawals />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}