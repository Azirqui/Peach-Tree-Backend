// Backend/models/Inventory.cjs
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  // other fields as necessary
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
