const kycDetails = require("../models/kycDetails");
const User = require("../models/userModel");

const approveKyc = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.body.id, {
      kycStatus: "Success",
    });
    res.status(200).json({
      success: true,
      msg: "User Kyc Approved Successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const disApproveKyc = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.body.id, {
      kycStatus: "Rejected By Admin",
    });
    res.status(200).json({
      success: true,
      msg: "User Kyc Disapproved Successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json({
      success: true,
      users: user,
      msg: "All User Get Successfully",
    });
  } catch (error) {
    console.log("error ==>", error);
    res.status(400).json({ success: false, error });
  }
};

const adminDashboard = async (req, res, next) => {
  try {
    const user = await User.find();
    const data = user?.filter((e) => e.role === "user");

    res.status(200).json({
      success: true,
      result: {
        totalUsers: data.length,
      },
      msg: "Admin Dashboard Data Get Successfully",
    });
  } catch (error) {
    console.log("error ==>", error);
    res.status(400).json({ success: false, error });
  }
};

const userKycDetails = async (req, res, next) => {
  console.log("req.body.id",req.body.id);
  try {
    let user = await kycDetails.findOne({user_id: req.body.id});

    // console.log("user==>>",user);

    res.status(200).json({
      success: true,
      userDetails: user,
      msg: "Kyc Details Data Get Successfully",
    });
  } catch (error) {
    console.log("error ==>", error);
    res.status(400).json({ success: false, error });
  }
};

module.exports = { approveKyc, disApproveKyc, getAllUsers, adminDashboard ,userKycDetails};
