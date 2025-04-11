const router = require('express').Router();
const { registerValidator } = require('../validators/register_validator');
const { errorValidate } = require('../middlewares/errorValidate');
const { register } = require('../controllers/register_controller');

router
.post('/register',
    registerValidator,
    errorValidate,
    register
)

module.exports = router