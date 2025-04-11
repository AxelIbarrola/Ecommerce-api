const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 100]
        }
    },

    role: {
        type: DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    }
}, {
    tableName: 'users',
    timestamps: true
})

module.exports = { User }