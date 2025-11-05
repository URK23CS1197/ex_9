const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// User Registration
router.post('/register', async (req, res) => {
  const { fullName, email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, username, password: hashedPassword });
    await newUser.save();
    res.json({ status: 'Registration successful' });
  } catch (err) {
    res.status(400).json({ status: 'Error', message: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
    if (!user) return res.status(404).json({ status: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ status: 'Invalid password' });

    res.json({ status: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ status: 'Server error' });
  }
});

module.exports = router;
