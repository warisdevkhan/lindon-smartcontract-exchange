const mongoose = require('mongoose')

const kycDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  passport:{
    type: String,
    required: true,
  },
  idCard:{
    type: String,
    required: true,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('kycDetails', kycDetailsSchema)