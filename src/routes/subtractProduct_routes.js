const router = require('express').Router()
const { verifyToken } = require('../middlewares/token_verify')
const { idValidate } = require('../middlewares/idValidate')
const { productExists } = require('../middlewares/productExists')
const { subtractProduct } = require('../controllers/subtractProduct_controller')

router
.put('/items/:id',
    verifyToken,
    idValidate,
    productExists,
    subtractProduct
)

module.exports = router