const { DataTypes, Op } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      default: false,
    })
    await queryInterface.createTable('user_sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'disabled')
    await queryInterface.dropTable('user_sessions')
  },
}