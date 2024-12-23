// Backend/models/Sales.cjs
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
