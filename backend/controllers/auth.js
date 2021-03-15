const models = require('../models/')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  console.log(req);
  bcrypt.hash(req.body.password, 10).then(hash =>{
  const user = models.User.create({
    email: req.body.email,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username
  }).then(() => res.status(201).json({ message: 'Utilisateur Créé !'}))
    .catch(error => res.status(400).json({ error }));
  })
.catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  models.User.findOne({
     where: { email: req.body.email} 
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};