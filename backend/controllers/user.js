const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

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

    res.status(201).json({ success: true, user , msg: "user signup successfully" })
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

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      // return next(new CustomError(`Invalid credentials`, 400))
      return res.status(400).json({ success: false, msg: "Invalid credentials" })
    }
    const accessToken = createToken({
      id: user._id,
      role:  user.role,
    })
    await user.updateOne({ token: accessToken })
    res
      .header('authorization', accessToken)
      .send({ success: true, accessToken , role: user.role })

  } catch (err) {
    console.log(err)
    // next(new CustomError('Something went wrong', 500))
    res.status(500).json({ success: false, msg: "Something went wrong" })

  }
}


const logout = async (req, res, next) => {
  await User.updateOne({_id:req.body.user_id},{ token: "" });
  res.send({ success: true, msg: "successfully logout" })
}
module.exports = { signUp, login, logout }