const mongoose = require('mongoose');

const fdSchema = new mongoose.Schema({
  fdNo: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  principal: { type: Number, required: true },
  rate: { type: String, required: true },
  maturityDate: { type: String, required: true },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('FD', fdSchema);