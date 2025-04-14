const { body } = require('express-validator')

const productDescriptionValidator = body('description')
.exists().withMessage('La descripción del producto es requerida.').bail()
.notEmpty().withMessage('La descripción no puede estar vacía.').bail()
.isLength({ min: 10, max: 200 }).withMessage('La descripción debe tener entre 10 y 200 caracteres.')

module.exports = { productDescriptionValidator }