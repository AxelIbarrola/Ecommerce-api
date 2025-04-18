const { Cart } = require('../models/Cart')

const cancelCart = async ( req, res, next) => {

    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ where: { userId, status: 'active' } })

        if (!cart) {
            return res.status(404).json({ error: 'No se encontró ningún carrito activo.' })
        }

        cart.status = 'canceled'
        await cart.save()

        res.status(200).json({ message: 'Carrito cancelado con éxito.',
            cart: {
                id: cart.id,
                totalPrice: cart.totalPrice
            }
        })

    } catch(error) {
        next(error)
    }
}

module.exports = { cancelCart }