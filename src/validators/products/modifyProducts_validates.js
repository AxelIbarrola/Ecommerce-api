const { modifyNameValidate, modifyDescriptionValidate, modifyPriceValidate, modifyStockValidate } = require('./modifyProductValidators')

const modifyProductValidator = [
    modifyNameValidate,
    modifyDescriptionValidate,
    modifyPriceValidate,
    modifyStockValidate
]

module.exports = { modifyProductValidator }