const express = require('express');
const { createAddress, deleteAddress, getAddressByUserId, setDefaultAddress, updateAddress } = require('../controllers/address.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');


const router = express.Router();

router.use(protect, restrictTo('user', 'admin'));

router.route('/:id').get(getAddressByUserId).post(createAddress).patch(updateAddress).delete(deleteAddress);
router.route('/:addressId').patch(setDefaultAddress);


module.exports = router;