const { body } = require('express-validator')

const modifyNameValidate = body('name')
.optional()
.isString().withMessage('El nombre del producto debe ser un String.').bail()
.notEmpty().withMessage('El nombre no debe estar vacío.').bail()
.isLength({min: 1, max: 50}).withMessage('El nombre debe tener entre 1 y 50 caracteres.')

const modifyDescriptionValidate = body('description')
.optional()
.isString().withMessage('La descripción del producto debe ser un String.').bail()
.notEmpty().withMessage('La descripción no debe estar vacía.').bail()
.isLength({min: 10, max: 200}).withMessage('La descripción debe tener entre 10 y 200 caracteres.')

const modifyPriceValidate = body('price')
.optional()
.notEmpty().withMessage('El precio no debe estar vacío.').bail()
.isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal.')

const modifyStockValidate = body('stock')
.optional()
.notEmpty().withMessage('El stock no debe estar vacío.').bail()
.isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual que 0.')


module.exports = { modifyNameValidate, modifyDescriptionValidate, modifyPriceValidate, modifyStockValidate }