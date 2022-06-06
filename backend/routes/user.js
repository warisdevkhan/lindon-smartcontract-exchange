const express = require('express')
const auth = require('../middlewares/auth')
const userMiddleware = require('../middlewares/user.middleware')
const roleHelper = require('../helpers/role.helper')  //roleHelper.isAdmin
const userController = require('../controllers/user')

const router = express.Router()

/**
* @api {post} /user/signup
* @apiName signup new user
* @apiGroup User
* @apiParam  {String} [email] Email
* @apiParam  {String} [password] Password
* @apiParam  {String} [confirm_password] Confirm Password
*/

router.post(
  '/signup',
  userMiddleware.validate('signup'),
  userController.signUp
)

/**
* @api {post} /user/login
* @apiName login user
* @apiGroup User
* @apiParam  {String} [email] Email
* @apiParam  {String} [password] Password
*/

router.post(
  '/login',
  userMiddleware.validate('login'),
  userController.login
)

/**
* @api {get} /user/logout
* @apiName logout user
* @apiGroup User
*/
router.get('/logout',auth, userController.logout)

router.get('/verify-email', userController.verifyEmail)

router.post('/forget-password',userMiddleware.validate('forget-password'), userController.forgetPassword)

router.post('/create-new-password', userController.generateNewPassword)

module.exports = router