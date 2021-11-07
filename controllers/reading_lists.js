const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')
const { enabledUserExtractor } = require('./blogs')

router.post('/', async (req, res) => {
  const user = await User.findByPk(req.body.user_id)
  const blog = await Blog.findByPk(req.body.blog_id)
  if (user && blog) {
    await ReadingList.create({userId: req.body.user_id, blogId: req.body.blog_id, isRead: false})
    res.status(200).end()
  } else {
    res.status(404).send()
  }
})

router.put('/:id', enabledUserExtractor, async (req, res) => {
  const user = req.user
  const readListItem = await ReadingList.findByPk(req.params.id)
  if (user.id == readListItem.userId && req.read) {
    readListItem.isRead = true
    await readListItem.save()
    res.status(200).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router