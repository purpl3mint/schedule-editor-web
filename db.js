const {Sequelize} = require('sequelize')
const config = require('config')

/*
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)
*/

module.exports = new Sequelize(
  config.get('DB_NAME'),
  config.get('DB_USER'),
  config.get('DB_PASSWORD'),
  {
    dialect: 'postgres',
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }

)