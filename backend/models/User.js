const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Password Pre-save

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }

    // Hashing Password

    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Matching Password

userSchema.method.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);