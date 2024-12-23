// utils/idGenerator.js
const crypto = require('crypto');
const Product = require('../models/Product.cjs');  // Assuming you have a Product model

// Function to generate a complex unique productID
const getUniqueProductID = async () => {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Generate random values using crypto (e.g., random bytes) for uniqueness
  const randomBytes = crypto.randomBytes(4).toString('hex'); // 4 bytes -> 8 hexadecimal characters

  // Combine timestamp and random bytes to form a complex ID
  let complexID = `${timestamp}-${randomBytes}`;

  // Optional: Hash the combined ID to further ensure uniqueness and complexity
  const hash = crypto.createHash('sha256').update(complexID).digest('hex');

  // Take the first 6 digits of the hash and apply modulo to limit to a 6-digit number
  let uniqueID = parseInt(hash.slice(0, 6), 16); // Convert first 6 characters of the hash into a number
  uniqueID = uniqueID % 1000000; // Ensure it is within the 6-digit range (i.e., 000000 - 999999)

  // Ensure that the uniqueID is always a 6-digit number (pad with leading zeros if necessary)
  uniqueID = uniqueID.toString().padStart(6, '0');

  // Check if the generated ID already exists in the database (this adds additional safety)
  const existingProduct = await Product.findOne({ productID: uniqueID });
  if (existingProduct) {
    // If the generated ID already exists, try generating a new ID recursively
    return await getUniqueProductID();
  }

  // Return the final unique productID
  return uniqueID;
};

// Export the function for use in other files
module.exports = { getUniqueProductID };
