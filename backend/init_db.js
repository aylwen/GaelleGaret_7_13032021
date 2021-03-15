const UserModel = require('./models/User')
const PostModel = require('./models/Post')
const CommentModel = require('./models/Comment')

const Sequelize  = require('sequelize');
const { commentPost } = require('./controllers/posts');
const sequelize = new Sequelize('groupomania', 'galou', 'password', {
    host: 'localhost',
    dialect: 'mariadb'
  });

const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)
Post.belongsTo(User)
const Comment = CommentModel(sequelize, Sequelize)
Comment.belongsTo(User)
Comment.belongsTo(Post)

sequelize.sync().then(() => {
    console.log('database ok')
})


module.exports = User;
module.exports = Post;
module.exports = Comment;