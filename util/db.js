const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to database successfully')
  } catch (err) {
    console.log('connecting to database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }