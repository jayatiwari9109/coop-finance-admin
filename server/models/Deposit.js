const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  depositType: {
    type: String,
    enum: ['FD', 'RD'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number, // In percentage e.g., 7.5
    required: true
  },
  tenureMonths: {
    type: Number,
    required: true
  },
  maturityAmount: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  maturityDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Matured', 'Closed'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Deposit', depositSchema);