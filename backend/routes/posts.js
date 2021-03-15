const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');

router.post('/', auth, multer, postsCtrl.registerPost);
router.put('/:id', auth, multer, postsCtrl.updatePost);
router.delete('/:id', auth, postsCtrl.deletePost);
//router.post('/:id/like', auth, postsCtrl.likePost);
router.post('/:id/comment', auth, postsCtrl.commentPost);
router.delete('/:id/comment/:id', auth, postsCtrl.deleteComment);
router.get('/:id/comments', auth, postsCtrl.getAllCommentsPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost);

module.exports = router;
