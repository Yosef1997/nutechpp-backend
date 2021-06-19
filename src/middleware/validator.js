const { checkSchema } = require('express-validator')
const { validationResult } = require('express-validator')
const response = require('../helpers/response')
const fs = require('fs')

exports.valdationResult = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    return response(res, 400, false, errors.array()[0].msg)
  }
  return next()
}

exports.addProduct = checkSchema({
  productName: {
    optional: { options: { nullable: false } },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Product name should be at least min 3 & max 50 character'
    }
  },
  buyPrice: {
    optional: { options: { nullable: false } },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Purchase price should be at least min 3 character'
    }
  },
  soldProduct: {
    optional: { options: { nullable: false } },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: 'Sold price should be at least min 3 character'
    }
  },
  Stock: {
    optional: { options: { nullable: false } },
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: 'Stock should be at least have 1'
    }
  }
})
