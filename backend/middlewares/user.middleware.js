const { check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'signup':
      {
        return [
          check('email', 'Please enter a valid email').exists().trim().isEmail(),
          check('password', 'Please enter a valid password').exists()
          .trim()
          .isLength({ min: 8 }),
          check('confirm_password').custom((value, {
            req
          }) => {
            if (value !== req.body.password) {
              //console.log("eror in match password");
              throw new Error('The passwords is not same!!!');
            } else {
              return true;
            }

          })
        ]
      }
      break;
    case 'login':
      {
        return [
          check('email', 'Please enter a valid email').exists().trim().isEmail(),
          check('password', 'Please enter a valid password').exists()
          .trim()
          .isLength({ min: 8 }),
        ]
      }
    case 'forget-password':
      {
        return [
          check('email', 'Email required').exists().trim().isEmail(),

        ]
      }
  }
}