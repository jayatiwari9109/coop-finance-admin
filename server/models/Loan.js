const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  loanAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true }, // Annual interest rate in %
  tenureMonths: { type: Number, required: true },
  emiAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Closed'], default: 'Pending' },
  emiSchedule: [
    {
      installmentNo: Number,
      dueDate: Date,
      amount: Number,
      status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);