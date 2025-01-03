// models/userForm.cjs

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Cashier'],  // Ensure these match the values in the form
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
