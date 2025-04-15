const router = require('express').Router()
const { verifyToken } = require('../middlewares/token_verify')
const { idValidate } = require('../middlewares/idValidate')
const { productExists } = require('../middlewares/productExists')
const { getProductById } = require('../controllers/getProductById_controller')

router
.get('/products/:id',
    verifyToken,
    idValidate,
    productExists,
    getProductById
)

module.exports = router