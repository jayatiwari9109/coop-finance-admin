const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get All Customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching customers' });
  }
});

// Add New Customer (with initial balance & automated ledger entry)
router.post('/', async (req, res) => {
  try {
    const { fullName, phone, email, address, balance } = req.body;

    // Generate Auto Account Number (e.g., CUST-001)
    const count = await Customer.countDocuments();
    const accountNumber = `CUST-${String(count + 1).padStart(3, '0')}`;

    const initialBalance = Number(balance || 0);
    
    // Auto-create opening ledger transaction if balance > 0
    const initialLedger = initialBalance > 0 ? [{
      date: new Date().toISOString().split('T')[0],
      desc: 'Initial Opening Deposit',
      type: 'Credit',
      amount: initialBalance,
      balance: initialBalance
    }] : [];

    const newCustomer = new Customer({
      accountNumber,
      fullName,
      phone,
      email: email || '',
      address,
      balance: initialBalance,
      ledger: initialLedger
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create customer' });
  }
});

module.exports = router;