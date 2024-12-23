// Backend/routes/orderRoutes.cjs
const express = require('express');
const router = express.Router();
const Order = require('../models/Order.cjs'); // Ensure you have an Order model

// Define an example route
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
