require('dotenv').config()
const payemntModel = require('../models/paymentModel')
const invoiceModel = require('../models/invoiceModel')
const { validationResult } = require('express-validator')
const CustomError = require('../models/CustomError')
const crypto = require("crypto");
const { Client, Env, Currency, Models, Tokens } = require('bitpay-sdk');
const path = require("path")
const configFilePath = path.join(__dirname, '../config/wallet.json')
const receipt = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		})
	}
	try {
		const body = req.body;
		body['from'] = body['user_id'];
		const payment = new payemntModel(body);
		await payment.save()
		res.send({ success: true, msg: "Transaction data saved" })
	} catch (error) {
		next(new CustomError(error, 500))
	}

}

const invoice = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		})
	}
	try {
		const body = req.body;
		body['from'] = body['user_id'];
		let client = new Client(configFilePath);
		//buyer

		let buyer = {

			name: "Bily Matthews",
			address1: "168 General Grove",
			address2: "",
			locality: "Port Horizon",
			region:"New Port",
			postalCode: "KY7 1TH",
			country: "AD",
			email: "john@doe.com",
			phone: "+990123456789",
			notify: true,
		}

		//invoice
		let invoiceData = new Models.Invoice(body.price, body.currency);
		invoiceData.buyer = buyer;
		invoiceData.orderId = crypto.randomBytes(16).toString("hex");
		//invoiceData.fullNotifications = true;
		//invoiceData.extendedNotifications = true;
		// invoiceData.notificationURL = "https://hookb.in/1gw8aQxYQDHj002yk79K";
		// invoiceData.redirectURL = "https://hookb.in/1gw8aQxYQDHj002yk79K";
		invoiceData.itemDesc = 'buy token';
		invoiceData.notificationEmail = "pawan.t@cisinlabs.com"; //merchant email
		const result = await client.CreateInvoice(invoiceData);
		const invoice = new invoiceModel({ invoce: result });
		await invoice.save()
		//console.log(result)
		res.send({ success: true, msg: "invoice created", data: result })
	} catch (error) {
		next(new CustomError(error, 500))
	}

}



module.exports = { receipt, invoice }