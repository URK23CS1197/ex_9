const express = require('express');
const router = express.Router();
const Laptop = require('../models/Laptop');

// Fetch all laptops
router.get('/viewAll', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.send(laptops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch laptops' });
  }
});

// Add new laptop with validation
router.post('/addNew', async (req, res) => {
  try {
    const { brand, model, specs, price } = req.body;
    if (!brand || !model || !specs || price == null) {
      return res.json({ status: 'Invalid input data' });
    }
    const newLaptop = new Laptop({ 
      brand: brand.trim(), 
      model: model.trim(),  
      specs: specs.trim(),
      price: Number(price)
    });
    await newLaptop.save();
    res.json({ status: 'Data Saved Successfully' });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// Delete laptop by ID
router.post('/deleteUser', async (req, res) => {
  try {
    await Laptop.findByIdAndDelete(req.body.id);
    res.json({ status: 'Laptop deleted successfully' });
  } catch (err) {
    res.json({ status: 'Error deleting laptop' });
  }
});

module.exports = router;
