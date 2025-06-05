const mongoose = require('mongoose')

const PasswordSchema = new mongoose.Schema({
    siteUrl: String,
    username: String,
    password: String,
    userId: String,
});

const Password = mongoose.model('Password', PasswordSchema);

module.exports = { Password };