const Challenge = require('../models/Challenge');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Server error while fetching challenges.' });
  }
};

// @desc    Create a new challenge (Admin/Seeder)
// @route   POST /api/challenges
// @access  Public for seeding purposes currently
exports.createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Server error while creating challenge.' });
  }
};

// @desc    Get challenge by ID
// @route   GET /api/challenges/:id
// @access  Public
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge by id:', error);
    res.status(500).json({ message: 'Server error while fetching challenge.' });
  }
};
