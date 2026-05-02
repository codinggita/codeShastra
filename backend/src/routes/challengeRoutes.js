const express = require('express');
const router = express.Router();
const { getChallenges, createChallenge, getChallengeById } = require('../controllers/challengeController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Get all challenges (public route)
router.get('/', getChallenges);

// Get single challenge by ID
router.get('/:id', getChallengeById);

// Create a new challenge (restricted to admins)
router.post('/', protect, admin, createChallenge);

module.exports = router;
