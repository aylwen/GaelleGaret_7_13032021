const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postsCtrl = require('../controllers/posts');

router.post('/', auth, multer, postsCtrl.registerPost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPosts);

router.post('/comment/:id', auth, postsCtrl.commentPost);
router.delete('/comment/:id', auth, postsCtrl.deleteComment);

router.get('/comments/:id', auth, postsCtrl.getAllCommentsPost);

module.exports = router;
