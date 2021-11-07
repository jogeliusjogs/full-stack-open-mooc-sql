const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class UserSession extends Model {}

UserSession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user_session',
})

module.exports = UserSession