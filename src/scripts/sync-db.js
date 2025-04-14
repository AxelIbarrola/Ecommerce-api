const { sequelize } = require('../config/database');
const { User } = require('../models/User');
const { RefreshToken } = require('../models/RefreshToken');
const { Product } = require('../models/Product')


const sync = async () => {
    let exitCode = 0

    try {
        await sequelize.sync()
        console.log('✅ Sincronización exitosa.')
    } catch (error) {
        exitCode = 1
        console.error(`❌ Error en la sincronización: ${error} `)
    } finally {
        await sequelize.close()
        console.log('Conexión cerrada.')
        process.exit(exitCode)
    }
}

sync()