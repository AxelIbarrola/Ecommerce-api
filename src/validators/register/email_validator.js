const { body } = require('express-validator');

const emailValidator = body('email')
    .exists().withMessage('El email no se ha enviado en la petición.').bail()
    .notEmpty().withMessage('El email no debe estar vacío.').bail()
    .isEmail().withMessage('Formato de email inválido.')

module.exports = { emailValidator }