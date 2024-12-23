// Backend/routes/salesRoutes.cjs
const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales.cjs');  // Ensure this model exists

// Example route for getting all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();  // Replace with appropriate logic for fetching sales
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example route for adding a new sale
router.post('/', async (req, res) => {
  try {
    const { customer, product, quantity, price } = req.body;
    const newSale = new Sales({ customer, product, quantity, price });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
