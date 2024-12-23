const express = require('express');
const router = express.Router();
const { signup, login, checkAvailability } = require('../controllers/authController.cjs');
const authenticate = require('../middleware/authMiddleware.cjs'); // Middleware for protected routes

// Public Routes
router.post('/signup', signup);                  // Signup route
router.post('/login', login);                    // Login route
router.post('/check-availability', checkAvailability); // Check username/email availability

// Example Protected Route (Optional)
router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
