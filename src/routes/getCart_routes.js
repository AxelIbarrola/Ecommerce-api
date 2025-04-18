const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { getCart } = require('../controllers/getCart_controller')

router
.get('/',
    verifyToken,
    getCart
)

module.exports = router