const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['EASY', 'MEDIUM', 'HARD'],
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    xp: {
      type: Number,
      required: true,
      min: 0,
    },
    completion: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    iconType: {
      type: String,
      required: true, // e.g., 'FaCode', 'FaDatabase'
    },
    iconBg: {
      type: String,
      required: true, // e.g., 'bg-yellow-100'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Challenge', challengeSchema);
