const { Product } = require('../models/Product');

const createProduct = async(req, res, next) => {

    const { name, description, price, stock } = req.body;

    try {

        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            createdBy: req.user.id
        })

        res.status(201).json({
            message: 'Producto creado con éxito.',
            product: {
                id: newProduct.id,
                name: newProduct.name,
                description: newProduct.description,
                price: newProduct.price,
                stock: newProduct.stock
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { createProduct }