const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utils/database');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Trim whitespace from input
    const trimmedUsername = username?.trim();
    const trimmedPassword = password?.trim();
    
    // Get env vars and trim whitespace
    const envUsername = process.env.ADMIN_USERNAME?.trim();
    const envPassword = process.env.ADMIN_PASSWORD?.trim();

    // Debug logging (remove in production)
    console.log('Login attempt:', {
      receivedUsername: trimmedUsername,
      receivedPassword: '***',
      expectedUsername: envUsername,
      usernameMatch: trimmedUsername === envUsername,
      passwordMatch: trimmedPassword === envPassword
    });

    // Check credentials
    if (trimmedUsername === envUsername && trimmedPassword === envPassword) {
      const token = jwt.sign(
        { username: trimmedUsername, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false });
  }
});

module.exports = router;
