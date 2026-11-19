const mongoose = require('mongoose');
const { initializeStudents } = require('./students');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  }

  await mongoose.connect(mongoURI);
  await initializeStudents();
  console.log('MongoDB connected successfully');
};

module.exports = connectDB;
