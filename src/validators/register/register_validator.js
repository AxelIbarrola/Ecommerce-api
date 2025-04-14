const { body } = require('express-validator');
const { emailValidator, passwordValidator } = require('../index');

registerValidator = [
    emailValidator,
    passwordValidator
]

module.exports = { registerValidator }