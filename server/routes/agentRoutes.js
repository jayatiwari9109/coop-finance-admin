const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// POST: /api/collections/collect (Log daily doorstep deposit)
router.post('/collect', async (req, res) => {
  try {
    const { customerId, amount, agentName } = req.body;

    if (!customerId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid Customer ID and Amount are required' });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Balance update
    customer.balance = (customer.balance || 0) + Number(amount);
    
    // Transactions array safety check
    if (!customer.transactions) {
      customer.transactions = [];
    }

    customer.transactions.push({
      type: 'Doorstep Deposit',
      amount: Number(amount),
      collectedBy: agentName || 'Agent 01',
      date: new Date()
    });

    await customer.save();

    res.status(200).json({ 
      message: `₹${amount} collected successfully for ${customer.name}`,
      updatedBalance: customer.balance
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record collection', error: err.message });
  }
});

// GET: /api/collections/agents (Fetch live aggregated agent data)
router.get('/agents', async (req, res) => {
  try {
    const customers = await Customer.find();
    
    const agentMap = {};
    
    customers.forEach(cust => {
      if (cust.transactions && Array.isArray(cust.transactions)) {
        cust.transactions.forEach(tx => {
          const agent = tx.collectedBy || 'Agent 01';
          if (!agentMap[agent]) {
            agentMap[agent] = { 
              agentName: agent, 
              todayCollection: 0, 
              region: 'Main Zone' 
            };
          }
          agentMap[agent].todayCollection += Number(tx.amount || 0);
        });
      }
    });

    const agentList = Object.values(agentMap);
    res.json(agentList);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching agent data', error: err.message });
  }
});

module.exports = router;