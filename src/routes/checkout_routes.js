const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { checkout } = require('../controllers/checkout_controller')

router 
.patch('/checkout',
    verifyToken,
    checkout
)

module.exports = router