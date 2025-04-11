const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.NAME_DB,
    process.env.USER_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        dialect: process.env.DIALECT_DB,
        port: process.env.PORT_DB,
        logging: false
    }
    
)

module.exports = { sequelize }