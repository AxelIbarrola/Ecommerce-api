const express = require('express');
const app = express()

require("dotenv").config()
const PORT = process.env.PORT

const { errorHandler } = require('./src/middlewares/errorHandler')

const register_routes = require('./src/routes/register_routes')
const login_routes = require('./src/routes/login_routes')
const refresh_token_routes = require('./src/routes/refresh_token_routes')
const logout_routes = require('./src/routes/logout_routes')
const logoutAll_routes = require('./src/routes/logoutAll_routes')
const createProduct_routes = require('./src/routes/createProduct_routes')
const deleteProduct_routes = require('./src/routes/deleteProduct_routes')
const modifyProduct_routes = require('./src/routes/modifyProduct_routes')
const getAllProducts_routes = require('./src/routes/getAllProducts_routes')
const getProductsById_routes = require('./src/routes/getProductsById_routes')
const createCart_routes = require('./src/routes/createCart_routes')
const addProduct_routes = require('./src/routes/addProduct_routes')
const getCart_routes = require('./src/routes/getCart_routes')
const eliminatedProduct_routes = require('./src/routes/eliminatedProduct_routes')
const subtractProduct_routes = require('./src/routes/subtractProduct_routes')
const checkout_routes = require('./src/routes/checkout_routes')
const cancelCart_routes = require('./src/routes/cancelCart_routes')






app.use(express.json())

app.get("/", (req, res) => {
    res.send("Ax")
}
)

app.use('/api/auth', register_routes)
app.use('/api/auth', login_routes)
app.use('/api/auth', refresh_token_routes)
app.use('/api', logout_routes)
app.use('/api', logoutAll_routes)
app.use('/api', createProduct_routes)
app.use('/api', deleteProduct_routes)
app.use('/api', modifyProduct_routes)
app.use('/api', getAllProducts_routes)
app.use('/api', getProductsById_routes)
app.use('/api/cart', createCart_routes)
app.use('/api/cart', addProduct_routes)
app.use('/api/cart', getCart_routes)
app.use('/api/cart', eliminatedProduct_routes)
app.use('/api/cart', subtractProduct_routes)
app.use('/api/cart', checkout_routes)
app.use('/api/cart', cancelCart_routes)



app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto: ${PORT}`)}
)

app.use(errorHandler)