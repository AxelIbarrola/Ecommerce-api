const { Cart } = require('../models/Cart')
const { Product } = require('../models/Product')
const { CartItem } = require('../models/CartItem')
const { where } = require('sequelize')

const addProduct = async (req, res, next) => {

    const userId  = req.user.id
    const { productId, quantity } = req.body

    try{

        const activeCart = await Cart.findOne({ where: { userId, status: 'active' }})

        if (!activeCart) {
            return res.status(404).json('No hay un carrito activo.')
        }

        const product = await Product.findByPk(productId)

        if (!product) {
            return res.status(404).json({ error: 'Producto no econtrado.'})
        }

        let cartItem = await CartItem.findOne({ where: {
            cartId: activeCart.id,
            productId
        }})

        if (cartItem) {
            cartItem.quantity += quantity
            await cartItem.save()
        } else {
            cartItem = await CartItem.create({
                cartId: activeCart.id,
                productId,
                quantity
            })
        }

        activeCart.totalPrice += product.price * quantity
        await activeCart.save()


        res.status(200).json({
            message: 'Producto agregado exitosamente.',
            cartItem,
            cartPrice: activeCart.totalPrice
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { addProduct }