const mongoose = require('mongoose');

// Define the Bill schema
const billSchema = new mongoose.Schema({
  billId: { // New field for unique Bill ID
    type: String,
    required: true,
    unique: true, // Ensures Bill ID is unique
  },
  customerName: {
    type: String,
    required: true,
  },
  billMakerUsername: {
    type: String,
    required: true,
  },
  billMakerRole: {
    type: String,
    required: true,
  },
  products: [
    {
      productID: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Bill model
const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
