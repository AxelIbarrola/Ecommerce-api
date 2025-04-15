const router = require('express').Router();
const { verifyToken } = require('../middlewares/token_verify');
const { getProducts } = require('../controllers/getAllProducts_controller');

console.log(verifyToken)
console.log(getProducts)


router
.get('/products',
    verifyToken,
    getProducts
)


module.exports = router