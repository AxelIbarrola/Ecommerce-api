const router = require('express').Router();
const { cartItemValidator } = require('../validators/cartItem/cartItem_validator')
const { errorValidate } = require('../middlewares/errorValidate');
const { verifyToken } = require('../middlewares/token_verify');
const { addProduct } = require('../controllers/addProduct_controller')



router
.post('/items',
    verifyToken,
    cartItemValidator,
    errorValidate,
    addProduct
)

module.exports = router