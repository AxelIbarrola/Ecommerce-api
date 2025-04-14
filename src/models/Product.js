const { sequelize } = require('../config/database') 
const { DataTypes } = require('sequelize')
const { User } = require('../models/User')

const Product = sequelize.define('Product',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 200]
            }
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: true,
                isNumeric: true,
                isFloat: true
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,

            validate: {
                notEmpty: true,
                isNumeric: true,
                isInt: true
            }
        },

        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },

    {
        tableName: 'products',
        timestamps: true
    }
)

User.hasMany(Product, { 
    foreignKey: 'createdBy',
    onDelete: 'CASCADE'
})

Product.belongsTo(User, {
    foreignKey: 'createdBy',
    onDelete: 'CASCADE'
})

module.exports = { Product }