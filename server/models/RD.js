const mongoose = require('mongoose');

const rdSchema = new mongoose.Schema({
  rdNo: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  emi: { type: Number, required: true },
  paidCount: { type: Number, default: 0 },
  totalTenure: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, default: 'Active' }, // Active | Completed
  transactions: [
    {
      installmentNo: Number,
      date: { type: Date, default: Date.now },
      amount: Number,
      status: { type: String, default: 'Paid' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('RD', rdSchema);