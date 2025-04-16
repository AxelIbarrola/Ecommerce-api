const { productIdValidator } = require('./productId_validator')
const { quantityValidator } = require('./quantity_validator')

const cartItemValidator = [ productIdValidator, quantityValidator ]

module.exports = { cartItemValidator }