const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/collections', require('./routes/agentRoutes'));
app.use('/api/deposits', require('./routes/depositRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/withdrawals', require('./routes/withdrawalRoutes'));
app.use('/api/reconciliation', require('./routes/reconciliationRoutes'));
app.use('/api/rds', require('./routes/rdRoutes'));
app.use('/api/fds', require('./routes/fdRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));

// Base Route Test
app.get('/', (req, res) => {
  res.send('CoOp Finance API Running...');
});

// Fixed Syntax Error Here
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});