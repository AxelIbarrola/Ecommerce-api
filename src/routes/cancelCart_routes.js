const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { cancelCart } = require('../controllers/cancelCart_controller')

router
.patch('/cancel',
    verifyToken,
    cancelCart
)

module.exports = router