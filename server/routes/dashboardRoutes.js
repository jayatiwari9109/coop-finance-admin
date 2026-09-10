const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Loan = require('../models/Loan');

// GET: /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // 1. Total Customers Count
    const totalCustomers = await Customer.countDocuments();

    // 2. Active Loans Count
    const activeLoans = await Loan.countDocuments({ 
      status: { $regex: /^active$/i } 
    });

    // 3. Aggregate Member Balances
    const customers = await Customer.find();
    let totalDoorstepCollections = 0;
    customers.forEach(cust => {
      totalDoorstepCollections += Number(cust.balance || cust.totalBalance || 0);
    });

    // 4. Aggregate Outstanding Loans
    const loans = await Loan.find({ status: { $regex: /^active$/i } });
    let totalOutstandingLoan = 0;
    loans.forEach(loan => {
      totalOutstandingLoan += Number(loan.outstandingAmount || loan.sanctionedAmount || loan.amount || 0);
    });

    const statsPayload = {
      totalCustomers: totalCustomers || 0,
      activeLoans: activeLoans || 0,
      activeDeposits: 0,
      totalDoorstepCollections: totalDoorstepCollections || 0,
      totalOutstandingLoan: totalOutstandingLoan || 0
    };

    res.status(200).json({
      success: true,
      data: statsPayload,
      ...statsPayload
    });

  } catch (err) {
    console.error('Stats Route Error:', err);
    res.status(500).json({ message: 'Error fetching stats', error: err.message });
  }
});

module.exports = router;