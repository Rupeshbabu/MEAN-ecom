const express = require('express');

const { signUp, signIn, protect, restrictTo } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/').post(signIn);


module.exports = router;