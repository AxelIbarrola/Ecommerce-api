const router = require('express').Router()
const { verifyToken } = require('../middlewares/token_verify')
const { verifyRole } = require('../middlewares/role_verify')
const { idValidate } = require('../middlewares/idValidate')
const { productExists } = require('../middlewares/productExists')
const { errorValidate } = require('../middlewares/errorValidate');
const { modifyProductValidator } = require('../validators/products/modifyProducts_validates')
const { modifyProduct } = require('../controllers/modifyProduct_controller')

router
.put('/products/:id',
    verifyToken,
    verifyRole('admin'),
    idValidate,
    productExists,
    modifyProductValidator,
    errorValidate,
    modifyProduct
)

module.exports = router