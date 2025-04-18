const { Cart } = require('../models/Cart')
const { CartItem } = require('../models/CartItem')

const subtractProduct = async (req, res, next) => {

    const userId = req.user.id;
    const productId = req.product.id
    const  quantity  = parseInt(req.body.quantity) || 1

    try {

        const cart = await Cart.findOne({ where: {
            userId,
            status: 'active'
        }})

        if (!cart) {
            return res.status(404).json({ error: 'El usuario no tiene un carrito activo.'})
        }

        const product = await CartItem.findOne( { where: {
            cartId: cart.id,
            productId
        }})

        if (!product) {
            return res.status(404).json({ error: 'El producto no se encuentra en el carrito.'})
        }

        if (quantity != 1) {

            if (quantity <= product.quantity) {

                product.quantity -= quantity;
                await product.save()
    
                const priceProductSubtract = parseFloat(quantity * product.priceAtPurchase);
                const currentPrice = parseFloat(cart.totalPrice)
    
                cart.totalPrice = currentPrice - priceProductSubtract
                await cart.save()

                if (product.quantity == 0) {
                    await product.destroy()
                }
            } else {
                return res.status(401).json({ error: 'Cantidad inválida, no puede ser mayor que la cantidad de productos existentes.'})
            }

        } else {

            if (product.quantity > 0) {

                product.quantity -= 1;
                await product.save()
    
                cart.totalPrice = parseFloat((cart.totalPrice - product.priceAtPurchase).toFixed(2))
                await cart.save()

                if (product.quantity == 0) {
                    await product.destroy()
                }
            } else {
                cart.totalPrice = parseFloat((cart.totalPrice - product.priceAtPurchase).toFixed(2));
                await cart.save();
                await product.destroy()
            }
        }

        res.status(201).json({
            message: `Cantidad de productos eliminados: ${quantity}`,
            subtractProduct: {
                id: productId,
                quantity: quantity,
                priceAtPurchase: product.priceAtPurchase
            },
            updateCartPrice: cart.totalPrice
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { subtractProduct }