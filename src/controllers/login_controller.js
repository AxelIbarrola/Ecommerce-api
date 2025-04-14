const bcrypt = require('bcrypt');
const { User } = require('../models/User');
const { RefreshToken } = require('../models/RefreshToken');
const { createAccessToken, createRefreshToken } = require('../utils/createTokens');

const login = async (req, res, next) => {

    try {

        const { email, password } = req.body

        const existingUser = await User.findOne({ where: { email }})

        if(!existingUser) {
            return res.status(400).json({ error: 'Email o contraseña inválidos.'})
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

        if(!isMatch) {
            return res.status(400).json({ error: 'Email o contraseña inválidos.'})
        }

        const accessToken = createAccessToken({
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        })

        const refreshToken = createRefreshToken({
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        })

        await RefreshToken.create({
            token: refreshToken,
            userId: existingUser.id
        })

        res.status(200).json({
            message: 'Logueado correctamente.',
            user: {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role
            },
            accessToken,
            refreshToken
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { login }