const { verifyToken } = require('../utils/jwt')
const User = require('../models/userModel')
const CustomError = require('../models/CustomError')

module.exports = async (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization
    ) {
      token = req.headers.authorization
      let decoded
      try {
        decoded = verifyToken(token)
      } catch (err) {
        return next(
          new CustomError('Unauthorized access, provide the token', 401)
        )
      }

      const user = await User.findById(decoded.id)

      if (!user) {
        return next(new CustomError('Unauthorized access', 401))
      }
      if (user.token != req.headers.authorization) {
        return next(
          new CustomError('token not found,please logged in again', 401)
        )
      }
      req.body['user_id'] = decoded.id;
      req.body['role'] = decoded.role
      next()
    } else {
      return next(
        new CustomError('Unauthorized access, provide the token', 401)
      )
    }


  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}