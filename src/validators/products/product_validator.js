const { productNameValidator, productDescriptionValidator, productPriceValidator, productStockValidator } = require('../index');

const productValidator = [
    productNameValidator,
    productDescriptionValidator,
    productPriceValidator,
    productStockValidator
]

module.exports = { productValidator }