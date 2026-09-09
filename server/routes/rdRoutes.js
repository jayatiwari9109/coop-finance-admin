const express = require('express');
const router = express.Router();
const RD = require('../models/RD');

// GET: Sabhi RDs fetch karein
router.get('/', async (req, res) => {
  try {
    const rds = await RD.find().sort({ createdAt: -1 });
    res.json(rds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching RD records', error: err.message });
  }
});

// POST: Naya RD Account banayein
router.post('/create', async (req, res) => {
  try {
    const { customer, emi, tenure, dueDate } = req.body;
    
    // Automatic RD Number generation (e.g. RD-101, RD-102)
    const count = await RD.countDocuments();
    const rdNo = `RD-${101 + count}`;

    const newRd = new RD({
      rdNo,
      customer,
      emi: Number(emi),
      totalTenure: Number(tenure),
      dueDate,
      paidCount: 0,
      status: 'Active',
      transactions: []
    });

    await newRd.save();
    res.status(201).json(newRd);
  } catch (err) {
    res.status(500).json({ message: 'Error creating RD account', error: err.message });
  }
});

// POST: RD ki Installment Record Karein
router.post('/pay-installment/:id', async (req, res) => {
  try {
    const rd = await RD.findById(req.params.id);
    if (!rd) return res.status(404).json({ message: 'RD account not found' });

    if (rd.paidCount >= rd.totalTenure) {
      return res.status(400).json({ message: 'RD is already completed' });
    }

    const newPaidCount = rd.paidCount + 1;
    const isCompleted = newPaidCount === rd.totalTenure;

    rd.paidCount = newPaidCount;
    if (isCompleted) rd.status = 'Completed';

    rd.transactions.push({
      installmentNo: newPaidCount,
      date: new Date(),
      amount: rd.emi,
      status: 'Paid'
    });

    await rd.save();
    res.json(rd);
  } catch (err) {
    res.status(500).json({ message: 'Error recording installment', error: err.message });
  }
});

module.exports = router;