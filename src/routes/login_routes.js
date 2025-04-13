const { registerValidator } = require('../validators/register_validator');
const { errorValidate } = require('../middlewares/errorValidate');
const { login } = require('../controllers/login_controller');
const router = require('express').Router();

router
.post('/login',
    registerValidator,
    errorValidate,
    login
)

module.exports = router