const express = require('express');
const Notification = require('../models/Notification.cjs');
const Product = require('../models/Product.cjs'); // Import the Product model

const router = express.Router();

// Fetch all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const notificationId = req.params.id;

        // Use findByIdAndDelete to delete the notification
        const notification = await Notification.findByIdAndDelete(notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.json({ message: 'Notification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to check products and add notifications for low stock
router.post('/check-low-stock', async (req, res) => {
    try {
        // Fetch all products
        const products = await Product.find();

        // Loop through products and find ones with stock below 10
        for (const product of products) {
            if (product.stock < 10) {
                // Check if a notification for this product already exists
                const existingNotification = await Notification.findOne({ productID: product.productID });

                if (!existingNotification) {
                    // Create a new notification for low stock
                    const newNotification = new Notification({
                        productID: product.productID,
                        productName: product.name,
                        message: `Stock for ${product.name} is below 10 and remaining quantity is ${product.stock}`,
                    });

                    await newNotification.save();
                }
            }
        }

        res.json({ message: 'Low stock notifications checked and updated.' });
    } catch (err) {
        console.error('Error checking low stock:', err);
        res.status(500).json({ message: 'Error checking low stock', error: err.message });
    }
});

module.exports = router;
