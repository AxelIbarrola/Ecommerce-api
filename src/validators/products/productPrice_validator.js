const { body } = require('express-validator')

const productPriceValidator = body('price')
.exists().withMessage('El precio del producto es requerido.').bail()
.notEmpty().withMessage('El precio del producto no puede estar vacío.').bail()
.isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal.')


module.exports = { productPriceValidator }