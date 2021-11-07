const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Blog, User, UserSession } = require('../models')
const { Op } = require('sequelize')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const enabledUserExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const encodedToken = authorization.substring(7)
      console.log(encodedToken)
      const decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const user = await User.findByPk(decodedToken.id)
      if (user.disabled == true) {
        return res.status(401).json({error: 'user account disabled'})
      } 
      const userSession = await UserSession.findOne({
        where: {
          token: encodedToken
        }
      })
      if (userSession && userSession.userId == user.id) {
        req.user = user
      } else {
        return res.status(401).json({error: 'token for user invalidated'})
      }
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  
  next()
}

router.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({ 
    include: {
      model: User
    },
    where,
    order: [
      ['likes', 'DESC']
  ]
  })
  res.json(blogs)
})

router.post('/', enabledUserExtractor, async (req, res) => {
  const user = req.user
  if (req.body.year > new Date().getFullYear()) {
    res.status(400).json({error: 'can not give year parameter higher than current year'})
  }
  const blog = await Blog.create({...req.body, userId: user.id})
  return res.json(blog)
})

router.delete('/:id', enabledUserExtractor, blogFinder, async (req, res) => {
  const user = req.user
  if (req.blog) {
    if (req.blog.userId == user.id) {
      await req.blog.destroy()
      res.status(200).end()
    } else {
      res.status(401).end()
    }
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = { router, enabledUserExtractor }