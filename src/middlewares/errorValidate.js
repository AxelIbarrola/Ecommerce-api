const { validationResult } = require('express-validator');

const errorValidate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        
        const error = new Error('Fallo en la validación.')
        error.status = 400
        error.details = errors.array()

        return next(error)
    }

    next()
}

module.exports = { errorValidate }