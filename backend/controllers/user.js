const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const emailConfig = require("../config/email");

const { createToken } = require('../utils/jwt')
const CustomError = require('../models/CustomError')

const signUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      // return next(
      //   new CustomError('User with provided email already exists', 403)
      // )
      return res.status(400).json({ success: false, msg: "User with provided email already exists" })
    }

    user = new User({
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword

    await user.save()

    const email_verify_link = `${process.env.FRONTEND_URL}/verify-email?id=${user._id}&token=${user.password}`;//link to verify email

    const html = `<h1> Please click on the link to verify your email </h1>\<a href=${email_verify_link}> Click Here </a>`;

    emailConfig.sendEmail(user.email, "Verify Your Email", "", false, html);//sending verification mail

    res.status(201).json({ success: true, user, msg: "user signup successfully" })
  } catch (err) {
    console.log(err)
    // next(new CustomError('Something went wrong', 500))
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (!user) {
      // return next(new CustomError('Invalid credentials', 400))
      return res.status(400).json({ success: false, msg: "Invalid credentials" })
    }

    if (!user.email_activated) {
      return res.status(400).json({ success: false, msg: "Email not activated" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      // return next(new CustomError(`Invalid credentials`, 400))
      return res.status(400).json({ success: false, msg: "Invalid credentials" })
    }
    const accessToken = createToken({
      id: user._id,
      role: user.role,
    })
    await user.updateOne({ token: accessToken })
    res
      .header('authorization', accessToken)
      .send({ success: true, accessToken, role: user.role })

  } catch (err) {
    console.log(err)
    // next(new CustomError('Something went wrong', 500))
    res.status(500).json({ success: false, msg: "Something went wrong" })

  }
}


/* Function to verify user email (activate email)*/
const verifyEmail = async (req, res) => {
  const id = req.query.id;
  const token = req.query.token;

  try {
    var user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" })
    }

    if (user) {
      if (user.email_activated) {
        return res.status(200).json({ success: true, msg: "Email already activated" })
      }
      if (!user.email_activated) {
        if (user.password === token) {
          user.email_activated = true;
          user.save();
          return res.status(200).json({ success: true, msg: "Email activated successfully" })
        }
        else {
          return res.status(400).json({ success: false, msg: "Invalid credentials" })
        }
      }
    }
  } catch (error) {
    return res.status(400).json({ success: false, error: error })
  }
}


const forgetPassword = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const email = req.body.email;

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ success: false, msg: "User with this email not found" })
    }

    await user.save();

    const email_verify_link = `${process.env.FRONTEND_URL}/generate-new-password?id=${user._id}&token=${user.password}`;//link to verify email

    const html = `<h1> Please click on the link to create new password </h1>\<a href=${email_verify_link}> Click Here </a>`;

    emailConfig.sendEmail(user.email, "Create new password", "", false, html);//sending verification mail

    res.status(200).json({ success: true, user, msg: "OTP sent successfully" })
  } catch (err) {
    // next(new CustomError('Something went wrong', 500))
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}


const generateNewPassword = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const id = req.query.id;
  const token = req.query.token;
  const password = req.query.password;


  try {
    let user = await User.findById(id)
    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found" })
    }

    if (user.password != token) {
      return res.status(400).json({ success: false, msg: "Token not match" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword;

    user.save();

    res.status(200).json({ success: true, user, msg: "Password changed successfully" })
  } catch (err) {
    console.log(err)
    // next(new CustomError('Something went wrong', 500))
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}


const logout = async (req, res, next) => {
  await User.updateOne({ _id: req.body.user_id }, { token: "" });
  res.send({ success: true, msg: "successfully logout" })
}
module.exports = { signUp, login, logout, verifyEmail, forgetPassword, generateNewPassword }