const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');
const Customer = require('../models/Customer');

// Maturity Calculator Helpers
const calculateFD = (principal, rate, months) => {
  const years = months / 12;
  // Compound interest compounded annually or simple calculation
  const maturity = principal * Math.pow((1 + rate / 100), years);
  return Math.round(maturity);
};

const calculateRD = (monthlyDeposit, rate, months) => {
  // RD Interest formula: P * n * (n + 1) / 24 * (r / 100)
  const totalPrincipal = monthlyDeposit * months;
  const interest = (monthlyDeposit * months * (months + 1) * rate) / (2400);
  return Math.round(totalPrincipal + interest);
};

// GET: /api/deposits (Fetch all deposit accounts)
router.get('/', async (req, res) => {
  try {
    const deposits = await Deposit.find().populate('customerId', 'name accountNumber phone');
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching deposits', error: err.message });
  }
});

// POST: /api/deposits/open (Create FD / RD Account)
router.post('/open', async (req, res) => {
  try {
    const { customerId, depositType, amount, interestRate, tenureMonths } = req.body;

    if (!customerId || !depositType || !amount || !interestRate || !tenureMonths) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    let maturityAmount = 0;
    if (depositType === 'FD') {
      maturityAmount = calculateFD(Number(amount), Number(interestRate), Number(tenureMonths));
    } else {
      maturityAmount = calculateRD(Number(amount), Number(interestRate), Number(tenureMonths));
    }

    const startDate = new Date();
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + Number(tenureMonths));

    const deposit = new Deposit({
      customerId,
      depositType,
      amount: Number(amount),
      interestRate: Number(interestRate),
      tenureMonths: Number(tenureMonths),
      maturityAmount,
      startDate,
      maturityDate
    });

    await deposit.save();

    res.status(201).json({ 
      message: `${depositType} Account created successfully!`,
      deposit
    });
  } catch (err) {
    res.status(500).json({ message: 'Error opening deposit account', error: err.message });
  }
});

module.exports = router;