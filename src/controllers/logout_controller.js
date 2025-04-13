const { RefreshToken } = require("../models/RefreshToken")

const logout = async (req, res, next) => {

    const { refreshToken } = req.body 

    if (!refreshToken) {
        return res.status(400).json({ error: 'El token de actualización es requerido.'})
    }

    try{

        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken }})

        if (!storedToken) {
            return res.status(404).json({ error: 'Token de actualización revocado o expirado.'})
        }

        await storedToken.destroy()

        res.status(200).json({ message: 'Sesión finalizada con éxito.'})

    } catch (error) {
        next(error)
    }

}

module.exports = { logout }