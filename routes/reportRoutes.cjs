const express = require('express');
const Report = require('../models/Report.cjs');
const router = express.Router();

// Sales by Month
router.get('/sales-by-month/:year', async (req, res) => {
  try {
    const year = parseInt(req.params.year, 10) || new Date().getFullYear();
    const data = await Report.getSalesByMonth(year);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sales by Year
router.get('/sales-by-year', async (req, res) => {
  try {
    const data = await Report.getSalesByYear();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top-Selling Products
router.get('/top-selling-products/:limit?', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit, 10) || 5;
    const data = await Report.getTopSellingProducts(limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sales by Category
router.get('/sales-by-category', async (req, res) => {
  try {
    const data = await Report.getSalesByCategory();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Custom Sales Trends
router.get('/custom-sales-trends', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await Report.getCustomSalesTrends(startDate, endDate);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
