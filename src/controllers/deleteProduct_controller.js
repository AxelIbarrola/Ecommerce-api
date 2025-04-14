const deleteProduct = async (req, res, next) => {

    try {

        await req.product.destroy()

        const { id, name } = req.product

        res.status(200).json({
            message: 'Producto eliminado con éxito.',
            deletedProduct: {
                id,
                name
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { deleteProduct }