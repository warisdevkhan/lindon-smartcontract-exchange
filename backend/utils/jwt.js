const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'secretkey'

const createToken = payload => {
  return jwt.sign(payload, jwtSecret,{expiresIn: "2h"})
}

const verifyToken = token => {
  try {
    
    return jwt.verify(token, jwtSecret)
  } catch (error) {
    return false
  }
}

module.exports = { createToken, verifyToken }
