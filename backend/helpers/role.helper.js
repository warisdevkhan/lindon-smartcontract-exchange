const Role = require('../models/role.model')
const User = require('../models/userModel')
const CustomError = require('../models/CustomError')

exports.isAdmin = (req, res, next) => {
  User.findOne({ token: req.headers.authorization }).exec((err, user) => {
    if (err) {
      return next(
        new CustomError(err, 403)
      )
    }
    Role.findOne({
        name: { $in: user.role }
      },
      (err, role) => {
        if (err) {
          return next(
            new CustomError(err, 403)
          )

        }
        if (role.name === "admin") {
          next();
          return;
        }
        return next(
          new CustomError('Require Admin Role!', 403)
        )
      }
    );
  });
};