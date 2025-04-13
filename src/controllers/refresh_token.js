const { RefreshToken } = require('../models/RefreshToken')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createAccessToken, createRefreshToken } = require('../utils/createTokens')

const refresh = async(req, res, next) => {

    const { refreshToken } = req.body 

    if(!refreshToken) {
        return res.status(401).json({ error: 'El token de actualización es necesario.'})
    }

    try {

        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken }})

        if (!storedToken) {
            return res.status(403).json({ error: 'Token de actualización no encontrado o eliminado.'})
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const { id, email } = decoded.user

        await storedToken.destroy()

        const newAccessToken = createAccessToken({
            id,
            email
        })

        const newRefreshToken = createRefreshToken({
            id,
            email
        })

        await RefreshToken.create({
            token: newRefreshToken,
            userId: id
        })

        res.status(200).json({
            message: 'Nuevo token de acceso creado.',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })



    } catch (error) {
        next(error)
    }
}

module.exports = { refresh }