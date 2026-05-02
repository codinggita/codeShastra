const express = require('express');
const router = express.Router();
const {
  updateProfile,
  deleteAccount,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
