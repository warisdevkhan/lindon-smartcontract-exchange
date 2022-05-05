const mongoose = require('mongoose')
const invoiceSchema = new mongoose.Schema({
  
  invoce: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  TokenTransfeStatus:{
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Invoice', invoiceSchema)