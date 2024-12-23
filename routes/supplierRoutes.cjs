// supplierRoutes.cjs
const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier.model.cjs"); // Ensure the path to the model is correct

// Utility function to generate Supplier ID (kept as-is)
const generateSupplierId = () => {
  const segment1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment2 = Math.random().toString(36).substring(2, 9).toUpperCase();
  const segment3 = Math.random().toString(36).substring(2, 3).toUpperCase();
  return `${segment1}-${segment2}-${segment3}`;
};

// Route to add a new supplier (kept as-is)
router.post("/add", async (req, res) => {
  try {
    const { name, companyName, address, contact } = req.body;

    // Generate a unique ID
    let id;
    let isUnique = false;

    while (!isUnique) {
      id = generateSupplierId();
      const existingSupplier = await Supplier.findOne({ id });
      if (!existingSupplier) {
        isUnique = true;
      }
    }

    const supplier = new Supplier({ id, name, companyName, address, contact });
    await supplier.save();

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error adding supplier", error });
  }
});

// Route to get all suppliers (kept as-is)
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error });
  }
});

// Route to delete a supplier (kept as-is)
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findOneAndDelete({ id });
    
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error });
  }
});

// Add the PUT route for updating a supplier
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyName, address, contact } = req.body;

    // Find the supplier by the auto-generated ID
    const supplier = await Supplier.findOne({ id });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Update the supplier data
    supplier.name = name;
    supplier.companyName = companyName;
    supplier.address = address;
    supplier.contact = contact;

    // Save the updated supplier
    await supplier.save();

    res.status(200).json(supplier);  // Return the updated supplier as the response
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ message: "Error updating supplier", error });
  }
});

module.exports = router;
