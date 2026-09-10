const Customer = require('../models/Customer');
const Loan = require('../models/Loan');

// Get Dashboard Live Stats
exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Total Active Customers
    const totalCustomers = await Customer.countDocuments();

    // 2. Total Outstanding Active Loans
    const activeLoans = await Loan.find({ status: { $ne: 'Closed' } });
    const totalLoanOutstanding = activeLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0);

    // 3. Mocked or Calculated Member Balance & Products
    // Agni/RD/FD models hone par aggregation dynamic kar sakte hain
    const totalProducts = await Customer.aggregate([
      { $project: { productCount: { $size: { $ifNull: ["$products", []] } } } },
      { $group: { _id: null, total: { $sum: "$productCount" } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCustomers: totalCustomers || 0,
        totalProducts: totalProducts[0]?.total || 0,
        totalMemberBalance: 0, // Customer model me balance field add hone par calculate ho jayega
        activeLoansOutstanding: totalLoanOutstanding || 0
      }
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to compute live stats",
      error: error.message
    });
  }
};