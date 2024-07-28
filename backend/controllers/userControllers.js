// modules

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Registration

exports.registerUser = async (req, res) => {
    const { username, email, password, captcha } = req.body;


    // validate Captcha

    if (captcha !== 'expectedCaptcha') {
        return res.status(400).json({message: 'Invalid CAPTCHA'});

    }

    // User validating

    try {

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }

};



// User Login
exports.loginUser = async (req, res) => {
    const { emailOrUsername, password, captcha } = req.body;
  
    // Validate CAPTCHA
    if (captcha !== 'expectedCaptcha') { // Replace with actual CAPTCHA validation
      return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }
  
    try {
      const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };