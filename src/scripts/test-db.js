const { sequelize } = require('../config/database');

const connection = async() => {
    let codeExit = 0

    try {
        await sequelize.authenticate()
        console.log('✅ Conexión a la base de datos realizada con éxito.')

    } catch (error){
        codeExit = 1
        console.error(`❌ Error al conectarse a la base de datos: ${error}`)

    } finally {
        await sequelize.close()
        console.log('Conexión cerrada.')
        process.exit(codeExit)
    }
}

connection()