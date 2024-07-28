const express = require('express');
const router = express.Router();


// Register Routes

router.post('/register', registerUser);


// Login Routes

router.post('/login', loginUser);

module.exports = router;