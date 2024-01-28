const mongoose = require('mongoose');

// Defining the Schema
const userSchema = new mongoose.Schema({
    email : {type: String, required: true},
    password : {type : String, required: true},
});

const User = mongoose.model('Users', userSchema);
module.exports = User;