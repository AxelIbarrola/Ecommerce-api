const express = require('express');
const app = express()

require("dotenv").config()
const PORT = process.env.PORT

const { errorHandler } = require('./src/middlewares/errorHandler')

const register_routes = require('./src/routes/register_routes')

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Ax")
}
)

app.use('/api/auth', register_routes)

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto: ${PORT}`)}
)

app.use(errorHandler)