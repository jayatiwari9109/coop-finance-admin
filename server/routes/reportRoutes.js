// routes/reportRoutes.js
const express = require('express');
const router = express.Router();

// Helper to convert JSON to CSV
const convertToCSV = (arr) => {
  if (!arr || !arr.length) return '';
  const headers = Object.keys(arr[0]).join(',');
  const rows = arr.map(obj => 
    Object.values(obj).map(val => `"${val !== undefined ? val : ''}"`).join(',')
  );
  return [headers, ...rows].join('\n');
};

// 1. Daily Collection
router.get('/daily-collection', (req, res) => {
  const reportData = [
    { Transaction_ID: 'TXN101', Agent: 'Rahul Sharma', Customer: 'Ramesh Kumar', Amount: 1500, Status: 'Success' },
    { Transaction_ID: 'TXN102', Agent: 'Vikas Gupta', Customer: 'Priya Sharma', Amount: 5000, Status: 'Success' }
  ];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=Daily_Collection_Statement.csv');
  res.status(200).send(convertToCSV(reportData));
});

// 2. Loan Recovery
router.get('/loan-recovery', (req, res) => {
  const reportData = [
    { Loan_ID: 'LN5501', Borrower: 'Amit Patel', EMI_Due: 4500, Paid_Amount: 4500, Status: 'Paid' },
    { Loan_ID: 'LN5502', Borrower: 'Ramesh Kumar', EMI_Due: 12000, Paid_Amount: 12000, Status: 'Paid' }
  ];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=Loan_Recovery_Ledger.csv');
  res.status(200).send(convertToCSV(reportData));
});

// 3. RD & FD Growth
router.get('/rd-fd-growth', (req, res) => {
  const reportData = [
    { Account_No: 'RD101', Type: 'RD', Customer: 'Suresh Verma', Principal: 12000, Maturity_Date: '2026-09-10' },
    { Account_No: 'FD301', Type: 'FD', Customer: 'Vikram Singh', Principal: 100000, Maturity_Date: '2027-09-02' }
  ];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=RD_FD_Growth_Report.csv');
  res.status(200).send(convertToCSV(reportData));
});

module.exports = router;