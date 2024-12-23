const express = require('express');
const router = express.Router();
const Product = require('../models/Product.cjs');  // Import your product model

// PUT route to update a product by custom ID
router.put('/products/:id', async (req, res) => {
  const { id } = req.params; // Custom product ID
  const { productName, price, company, stock } = req.body; // Product data to update

  try {
    // Find the product using the custom ID and update all fields except the ID
    const updatedProduct = await Product.findOneAndUpdate(
      { id: id }, // Custom ID field (not MongoDB _id)
      { productName, price, company, stock }, // Update all fields except ID
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct); // Return the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

module.exports = router;
