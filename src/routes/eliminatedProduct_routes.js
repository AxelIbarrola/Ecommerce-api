const router = require('express').Router()
const { idValidate } = require('../middlewares/idValidate')
const { productExists } = require('../middlewares/productExists')
const { verifyToken } = require('../middlewares/token_verify')
const { eliminatedProduct } = require('../controllers/eliminatedProduct_controller')

router
.delete('/items/:id',
    verifyToken,
    idValidate,
    productExists,
    eliminatedProduct
)

module.exports = router