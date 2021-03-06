module.exports = (sequelize, type) => {
    const Comment = sequelize.define('Comment', {
      content: {
        type: type.STRING,
        allowNull: false
      },
      active: {
        type: type.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    },
      {});
    Comment.associate = function (models) {
        // associations can be defined here
        models.Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        models.Comment.belongsTo(models.Post, {
            foreignKey: {
              allowNull: false
            }
          });
      };
    return Comment;
  };
  