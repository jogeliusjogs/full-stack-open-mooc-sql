const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const UserSession = require('../models/user_session')

router.post('/', async (req, resp) => {
  const body = req.body
  const user = await User.findOne({ 
    where: { 
      username: body.username
    }
  })
  
  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username, 
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  const existingUserSession = await UserSession.findOne({userId: user.id})
  if (existingUserSession) {
    // update token if user logs in while still having valid token
    existingUserSession.token = token
    await existingUserSession.save()
  } else {
    await UserSession.create({userId: user.id, token})
  }

  resp
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router