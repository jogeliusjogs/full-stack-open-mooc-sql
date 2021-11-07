const router = require('express').Router()

const { User, Blog } = require('../models')
const { enabledUserExtractor } = require('./blogs')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const useReadFilter = req.query.read != null
  let readFilterWhere = {}
  if (useReadFilter) {
    readFilterWhere = {isRead: req.query.read}
  }
  const user = await User.findOne({
    include: {
      model: Blog,
      as: 'readings',
      through: {
        attributes: ['id', 'isRead'],
        where: readFilterWhere
      },
    },
    where: { 
      id: req.params.id
    },
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } 
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const existingUser = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  if (existingUser) {
    res.status(400).json({error: 'requested username already exists'})
  } else {
    const user = await User.create(req.body)
    res.json(user)
  }
})

router.put('/:id', enabledUserExtractor, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      username: req.params.id
    }
  })
  if (user) {
    if (req.user.username != user.username) {
      res.status(401).end()
    }
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router