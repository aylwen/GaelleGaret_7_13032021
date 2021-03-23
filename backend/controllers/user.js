const models = require('../models/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.getUser = (req, res, next) => {
    models.User.findOne({
        where: { id: req.params.id},
        attributes: {
          exclude: ['password']
        }
       })
    .then(user => {res.status(200).json(user)})
    .catch(error => res.status(404).json({
      error
    }));
  };

exports.updateUser = (req, res, next) => {
  const userObject = { ...req.body };
  delete userObject.updatedAt;
  models.User.update({ ...userObject }, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'User modifié !'}))
  .catch(error => res.status(400).json({ message: 'Adresse mail déjà utilisée' }));
};

exports.updateUserAndPassword = (req, res, next) => {
  const userObject = { ...req.body };
  bcrypt.hash(req.body.password, 10).then(hash =>{
    userObject.password = hash;
    models.User.update({ ...userObject }, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'User modifié !'}))
  .catch(error => res.status(400).json({ message: 'Adresse mail déjà utilisée' }));
  })
};

exports.deleteUser = (req, res, next) => {
    models.User.destroy({
          where: { id: req.params.id }
        })
        .then(() => res.status(200).json({
          message: 'User supprimé !'
        }))
        .catch(error => res.status(400).json({
          error
        }))
};
