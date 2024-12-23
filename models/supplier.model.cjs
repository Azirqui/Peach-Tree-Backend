const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Ensure each ID is unique
    match: /^[A-Z0-9]{4}-[A-Z0-9]{7}-[A-Z0-9]{1}$/, // Validate the format
  },
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Supplier", supplierSchema);
