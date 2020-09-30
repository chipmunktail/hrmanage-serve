const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00',
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
})

module.exports = sequelize
