const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    // Existing admin check karein
    const adminExists = await User.findOne({ email: 'admin@coop.com' });
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Password hash karein
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Default Admin User
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@coop.com',
      password: hashedPassword,
      role: 'Super Admin'
    });

    await admin.save();
    console.log('SUCCESS: Admin User created!');
    console.log('Email: admin@coop.com');
    console.log('Password: admin123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();