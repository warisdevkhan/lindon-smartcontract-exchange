const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_activated: {
    type: Boolean,
    default: false
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
  },
  kycStatus: {
    type: String,
    default: "Not Completed"
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)