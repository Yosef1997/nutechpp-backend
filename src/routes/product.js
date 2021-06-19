const routes = require('express').Router()
const productController = require('../controllers/products')
const productMiddleware = require('../middleware/uploadProduct')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/product', authMiddleware.authCheck, productMiddleware, validator.valdationResult, validator.addProduct, productController.createProduct)
routes.get('/product', productController.getProduct)
routes.get('/product/:id', productController.getDetailProduct)
routes.patch('/product/:id', authMiddleware.authCheck, productMiddleware, productController.editProduct)
routes.delete('/product/:id', productController.deleteProduct)

module.exports = routes
