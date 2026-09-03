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

// Routes (YEH LINE ADD KI HAI)
app.use('/api/auth', require('./routes/authRoutes'));

// Base Route Test
app.get('/', (req, res) => {
  res.send('CoOp Finance API Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});