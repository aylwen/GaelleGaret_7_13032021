module.exports = (sequelize, type) => {
  const Post = sequelize.define('Post', {
    content: {
      type: type.STRING,
      allowNull: false
    },
    imageUrl: {
      type: type.STRING,
      allowNull: false
    },
    active: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
    {sequelize, modelName: 'post'});
  Post.associate = function (models) {
      // associations can be defined here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  return Post;
};
