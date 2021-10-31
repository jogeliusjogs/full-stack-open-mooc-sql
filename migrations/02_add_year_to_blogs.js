const { DataTypes, Op } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
    await queryInterface.addConstraint('blogs', {
      fields: ['year'],
      type: 'check',
      where: {
          year: {
              [Op.gte]: 1991
          }
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}