// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

// Get all books
router.get('/', bookController.getAllBooks);

// Get book by id
router.get('/:id', bookController.getBookById);

// Add a new book
router.post('/', bookController.createBook);

// Update a book by ID
router.put('/:id', bookController.updateBookById);

// Delete a book by ID
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
