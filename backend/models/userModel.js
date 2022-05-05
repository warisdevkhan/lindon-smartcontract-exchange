const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },
  role: {
    type: String,
    default: "user",
    ref: "Role",
  }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)