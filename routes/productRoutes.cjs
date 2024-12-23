const express = require('express');
const router = express.Router();
const Product = require('../models/Product.cjs'); // Import the Product model
const crypto = require('crypto');

// Function to generate custom productID
const generateProductID = () => {
  const letters = crypto.randomBytes(2).toString('hex').toUpperCase().slice(0, 4);
  const digits = crypto.randomBytes(3).readUIntLE(0, 3).toString().slice(0, 6);
  return `${letters}-${digits}`;
};

// Example route to fetch products
router.get('/', async (req, res) => {
  try {
    // Logic to fetch products from the database
    const products = await Product.find();
    res.json(products); // Respond with the products
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
});

// POST route to add a new product
router.post('/', async (req, res) => {
  const { name, price, company, stock, supplierID } = req.body;

  try {
    // Validate that all required fields are present
    if (!name || !price || !company || !stock || !supplierID) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Generate a new unique productID
    const productID = await generateProductID();

    // Create a new product with the data from the request body and the generated productID
    const newProduct = new Product({
      productID, // Use the generated unique productID
      name,
      price,
      company,
      stock,
      supplierID,
    });

    // Save the product to the database
    await newProduct.save();

    // Send a success response with the created product
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// PUT route to update an existing product by ID
router.put('/:productID', async (req, res) => {
  try {
    // Find the product by the productID
    const product = await Product.findOne({ productID: req.params.productID });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update only price and stock fields
    let { price, stock } = req.body;

    // Validate and safely parse `stock`
    if (stock !== undefined) {
      stock = Number(stock); // Convert to a number
      if (isNaN(stock)) {
        return res.status(400).json({ message: 'Invalid stock value' });
      }
      product.stock += stock; // Add the provided stock to the existing stock
    }

    // Update price if provided
    if (price !== undefined) {
      price = Number(price); // Convert to a number
      if (isNaN(price)) {
        return res.status(400).json({ message: 'Invalid price value' });
      }
      product.price = price;
    }

    // Save the updated product
    const updatedProduct = await product.save();

    return res.json(updatedProduct); // Respond with the updated product data
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating product' });
  }
});


// DELETE route to delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Product ID to delete:', id); // Log the product ID

  try {
    const deletedProduct = await Product.findOneAndDelete({ productID: id });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// POST route to update stock after a checkout
router.post('/update-stock', async (req, res) => {
  const { productID, quantitySold } = req.body;

  try {
    // Find the product by productID
    const product = await Product.findOne({ productID });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if there's enough stock available
    if (product.stock < quantitySold) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Update the stock of the product
    product.stock -= quantitySold;

    // Save the updated product back to the database
    await product.save();

    return res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    return res.status(500).json({ message: 'Error updating stock', error: error.message });
  }
});


module.exports = router;