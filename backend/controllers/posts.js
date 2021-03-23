const models = require('../models/')
const fs = require('fs');


exports.registerPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = models.Post.create({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
    .then(() => res.status(201).json({
      message: 'Post enregistrée !'
    }))
    .catch(error => { 
      res.status(400).json({
        error
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({order: [['updatedAt', 'DESC']]}).then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({
      error
    }));
};

exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
      where: {id: req.params.id}
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({
      error
    }));
};

exports.deletePost = (req, res, next) => {
  models.Post.findOne({
      where: {id: req.params.id}
    })
    .then(post => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        models.Post.destroy({
            where: {id: req.params.id}
          })
          .then(() => res.status(200).json({
            message: 'Post supprimé !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};


exports.updatePost = (req, res, next) => {
    const postObject = req.file ?
      {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...JSON.parse(req.body.post) };
    models.Post.update(
      { ...postObject},
      { where: {id: req.params.id }} 
      )
      .then(() => res.status(200).json({ message: 'Post modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.commentPost = (req, res, next) => {
  const commentObject = req.body;
  models.Comment.create({
    ...commentObject,
    PostId : req.params.id
  })
    .then(() => res.status(201).json({
      message: 'Commentaire enregistré !'
    }))
    .catch(error => { 
      res.status(400).json({
        error
      });
    });
};

exports.getAllCommentsPost = (req, res, next) => {
  models.Comment.findAll(
    {where: {postId: req.params.id}, order: [['updatedAt', 'DESC']]}
  ).then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({
      error
    }));
};

exports.deleteComment = (req, res, next) => {
  models.Comment.destroy({
        where: { id: req.params.id }
      })
      .then(() => res.status(200).json({
        message: 'Commentaire supprimé !'
      }))
      .catch(error => res.status(400).json({
        error
      }))
};