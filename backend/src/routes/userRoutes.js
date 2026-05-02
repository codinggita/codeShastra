const express = require('express');
const router = express.Router();
const {
  updateProfile,
  deleteAccount,
  getLeaderboard,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/leaderboard', getLeaderboard);
router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
