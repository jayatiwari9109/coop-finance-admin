const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Loan = require('../models/Loan');
const Deposit = require('../models/Deposit');

// GET: /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: 'Active' });
    const activeDeposits = await Deposit.countDocuments({ status: 'Active' });

    // Aggregate Total Member Balances
    const customers = await Customer.find();
    let totalDoorstepCollections = 0;
    customers.forEach(cust => {
      totalDoorstepCollections += Number(cust.balance || 0);
    });

    // Aggregate Loan Outstanding
    const loans = await Loan.find({ status: 'Active' });
    let totalOutstandingLoan = 0;
    loans.forEach(loan => {
      totalOutstandingLoan += Number(loan.outstandingAmount || 0);
    });

    res.json({
      totalCustomers,
      activeLoans,
      activeDeposits,
      totalDoorstepCollections,
      totalOutstandingLoan
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
});

module.exports = router;