const router = require('express').Router()
const { verifyToken } = require('../middlewares/token_verify')
const { verifyRole } = require('../middlewares/role_verify')
const { idValidate } = require('../middlewares/idValidate')
const { productExists } = require('../middlewares/productExists')
const { deleteProduct } = require('../controllers/deleteProduct_controller')

router
.delete('/products/:id',
        verifyToken,
        verifyRole('admin'),
        idValidate,
        productExists,
        deleteProduct
)

module.exports = router