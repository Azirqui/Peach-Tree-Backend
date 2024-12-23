// Backend/routes/inventoryRoutes.cjs
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory.cjs'); // Make sure this model exists

// Example route for getting inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
