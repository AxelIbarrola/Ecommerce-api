const modifyProduct = async (req, res, next) => {

    const { name, description, price, stock } = req.body

    try { 

        if (name) req.product.name = name;
        if (description) req.product.description = description;
        if (price) req.product.price = price;
        if (stock) req.product.stock = stock;

        await req.product.save()

        res.status(200).json({
            message: 'Producto actualizado con éxito.',
            updateProduct: {
                id: req.product.id,
                name: req.product.name,
                description: req.product.description,
                price: req.product.price,
                stock: req.product.stock
            }
        })

    } catch (error) {
        next(error)
    }

}

module.exports = { modifyProduct }