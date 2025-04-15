const getProductById = (req, res, next) => {

    const { id, name, description, price, stock} = req.product

    res.status(200).json({ 
        message: 'Producto encontrado con éxito.',
        id,
        name,
        description,
        price,
        stock
    })
}

module.exports = { getProductById }