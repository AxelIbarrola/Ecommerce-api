const { User } = require('../models/User');
const { RefreshToken } = require('../models/RefreshToken');
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../utils/createTokens');

const register = async(req, res, next) => {

    try {

        const { email, password } = req.body

        const existingUser = await User.findOne({ where: { email } })

        if(existingUser){
            return res.status(409).json({ error: 'El email ya está registrado.'})
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        const accessToken = createAccessToken({
            id: newUser.id,
            email: newUser.email
        })

        const refreshToken = createRefreshToken({
            id: newUser.id,
            email: newUser.email
        })

        await RefreshToken.create({
            token: refreshToken,
            userId: newUser.id
        })

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt
            },
            accessToken,
            refreshToken
        })


    } catch (error) {
        next(error)
    }

}

module.exports = { register }