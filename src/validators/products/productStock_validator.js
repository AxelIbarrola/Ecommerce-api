const { body } = require('express-validator')

const productStockValidator = body('stock')
.exists().withMessage('El stock es requerido.').bail()
.notEmpty().withMessage('El stock no puede estar vacío.').bail()
.isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor que 0.')

module.exports = { productStockValidator }