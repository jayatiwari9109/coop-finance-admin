const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User'); // Path verify kar lein

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://...').then(async () => {
  await User.deleteMany({ email: 'admin@coop.com' });
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await User.create({
    name: 'Admin User',
    email: 'admin@coop.com',
    password: hashedPassword,
    role: 'Admin'
  });

  console.log('Admin user created successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});