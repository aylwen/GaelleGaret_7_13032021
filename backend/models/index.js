'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var db        = {};
var config    = require(__dirname + '/../config.json');

//Create a Sequelize connection to the database using the URL in config/config.js
var sequelize = new Sequelize(config.database, config.username, config.password, {
   host: config.host,
   dialect: config.dialect
});

module.exports = sequelize;

//Load all the models
fs
  .readdirSync(__dirname)
  .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
 })
.forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
   if (db[modelName].associate) {
      db[modelName].associate(db);
   }
});

//Export the db Object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;