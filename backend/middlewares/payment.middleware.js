const { check } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'receipt':
      {
        return [
          check('dateofPurchase', 'Please enter valid dateofPurchase in epoch').exists().trim(),
          check('amountOfToken', 'Please enter valid amountOfToken').exists()
          .trim(),
          check('PaymentRecipet',"Please enter valid PaymentRecipet object").exists().isObject()
        ]
      }
      break;
    case 'invoice':{
      return [
          check('price', 'Please enter valid price').exists().trim(),
          check('currency', 'Please enter valid currency ex-: USD').exists()
          .trim(),
        ]
    }
    break;
  }
}