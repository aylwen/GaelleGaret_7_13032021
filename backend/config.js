var Sequelize = require('sequelize');
var sequelize = new Sequelize('groupomania', 'galou', 'password', {
   host: "localhost",
   dialect: 'mariadb'
});

module.exports = sequelize;