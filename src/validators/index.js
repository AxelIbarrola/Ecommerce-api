const { emailValidator } = require('./register/email_validator');
const { passwordValidator } = require('./register/password_validator');
const { productNameValidator } = require('./products/productName_validator')
const { productDescriptionValidator } = require('./products/productDescription_validator')
const { productPriceValidator } = require('./products/productPrice_validator')
const { productStockValidator } = require('./products/productStock_validator')


module.exports = {
    emailValidator,
    passwordValidator,
    productNameValidator,
    productDescriptionValidator,
    productPriceValidator,
    productStockValidator
}