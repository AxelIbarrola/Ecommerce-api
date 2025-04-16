const { body } = require('express-validator')

const quantityValidator = body('quantity')
.exists().withMessage('La cantidad es requerida.').bail()
.notEmpty().withMessage('La cantidad no debe estar vacía.').bail()
.isInt({ gt: 0}).withMessage('La cantidad debe ser un número válido mayor que 0.')

module.exports = { quantityValidator }