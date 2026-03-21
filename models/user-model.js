const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/iet_hackathon');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});