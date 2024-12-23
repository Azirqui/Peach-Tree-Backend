const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer.cjs');

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  try {
    const newCustomer = new Customer({ name, contact, purchaseHistory: [] });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add customer' });
  }
});

module.exports = router;
