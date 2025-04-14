const { Product } = require('../models/Product')

const productExists = async (req, res, next) => {

    const { id } = req.params

    try {

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado.'})
        }

        req.product = product

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = { productExists }