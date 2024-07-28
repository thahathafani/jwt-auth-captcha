// Modules

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// MIddleware

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// PORT

const PORT = process.env.PORT || 8000;

// Routes

// const userRoutes = require('./routes/userRoutes');
// app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Helloo iam here...')
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} ...`);
})
