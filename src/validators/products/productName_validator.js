const { body } = require('express-validator')

const productNameValidator = body('name')
.exists().withMessage('El nombre del producto es requerido.').bail()
.notEmpty().withMessage('El nombre del producto no debe estar vacío.').bail()
.isLength({min: 1, max: 50}).withMessage('El nombre debe tener entre 1 y 50 caracteres.')

module.exports = { productNameValidator }