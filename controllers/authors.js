const router = require('express').Router()

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../util/db');

router.get('/', async (req, res) => {
  const authors = await sequelize.query(
    'SELECT author, COUNT(author) AS blogs, SUM(likes) AS likes FROM blogs GROUP BY author', {type: QueryTypes.SELECT}
  )
  res.json(authors)
})

module.exports = router