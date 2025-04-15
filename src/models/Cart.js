const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize') 
const { User } = require('./User')

const Cart = sequelize.define('Cart', {

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('active', 'completed', 'canceled'),
        allowNull: false,
        defaultValue: 'active'
    },

    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    }
}, {
    tableName: 'carts',
    timestamps: true
})

User.hasMany(Cart, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
Cart.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})


module.exports = { Cart }