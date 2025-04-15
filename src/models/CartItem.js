const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')
const { Product } = require('./Product')
const { Cart } = require('./Cart')

const CartItem = sequelize.define('CartItem',
    {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        priceAtPurchase: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'cart_items',
        timestamps: true
    }
)


Product.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: 'productId',
    otherKey: 'cartId'
})
Cart.belongsToMany(Product, {
    through: CartItem,
    foreignKey: 'cartId',
    otherKey: 'productId'
})
