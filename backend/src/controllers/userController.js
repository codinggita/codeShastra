const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.location = req.body.location !== undefined ? req.body.location : user.location;
      user.website = req.body.website !== undefined ? req.body.website : user.website;
      user.github = req.body.github !== undefined ? req.body.github : user.github;
      user.specialization = req.body.specialization || user.specialization;
      user.primaryLang = req.body.primaryLang || user.primaryLang;
      user.yearsExp = req.body.yearsExp !== undefined ? req.body.yearsExp : user.yearsExp;

      if (req.body.preferences) {
        user.preferences = { ...user.preferences, ...req.body.preferences };
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        location: updatedUser.location,
        website: updatedUser.website,
        github: updatedUser.github,
        specialization: updatedUser.specialization,
        primaryLang: updatedUser.primaryLang,
        yearsExp: updatedUser.yearsExp,
        preferences: updatedUser.preferences,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      await User.deleteOne({ _id: req.user.id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get top users by XP
// @route   GET /api/users/leaderboard
// @access  Public
const getLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await User.find({})
      .sort({ xp: -1 })
      .limit(5)
      .select('name avatar level xp specialization');
    res.json(topUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  deleteAccount,
  getLeaderboard,
};
