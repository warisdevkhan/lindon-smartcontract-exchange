const { verifyToken } = require('../utils/jwt')
const User = require('../models/userModel')
const CustomError = require('../models/CustomError')

module.exports = async (req, res, next) => {
  try {

    let role = req.body.role
    console.log("role====>>",role);

    if (role === "admin") {
        next()
    } else {
        res.status(400).json({ success: false, msg: "Invalid Role Access" });  
    }

  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}