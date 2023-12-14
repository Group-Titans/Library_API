// controllers/BookController.js

const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    await Book.findByIdAndUpdate(bookId, updatedBook);
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

exports.getBookById = async (req, res) => {
    try {
      const bookId = req.params.id;
  
      // Fetch the book by ID
      const book = await Book.findById(bookId);
  
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
  
      res.json(book);
    } catch (error) {
      console.error('Error getting book by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };


exports.deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    await Book.findByIdAndDelete(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
