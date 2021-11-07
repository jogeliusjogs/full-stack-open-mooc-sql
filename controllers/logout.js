const jwt = require('jsonwebtoken')
const router = require('express').Router()

const User = require('../models/user')
const UserSession = require('../models/user_session')
const { enabledUserExtractor } = require('./blogs')

router.delete('/', enabledUserExtractor, async (req, resp) => {
  const user = req.user
  const encodedToken = req.get('authorization').substring(7)
  const userSession = await UserSession.findOne({token: encodedToken})
  if (userSession.userId == user.id) {
    await userSession.destroy()
    resp.status(200).end()
  } else {
    resp.status(404).end()
  }
})

module.exports = router