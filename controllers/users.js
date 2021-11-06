const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findOne({
    include: {
      model: Blog,
      as: 'readings',
      through: {
        attributes: ['id', 'isRead']
      }
    },
    where: { 
      id: req.params.id
    },
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } 
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:id', async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      username: req.params.id
    }
  })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router