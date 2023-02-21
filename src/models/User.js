const mongoose = require('mongoose')

const User = mongoose.model('User', {
    userName: String,
    password: String,
    confirmPassword: String,
    avatar: String,
})

module.exports = User
