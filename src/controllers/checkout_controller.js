const { Cart } = require('../models/Cart')
const { CartItem } = require('../models/CartItem')
const { Product } = require('../models/Product')

const checkout = async (req, res, next) => {

    const userId = req.user.id;

    try {

        const cart = await Cart.findOne({ where: { userId, status: 'active' }})

        if (!cart) {
            return res.status(404).json({ error: 'No se encuentra un carrito activo.'})
        }

        const cartItems = await CartItem.findAll({ where: { cartId: cart.id } })

        if (cartItems.length === 0) {
            return res.status(404).json('El carrito se encuentra vacío.')
        }

        cart.status = 'completed'
        await cart.save()

        res.status(200).json({ 
            message: 'Checkout realizado con éxito.',
            cart: {
                id: cart.id,
                status: cart.status,
                totalPrice: cart.totalPrice,
                items: cartItems
            }
        })


    } catch (error){
        next(error)
    }
}

module.exports = { checkout }