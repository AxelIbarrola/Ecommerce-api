const { Cart } = require('../models/Cart')
const { CartItem } = require('../models/CartItem')


const eliminatedProduct = async(req, res, next) => {

    const productId  = req.product.id;
    const  userId  = req.user.id

    try {

        const cart = await Cart.findOne({ where: {
            userId,
            status: 'active'
        }})

        if (!cart) {
            return res.status(404).json({ error: 'No se encuentra un carrito activo.'})
        }

        const product = await CartItem.findOne({ where:{
            cartId: cart.id,
            productId
        }
        })

        if (!product) {
            return res.status(404).json({ error: 'El producto no se encuentra en el carrito.'})
        }

        const currentPrice = parseFloat(cart.totalPrice)
        const productTotalPrice = product.quantity * product.priceAtPurchase

        cart.totalPrice = currentPrice - productTotalPrice
        await cart.save()

        await product.destroy()


        res.status(200).json({
            message: 'Producto eliminado correctamente.',
            updateCartPrice: cart.totalPrice,
            eliminatedProduct: {
                productId,
                quantity: product.quantity,
                priceAtPurchase: product.priceAtPurchase
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { eliminatedProduct }