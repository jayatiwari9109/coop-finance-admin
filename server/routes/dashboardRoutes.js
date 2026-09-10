const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Loan = require('../models/Loan');
const Deposit = require('../models/Deposit');

// GET: /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // 1. Flexible Case-Insensitive Status Counts
    const totalCustomers = await Customer.countDocuments();
    const activeLoans = await Loan.countDocuments({ status: { $regex: /^active$/i } });
    
    let activeDeposits = 0;
    if (Deposit) {
      activeDeposits = await Deposit.countDocuments({ status: { $regex: /^active$/i } });
    }

    // 2. Aggregate Total Member Balances
    const customers = await Customer.find();
    let totalDoorstepCollections = 0;
    customers.forEach(cust => {
      totalDoorstepCollections += Number(cust.balance || cust.totalBalance || 0);
    });

    // 3. Aggregate Loan Outstanding (Fallback options added for amount fields)
    const loans = await Loan.find({ status: { $regex: /^active$/i } });
    let totalOutstandingLoan = 0;
    loans.forEach(loan => {
      totalOutstandingLoan += Number(loan.outstandingAmount || loan.sanctionedAmount || loan.amount || 0);
    });

    const statsPayload = {
      totalCustomers: totalCustomers || 0,
      activeLoans: activeLoans || 0,
      activeDeposits: activeDeposits || 0,
      totalDoorstepCollections: totalDoorstepCollections || 0,
      totalOutstandingLoan: totalOutstandingLoan || 0
    };

    // Return response supporting both flat and nested frontend listeners
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