const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// POST: /api/withdrawals/process (Debit money from customer savings balance)
router.post('/process', async (req, res) => {
  try {
    const { customerId, amount, mode, remark } = req.body;

    if (!customerId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid Customer ID and Amount are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Insufficient Balance Validation
    if ((customer.balance || 0) < Number(amount)) {
      return res.status(400).json({ 
        message: `Insufficient funds! Available balance: ₹${customer.balance || 0}` 
      });
    }

    // Deduct Balance
    customer.balance -= Number(amount);

    // Push Withdrawal Transaction
    if (!customer.transactions) customer.transactions = [];

    customer.transactions.push({
      type: 'Withdrawal',
      amount: Number(amount),
      collectedBy: mode || 'Cash Handover',
      date: new Date(),
      remark: remark || 'Savings Withdrawal'
    });

    await customer.save();

    res.status(200).json({
      message: `₹${amount} withdrawn successfully for ${customer.name}`,
      updatedBalance: customer.balance
    });
  } catch (err) {
    res.status(500).json({ message: 'Withdrawal failed', error: err.message });
  }
});

// GET: /api/withdrawals/history (Fetch all past withdrawals)
router.get('/history', async (req, res) => {
  try {
    const customers = await Customer.find();
    let withdrawalLogs = [];

    customers.forEach(cust => {
      if (cust.transactions && Array.isArray(cust.transactions)) {
        cust.transactions.forEach(tx => {
          if (tx.type === 'Withdrawal') {
            withdrawalLogs.push({
              customerName: cust.name,
              accountNumber: cust.accountNumber || cust.phone,
              amount: tx.amount,
              mode: tx.collectedBy,
              date: tx.date,
              remark: tx.remark
            });
          }
        });
      }
    });

    // Recent transactions first
    withdrawalLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(withdrawalLogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching withdrawal logs', error: err.message });
  }
});

module.exports = router;