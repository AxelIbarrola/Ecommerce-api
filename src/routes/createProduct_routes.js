const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { verifyRole } = require('../middlewares/role_verify');
const { productValidator } = require('../validators/products/product_validator');
const { errorValidate } = require('../middlewares/errorValidate');
const { createProduct } = require('../controllers/createProduct_controller');


router
.post('/products',
        verifyToken,
        verifyRole('admin'),
        productValidator,
        errorValidate,
        createProduct
)

module.exports = router