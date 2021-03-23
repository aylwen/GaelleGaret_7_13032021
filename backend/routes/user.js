const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const checkSecurityPassword = require('../middleware/checkSecurityPassword');

const userCtrl = require('../controllers/user');

router.get('/:id', auth, userCtrl.getUser);
router.put('/password/:id', auth, checkSecurityPassword, userCtrl.updateUserAndPassword);
router.put('/:id', auth ,userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
