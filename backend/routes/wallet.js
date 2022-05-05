const express = require('express')
const auth = require('../middlewares/auth')
const walletMiddleware = require('../middlewares/wallet.middleware')
const walletController = require('../controllers/wallet')

const router = express.Router();

/**
* @api {post} /wallet/create
* @apiName create new wallet
* @apiGroup wallet
*/
router.post('/create',auth,walletController.createWallet);

router.post('/balance',auth,walletController.balance);

router.post('/transfer',auth,walletController.transfer);

router.post('/alltransaction',auth,walletController.allTransaction);

router.post('/recover',auth,walletController.recovery);

module.exports = router