const mongoose = require('mongoose')

// const transactionsSchema = new mongoose.Schema({
//   amount: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   dob: { type: Date, required: true }
// }, { timestamps: true })

const transactionsSchema = new mongoose.Schema({
  from: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  dateofPurchase: {
    type: Date,
    required: true
  },
  amountOfToken: {
    type: String,
    required: true,
  },
  PaymentRecipet: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  TokenTransfeStatus:{
    type: Boolean,
    default: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('Transactions', transactionsSchema)