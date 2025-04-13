const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const headerToken = req.headers['authorization']

    if (!headerToken || !headerToken.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Formato inválido en el token de acceso.'})
    }

    const accessToken = headerToken.split(' ')[1]

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, 
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token de acceso inválido.'})
            }

            req.user = decoded.user
            next()
        }
    )
}

module.exports = { verifyToken }

