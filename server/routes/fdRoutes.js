const express = require('express');
const router = express.Router();
const FD = require('../models/FD');

// GET: Fetch all FD records
router.get('/', async (req, res) => {
  try {
    const fds = await FD.find().sort({ createdAt: -1 });
    res.json(fds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching FD accounts', error: err.message });
  }
});

// POST: Issue new FD
router.post('/create', async (req, res) => {
  try {
    const { customer, principal, rate, maturityDate } = req.body;
    
    // Automatic FD Number generation (e.g. FD-301, FD-302)
    const count = await FD.countDocuments();
    const fdNo = `FD-${301 + count}`;

    const formattedRate = rate.includes('%') ? rate : `${rate}%`;

    const newFd = new FD({
      fdNo,
      customer,
      principal: Number(principal),
      rate: formattedRate,
      maturityDate,
      status: 'Active'
    });

    await newFd.save();
    res.status(201).json(newFd);
  } catch (err) {
    res.status(500).json({ message: 'Error issuing FD certificate', error: err.message });
  }
});

module.exports = router;