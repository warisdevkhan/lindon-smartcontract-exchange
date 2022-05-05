const express = require('express')
const auth = require('../middlewares/auth')
const payemntMiddleware = require('../middlewares/payment.middleware')
const paymentController = require('../controllers/payment')

const router = express.Router()

/**
* @api {post} /payment/receipt
* @apiName Save payemnt receipt
* @apiGroup Payment
* @apiParam  {Number} [dateofPurchase] time in epoch
* @apiParam  {Number} [amountOfToken] token amount which user wants to get
* @apiParam  {Object} [PaymentRecipet] payment success receipt
**/
router.post('/receipt', auth, payemntMiddleware.validate('receipt'), paymentController.receipt)

/**
* @api {post} /payment/invoice
* @apiName save invoice details
* @apiGroup Payment
* @apiParam  {Number} [price] price to pay
* @apiParam  {String} [currency] currency which user wants to pay example -: USD
* @return {Object} [result] invoice receipt
**/
router.post('/invoice', auth, payemntMiddleware.validate('invoice'), paymentController.invoice)

module.exports = router