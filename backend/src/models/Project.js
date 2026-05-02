const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['JUNIOR', 'MID-LEVEL', 'SENIOR'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    tech: {
      type: String,
      required: true,
    },
    isNewProject: {
      type: Boolean,
      default: false,
    },
    avatars: [
      {
        type: String,
      },
    ],
    avatarExtra: {
      type: String,
    },
    actionText: {
      type: String,
      default: 'View Project',
    },
    actionVariant: {
      type: String,
      default: 'outline',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
