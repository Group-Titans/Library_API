const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName : String,
    lastName : String,
    email:String,
    role : String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
