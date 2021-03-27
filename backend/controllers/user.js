const models = require('../models/')
const bcrypt = require('bcrypt')
const utils = require('./utils')

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
  const token = req.headers.authorization.split(' ')[1];  
  if (utils.verify_action_auth(userObject.id, token)){
    delete userObject.updatedAt;
    models.User.update({ ...userObject }, { where: {id: req.body.id} })
    .then(() => res.status(200).json({ message: 'User modifié !'}))
    .catch(error => {
        res.status(400).json({ message: 'Adresse mail déjà utilisée' })
      })}
  else{
    res.status(405).json({ message: 'Action non autorisée !' })
  }
};

exports.updateUserAndPassword = (req, res, next) => {
  const userObject = { ...req.body };
  const token = req.headers.authorization.split(' ')[1]; 
  if (utils.verify_action_auth(userObject.id, token)){
    bcrypt.hash(req.body.password, 10).then(hash =>{
      userObject.password = hash;
      models.User.update({ ...userObject }, { where: {id: req.body.id} })
    .then(() => res.status(200).json({ message: 'User modifié !'}))
    .catch(error => res.status(400).json({ message: 'Adresse mail déjà utilisée' }));
    })}
  else{
    res.status(405).json({ message: 'Action non autorisée !' })
  }
};

exports.deleteUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];  
  if (utils.verify_action_auth(req.params.id, token)){
    models.User.destroy({
          where: { id: req.params.id }
        })
        .then(() => res.status(200).json({
          message: 'User supprimé !'
        }))
        .catch(error => res.status(400).json({
          error
        }))
      }
  else{
       res.status(405).json({ message: 'Action non autorisée !' })
    }
};
