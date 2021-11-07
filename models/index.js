const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')
const UserSession = require('./user_session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { as: 'readings', through: ReadingList })
Blog.belongsToMany(User, { through: ReadingList })

module.exports = {
  Blog, User, ReadingList, UserSession
}