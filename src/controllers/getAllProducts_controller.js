const { Product } = require('../models/Product');
const { Op, where } = require('sequelize');

const getProducts = async (req, res, next) => {

    const { name } = req.query;

    try {

        const whereClause = {}

        if (name) {
            whereClause.name = { [Op.iLike]: `%${name}%` }
        }

        const products = await Product.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        })

        if ( products.length === 0) {

            const message = name ? `No se encontraron productos con el nombre: ${name} .`: `Productos no encontrados`
            return res.status(404).json({ 
                message
            })
        }

        res.status(200).json({
            message: `Productos encontrados: ${products.length}`,
            results: {
                products
            }
        })

    } catch (error) {
        next(error)
    }
    
}

module.exports = { getProducts }