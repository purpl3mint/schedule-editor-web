const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  level: {type: DataTypes.INTEGER, require: true, defaultValue: 0},
  group_id: {type: DataTypes.INTEGER}
}) 

module.exports = {
  User
}