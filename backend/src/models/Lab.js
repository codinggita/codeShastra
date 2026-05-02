const mongoose = require('mongoose');

const labSchema = new mongoose.Schema(
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
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true, // e.g., 'bg-blue-50'
    },
    iconColor: {
      type: String,
      required: true, // e.g., 'text-blue-500'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lab', labSchema);
