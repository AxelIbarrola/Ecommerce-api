const { RefreshToken } = require('../models/RefreshToken')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const logoutAll = async (req, res, next) => {

    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(400).json({ error: 'El token de actualización es requerido.'})
    }

    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken }})

    if (!storedToken) {
        return res.status(404).json({ error: 'Token de actualización revocado o expirado'})
    }

    try{

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const { id } = decoded.user

        const deleted = await RefreshToken.destroy({ where: { userId: id }})

        res.status(200).json({
            message: 'Todas las sesiones finalizaron con éxito',
            sessionsOut: deleted
        })

    } catch ( error ) {
        next(error)
    }

}

module.exports = { logoutAll }