const jwt = require('jsonwebtoken');
require('dotenv').config();

const createAccessToken = (user)  => {
    const payload = {
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }

    const tokenAccess = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '5m'
    })

    return tokenAccess
}

const createRefreshToken = (user)  => {
    const payload = {
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    })

    return refreshToken
}


module.exports = { createAccessToken, createRefreshToken }