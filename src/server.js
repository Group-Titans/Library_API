const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Initial MongoDB connection
// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yeskaykannan:TuWVT4FaJGVWc4LV@cluster0.cwd9lx4.mongodb.net/myprofile?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Enable CORS
app.use(cors());
// Middleware for handling CORS (adjust as needed)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Define routes
app.use('/api/auth', authRoutes);
// Use your book routes
app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Later in your code, when you need to switch the connection
function changeConnectionString(newConnectionString) {
  // Close the existing connection before opening a new one
  mongoose.connection.close(() => {
    mongoose.connect(newConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
  });
}

// Example usage
// changeConnectionString('mongodb+srv://yeskaykannan:TuWVT4FaJGVWc4LV@cluster0.cwd9lx4.mongodb.net/<new-database>?retryWrites=true&w=majority');
