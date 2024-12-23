const mongoose = require('mongoose');
const crypto = require('crypto');

// Function to generate a complex and unpredictable productID
const generateProductID = async () => {
  let productID;
  let existingProduct;
  
  // Loop until a unique productID is found
  do {
    // Generate 4 random uppercase letters
    const letters = crypto.randomBytes(2).toString('hex').toUpperCase().slice(0, 4);

    // Generate 6 random digits
    const digits = crypto.randomBytes(3).readUIntLE(0, 3).toString().slice(0, 6);

    // Format the productID as XXXX-YYYYYY
    productID = `${letters}-${digits}`;

    // Check if the productID already exists in the database
    existingProduct = await Product.findOne({ productID });
  } while (existingProduct); // Continue looping until the ID is unique
  
  return productID;
};


// Define the schema for the product
const productSchema = new mongoose.Schema({
  productID: { 
    type: String, 
    required: true, 
    unique: true, 
    default: generateProductID  // Use the function to generate a custom productID
  },
  name: { 
    type: String, 
    required: true 
  }, 
  price: { 
    type: Number, 
    required: true 
  }, 
  company: { 
    type: String, 
    required: true 
  }, 
  stock: { 
    type: Number, 
    required: true 
  }, 
  supplierID: { 
    type: String, 
    required: true 
  }
});

// Create the product model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
