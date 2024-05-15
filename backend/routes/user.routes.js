const express = require('express');
const { uploadUserPhoto, updatePassword, deactivateUserAccount, resizeUserPhoto, updateProfileDetails, getUserDetailsById } = require('../controllers/user.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');

const router = express.Router();

router.route('/:id').get(getUserDetailsById).patch(deactivateUserAccount);
router.route('/:id/upload').patch(resizeUserPhoto, uploadUserPhoto)


module.exports = router;