const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Customer = require('../models/Customer'); // Mongoose populate ke liye zaroori

// EMI Calculation Helper
const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100;
  return Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));
};

// GET: /api/loans (Fetch all loans)
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find().populate('customerId', 'name accountNumber phone');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching loans', error: err.message });
  }
});

// POST: /api/loans/apply (Create loan)
router.post('/apply', async (req, res) => {
  try {
    const { customerId, loanAmount, interestRate, tenureMonths } = req.body;

    if (!customerId || !loanAmount) {
      return res.status(400).json({ message: 'Customer and Loan Amount are required' });
    }

    const emiAmount = calculateEMI(loanAmount, interestRate, tenureMonths);

    // Schedule generation
    const emiSchedule = [];
    let currentDate = new Date();

    for (let i = 1; i <= tenureMonths; i++) {
      currentDate.setMonth(currentDate.getMonth() + 1);
      emiSchedule.push({
        installmentNo: i,
        dueDate: new Date(currentDate),
        amount: emiAmount,
        status: 'Pending'
      });
    }

    const loan = new Loan({ 
      customerId, 
      loanAmount, 
      interestRate, 
      tenureMonths, 
      emiAmount, 
      emiSchedule 
    });

    await loan.save();
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (err) {
    res.status(500).json({ message: 'Error processing loan application', error: err.message });
  }
});

// POST: /api/loans/:loanId/pay-emi (Mark an EMI installment as Paid)
router.post('/:loanId/pay-emi', async (req, res) => {
  try {
    const { loanId } = req.params;
    const { installmentNo } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan account not found' });
    }

    // EMI Schedule me se target installment dhundhna
    const installment = loan.emiSchedule.find(emi => emi.installmentNo === Number(installmentNo));
    if (!installment) {
      return res.status(400).json({ message: 'Invalid installment number' });
    }

    installment.status = 'Paid';

    // Check agar saari EMIs pay ho chuki hain toh Loan status "Closed" mark karna
    const allPaid = loan.emiSchedule.every(emi => emi.status === 'Paid');
    if (allPaid) {
      loan.status = 'Closed';
    }

    await loan.save();
    res.json({ message: `Installment #${installmentNo} paid successfully!`, loan });
  } catch (err) {
    res.status(500).json({ message: 'Failed to process EMI payment', error: err.message });
  }
});

module.exports = router;