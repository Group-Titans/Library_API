const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware function
const authMiddleware = (req, res, next) => {
  // Your middleware logic here
  next();
};

router.post('/register', authMiddleware, authController.register);
router.post('/login', authMiddleware, authController.login);

module.exports = router;
