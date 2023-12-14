const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    const { username, password, firstName, lastName, email,role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, password: hashedPassword , firstName, lastName, email, role:'admin'});
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Received login request:', req.body);

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Use an environment variable for a more secure secret key
    const secretKey = process.env.JWT_SECRET || 'default-secret-key';
    const token = jwt.sign({ username: user.username }, secretKey);

    console.error('Login successful:');
    res.json({ token, user, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
