const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET: /api/reconciliation/daily-closing (Calculate System Collections vs Cash)
router.get('/daily-closing', async (req, res) => {
  try {
    const { date } = req.query; // Optional filter date (YYYY-MM-DD)
    const targetDate = date ? new Date(date) : new Date();
    
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const customers = await Customer.find();
    
    let totalDoorstepDeposits = 0;
    let totalWithdrawals = 0;
    let transactionLogs = [];

    customers.forEach(cust => {
      if (cust.transactions && Array.isArray(cust.transactions)) {
        cust.transactions.forEach(tx => {
          const txDate = new Date(tx.date);
          if (txDate >= startOfDay && txDate <= endOfDay) {
            if (tx.type === 'Doorstep Deposit') {
              totalDoorstepDeposits += Number(tx.amount || 0);
            } else if (tx.type === 'Withdrawal') {
              totalWithdrawals += Number(tx.amount || 0);
            }

            transactionLogs.push({
              customerName: cust.name,
              accountNumber: cust.accountNumber || cust.phone,
              type: tx.type,
              amount: tx.amount,
              agentOrMode: tx.collectedBy || 'System',
              time: tx.date
            });
          }
        });
      }
    });

    const netSystemCash = totalDoorstepDeposits - totalWithdrawals;

    res.json({
      date: startOfDay.toISOString().split('T')[0],
      totalDoorstepDeposits,
      totalWithdrawals,
      netSystemCash,
      transactionLogs
    });
  } catch (err) {
    res.status(500).json({ message: 'Error generating audit report', error: err.message });
  }
});

module.exports = router;