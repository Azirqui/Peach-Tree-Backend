const express = require('express');
const Bill = require('../models/Bill.cjs');

const router = express.Router();

// Helper function to generate a unique Bill ID
const generateBillId = async () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // Last two digits of the year
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month (01-12)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Day (01-31)
  const time = currentDate.toTimeString().split(' ')[0].replace(/:/g, ''); // HHMMSS format

  // Count the number of bills created today
  const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
  const billCountToday = await Bill.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const billNumber = String(billCountToday + 1).padStart(3, '0'); // Ensure three-digit count
  return `${year}${month}${day}-${time}-${billNumber}`;
};

// POST route to create a new bill
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      billMakerRole,
      billMakerUsername, // Add this field
      products,
      totalPrice,
      totalAmount,
      totalQuantity,
      dateTime,
    } = req.body;

    const billId = await generateBillId();

    const newBill = new Bill({
      billId,
      customerName,
      billMakerRole,
      billMakerUsername, // Save the username of the bill maker
      products,
      totalPrice,
      totalAmount,
      totalQuantity,
      dateTime,
    });

    await newBill.save();

    res.status(201).json({
      message: 'Bill created successfully!',
      bill: newBill,
    });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({
      message: 'Failed to create bill.',
      error: error.message,
    });
  }
});

// GET route to fetch bills based on the bill maker's name
router.get('/', async (req, res) => {
  try {
    const { billMakerUsername } = req.query;

    if (!billMakerUsername) {
      return res.status(400).json({ message: 'billMakerName is required' });
    }

    const bills = await Bill.find({ billMakerUsername });
    if (bills.length === 0) {
      return res.status(404).json({ message: `No bills found for bill maker: ${billMakerUsername}` });
    }

    res.status(200).json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
