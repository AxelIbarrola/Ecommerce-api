const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const { User } = require('./User');

const RefreshToken = sequelize.define('RefreshToken',
    {
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'refresh_tokens',
        timestamps: true
    }
)

User.hasMany(RefreshToken, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
RefreshToken.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

module.exports = { RefreshToken }