const { check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'kycDetails':
      {
        return [
          check('name', 'Please enter a valid name').exists().trim().isLength({ min: 1 }),
          check('address', 'Please enter a valid address').exists().trim().isLength({ min: 1 }),
          check('country', 'Please enter a valid country').exists().trim().isLength({ min: 1 }),
          check('city', 'Please enter a valid city').exists().trim().isLength({ min: 1 }),
          check('user_id', 'Please enter a valid user_id').exists().trim().isLength({ min: 1 }),
        ]
      }
      break;
  }
}