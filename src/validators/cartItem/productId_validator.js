const { body } = require('express-validator')

const productIdValidator = body('productId')
.exists().withMessage('El id del producto es requerido.').bail()
.notEmpty().withMessage('El id del producto no puede estar vacío.').bail()
.isInt({ gt: 0}).withMessage('El id debe ser un número válido mayor que 0.')

module.exports = { productIdValidator }
