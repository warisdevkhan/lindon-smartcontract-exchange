const Wallet = require('../models/walletModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const hdAddress = require('hd-address');
const CustomError = require('../models/CustomError')
const Cryptr = require('cryptr');
const fs = require('fs');
const path = require('path');

const createWallet = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        })
    }

    try {
        // const user = await User.findOne({ token: req.headers.authorization });
        // HDWallets().then((datas) => {
        //     wallet = new Wallet(datas)
        //     const salt = await bcrypt.genSalt(10)
        //     const hashedPassword = await bcrypt.hash(password, salt)
        //     wallet.password = hashedPassword
        //     wallet.user_id = user.id
        //     await wallet.save()

        //     res.status(201).json({ success: true, wallet })
        // });
        res.status(201).json({ success: true, wallet: "wallet data" })

    } catch (err) {
        next(new CustomError('Something went wrong', 500))
    }
}

const recovery = async (req, res, next) => {
    res.status(200).json({ success: true });
}

const balance = async (req, res, next) => {
    res.status(200).json({ success: true });
}

const transfer = async (req, res, next) => {
    res.status(200).json({ success: true });
}

const allTransaction = async (req, res, next) => {
    res.status(200).json({ success: true });
}




module.exports = { createWallet, recovery, allTransaction, transfer, balance }