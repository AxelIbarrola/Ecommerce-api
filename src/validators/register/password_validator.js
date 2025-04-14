const { body } = require('express-validator');

const passwordValidator = body('password')
    .exists().withMessage('La contraseña no ha sido enviada en la petición.').bail()
    .notEmpty().withMessage('La contraseña no debe estar vacía.').bail()
    .isLength({min: 6}).withMessage('La contraseña debe tener mínimo 6 caracteres.')

module.exports = { passwordValidator }