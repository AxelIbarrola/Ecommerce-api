const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { createCart } = require('../controllers/createCart_controller')

router
.post('/',
    verifyToken,
    createCart
)

module.exports = router