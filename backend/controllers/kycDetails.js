const KycDetails = require("../models/kycDetails");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("../utils/jwt");
const CustomError = require("../models/CustomError");

// in this api please provide user_id menuaally

const createKyc = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { passport, idCard } = req.files;

  if (!passport) {
    res.status(400).json({ success: false, msg: "Please provide Passport" });
  }
  if (!idCard) {
    res.status(400).json({ success: false, msg: "Please provide idCard" });
  }

  var checkUser = await User.findById(req.body.user_id);

  const { name, address, country, city } = req.body;

  const passportImage = `${process.env.URL}/${passport[0].path}`;
  const idCardImage = `${process.env.URL}/${idCard[0].path}`;

  if (checkUser.kycStatus === "Not Completed") {
    try {
      let kycDetails = new KycDetails({
        name: name,
        address: address,
        country: country,
        city: city,
        passport: passportImage,
        idCard: idCardImage,
        user_id: req.body.user_id
      });
      await kycDetails.save();
      let user = await User.findByIdAndUpdate(req.body.user_id, {
        kycStatus: "Pending For Approval",
      });
      res
        .status(201)
        .json({ success: true, msg: "Kyc Created SuccessFull", kycDetails });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, err });
    }
  }
  else if(checkUser.kycStatus === "Rejected By Admin"){
    try {
      let user = await User.findByIdAndUpdate(req.body.user_id, {
        kycStatus: "Pending For Approval",
      });
      let kycDetails = await KycDetails.findOneAndUpdate({user_id : req.body.user_id}, {
        name: name,
        address: address,
        country: country,
        city: city,
        passport: passportImage,
        idCard: idCardImage,
        user_id: req.body.user_id
      });

      res
        .status(201)
        .json({ success: true, msg: "Kyc Updated SuccessFull", kycDetails });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, err });
    }

  }
  else {
    res.status(200).json({ success: false, msg: "Kyc Already Created" });
  }
};

const getKycDetails = async (req, res, next) => {
  try {
    let user = await User.findById(req.body.user_id);
    res.status(200).json({
      success: true,
      user: {
        role: user.role,
        kycStatus: user.kycStatus,
        email: user.email,
        user_id: user._id,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = { createKyc, getKycDetails };
