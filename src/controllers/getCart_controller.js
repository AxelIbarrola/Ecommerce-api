const { Cart } = require('../models/Cart')
const { Product } = require('../models/Product')
const { CartItem } = require('../models/CartItem')

const getCart = async (req, res, next) => {

    const userId = req.user.id 

    try {

        const cart = await Cart.findOne({
            where: { userId, status: 'active' },
            include: {
                model: Product,
                through: { 
                    attributes: [ 'quantity', 'priceAtPurchase' ]
                }
            }
        })

        if (!cart) {
            return res.status(404).json({
                error: 'No tienes ningún carro activo.'
            })
        }

        res.status(200).json({
            message: 'Carro obtenido con éxito.',
            cart
        })


    } catch (error) {
        next(error)
    }
}

module.exports = { getCart }