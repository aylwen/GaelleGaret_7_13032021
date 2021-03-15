
module.exports = (sequelize, type) => {
  const User = sequelize.define('User', {
    email: {
      type: type.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: type.STRING,
      allowNull: false
    }, 
    password: {
      type: type.STRING.BINARY,
      allowNull: false
    }, 
    isAdmin: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    lastName: {
      type: type.STRING,
      allowNull: false
    }
  }, {sequelize, modelName: 'user'});
  return User;
}





