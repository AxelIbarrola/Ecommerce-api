const { Cart } = require('../models/Cart')

const createCart = async(req, res, next) => {

    const userId = req.user.id

    try {

        const storedCart = await Cart.findOne({
            where: { userId, status: 'active' }
        })

        if (storedCart) {
            return res.status(400).json({
                error: 'Ya tienes un carrito activo.'
            })
        }

        const cart = await Cart.create({
            userId,
            status: 'active',
            totalPrice: 0
        })

        res.status(201).json({
            message: 'Carrito creado con éxito',
            cart: {
                id: cart.id,
                userId: cart.userId,
                status: cart.status,
                totalPrice: cart.totalPrice
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { createCart }