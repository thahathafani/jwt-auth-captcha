const express = require('express');
const { registerUser, loginUser } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


// Register Routes

router.post('/register', registerUser);


// Login Routes

router.post('/login', loginUser);

// Protected Route Example
router.get('/profile', protect, (req, res) => {
    res.json(req.user);

});

module.exports = router;