const { body } = require('express-validator');
const { emailValidator, passwordValidator } = require('.');

registerValidator = [
    emailValidator,
    passwordValidator
]

module.exports = { registerValidator }