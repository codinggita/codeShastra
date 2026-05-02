const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    const result = await User.updateMany({}, { $set: { role: 'admin' } });
    console.log(`Successfully upgraded ${result.modifiedCount} users to Admin!`);

    process.exit(0);
  } catch (error) {
    console.error('Error upgrading users:', error);
    process.exit(1);
  }
};

makeAdmin();
