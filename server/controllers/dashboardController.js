const Customer = require('../models/Customer');
const Loan = require('../models/Loan');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    
    // Active loans count & total outstanding sum
    const activeLoans = await Loan.find({ status: { $ne: 'Closed' } });
    const totalOutstandingLoan = activeLoans.reduce((sum, item) => sum + (item.amount || item.sanctionedAmount || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalCustomers: totalCustomers || 0,
        activeLoans: activeLoans.length || 0,
        activeDeposits: 0, 
        totalDoorstepCollections: 0,
        totalOutstandingLoan: totalOutstandingLoan || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};